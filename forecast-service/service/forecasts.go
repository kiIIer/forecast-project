package service

import (
	"encoding/json"
	"net/http"
)

// ForecastsHandler manages forecast-related requests.
type ForecastsHandler struct {
}

// NewForecastsHandler initializes a new instance of ForecastsHandler.
func NewForecastsHandler() *ForecastsHandler {
	return &ForecastsHandler{}
}

// GetForecasts serves a list of weather forecasts.
func (h *ForecastsHandler) GetForecasts(w http.ResponseWriter, r *http.Request) {
	forecasts := []string{"Sunny", "Cloudy", "Rainy"}
	json.NewEncoder(w).Encode(forecasts)
}
