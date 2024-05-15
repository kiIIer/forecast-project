package service

import (
	"encoding/json"
	"forecast-service/service/config"
	"net/http"
)

// CitiesHandler manages city-related requests.
type CitiesHandler struct {
	config *config.Config
}

// NewCitiesHandler initializes a new instance of CitiesHandler.
func NewCitiesHandler(cfg *config.Config) *CitiesHandler {
	return &CitiesHandler{
		config: cfg,
	}
}

// GetCities serves a list of cities.
func (h *CitiesHandler) GetCities(w http.ResponseWriter, r *http.Request) {
	cities := []string{"New York", "Los Angeles", "Chicago"}
	json.NewEncoder(w).Encode(cities)
}
