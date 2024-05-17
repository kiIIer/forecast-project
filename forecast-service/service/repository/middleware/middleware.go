package middleware

import (
	"context"
	"crypto/rsa"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"forecast-service/service/config"
	"forecast-service/service/repository"
	"forecast-service/service/repository/models"
	"github.com/dgrijalva/jwt-go"
	"gorm.io/gorm"
	"math/big"
	"net/http"
	"strings"
	"sync"
)

type Middleware interface {
	CheckAuthenticated(next http.Handler) http.Handler
	CheckAdmin(next http.Handler) http.Handler
}

type middleware struct {
	config   *config.Config
	userRepo repository.UserRepository
	jwks     *JWKS
}

func NewMiddleware(cfg *config.Config, userRepo repository.UserRepository) Middleware {
	jwks := &JWKS{}
	jwks.FetchKeys(cfg.Authority + ".well-known/jwks.json")
	return &middleware{config: cfg, userRepo: userRepo, jwks: jwks}
}

type ContextKey string

const (
	UserIDKey ContextKey = "userID"
	AdminKey  ContextKey = "isAdmin"
)

type JWKS struct {
	Keys []JSONWebKey `json:"keys"`
	mu   sync.RWMutex
}

type JSONWebKey struct {
	Kid string `json:"kid"`
	Kty string `json:"kty"`
	Use string `json:"use"`
	N   string `json:"n"`
	E   string `json:"e"`
}

func (j *JWKS) FetchKeys(url string) {
	resp, err := http.Get(url)
	if err != nil {
		fmt.Printf("Error fetching JWKS: %v", err)
		return
	}
	defer resp.Body.Close()

	if err := json.NewDecoder(resp.Body).Decode(j); err != nil {
		fmt.Printf("Error decoding JWKS: %v", err)
		return
	}
}

func (j *JWKS) GetKey(kid string) (*JSONWebKey, error) {
	j.mu.RLock()
	defer j.mu.RUnlock()

	for _, key := range j.Keys {
		if key.Kid == kid {
			return &key, nil
		}
	}

	return nil, fmt.Errorf("unable to find key %s", kid)
}

func (j *JSONWebKey) DecodePublicKey() (*rsa.PublicKey, error) {
	nBytes, err := base64.RawURLEncoding.DecodeString(j.N)
	if err != nil {
		return nil, err
	}

	eBytes, err := base64.RawURLEncoding.DecodeString(j.E)
	if err != nil {
		return nil, err
	}

	e := 0
	for _, b := range eBytes {
		e = e*256 + int(b)
	}

	pubKey := &rsa.PublicKey{
		N: new(big.Int).SetBytes(nBytes),
		E: e,
	}

	return pubKey, nil
}

func (m *middleware) CheckAuthenticated(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			http.Error(w, "Authorization header is required", http.StatusUnauthorized)
			return
		}

		authHeaderParts := strings.Split(authHeader, " ")
		if len(authHeaderParts) != 2 || authHeaderParts[0] != "Bearer" {
			http.Error(w, "Authorization header must be in the format: Bearer <token>", http.StatusBadRequest)
			return
		}

		tokenStr := authHeaderParts[1]
		token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodRSA); !ok {
				return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
			}

			kid, ok := token.Header["kid"].(string)
			if !ok {
				return nil, fmt.Errorf("token header does not contain kid")
			}

			key, err := m.jwks.GetKey(kid)
			if err != nil {
				return nil, fmt.Errorf("failed to get key: %v", err)
			}

			return key.DecodePublicKey()
		})

		if err != nil {
			http.Error(w, "Invalid token: "+err.Error(), http.StatusUnauthorized)
			return
		}

		if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
			userID, ok := claims["sub"].(string) // Adjust according to your token's claims structure
			if !ok {
				http.Error(w, "Invalid token: missing user ID", http.StatusUnauthorized)
				return
			}

			// Extract permissions from the token
			permissions, ok := claims["permissions"].([]interface{})
			if !ok {
				permissions = []interface{}{}
			}

			isAdmin := false
			for _, perm := range permissions {
				if perm == "admin" {
					isAdmin = true
					break
				}
			}

			// Check if the user exists in the database, if not add them
			_, err := m.userRepo.GetUserByID(userID)
			if err != nil && err == gorm.ErrRecordNotFound {
				newUser := &models.User{
					ID: userID,
					// Add any additional fields you might need to set
				}
				err = m.userRepo.CreateUser(newUser)
				if err != nil {
					http.Error(w, "Failed to create user", http.StatusInternalServerError)
					return
				}
			} else if err != nil {
				http.Error(w, "Failed to retrieve user", http.StatusInternalServerError)
				return
			}

			ctx := context.WithValue(r.Context(), UserIDKey, userID)
			ctx = context.WithValue(ctx, AdminKey, isAdmin)
			next.ServeHTTP(w, r.WithContext(ctx))
		} else {
			http.Error(w, "Invalid token", http.StatusUnauthorized)
		}
	})
}

func (m *middleware) CheckAdmin(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if err := m.checkIfAdmin(r); err != nil {
			http.Error(w, err.Error(), http.StatusForbidden)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func (m *middleware) checkIfAdmin(r *http.Request) error {
	isAdmin, ok := r.Context().Value(AdminKey).(bool)
	if !ok || !isAdmin {
		return fmt.Errorf("Admin access required")
	}
	return nil
}

// GetUserFromContext retrieves the user ID from the context.
func GetUserFromContext(ctx context.Context) (string, error) {
	userID, ok := ctx.Value(UserIDKey).(string)
	if !ok {
		return "", fmt.Errorf("user ID not found in context")
	}
	return userID, nil
}
