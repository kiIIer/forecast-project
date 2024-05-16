package middleware

import (
	"context"
	"fmt"
	"forecast-service/service/config"
	"forecast-service/service/repository"
	"forecast-service/service/repository/models"
	"github.com/dgrijalva/jwt-go"
	"gorm.io/gorm"
	"net/http"
	"strings"
)

type Middleware interface {
	CheckAuthenticated(next http.Handler) http.Handler
	CheckAdmin(next http.Handler) http.Handler
}

type middleware struct {
	config   *config.Config
	userRepo repository.UserRepository
}

func NewMiddleware(cfg *config.Config, userRepo repository.UserRepository) Middleware {
	return &middleware{config: cfg, userRepo: userRepo}
}

type ContextKey string

const (
	UserIDKey ContextKey = "userID"
	AdminKey  ContextKey = "isAdmin"
)

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
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
			}
			return []byte(m.config.JWTSecret), nil // Use the secret from the config
		})

		if err != nil {
			http.Error(w, "Invalid token: "+err.Error(), http.StatusUnauthorized)
			return
		}

		if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
			userID := claims["user_id"].(string) // Adjust according to your token's claims structure
			isAdmin := claims["admin"].(bool)    // Check if the token has the admin claim

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
