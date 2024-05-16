package service

import (
	"encoding/json"
	"forecast-service/service/repository"
	"forecast-service/service/repository/middleware"
	"forecast-service/service/repository/models"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

// ForecastsHandler manages forecast-related requests.
type ForecastsHandler struct {
	forecastRepo repository.ForecastRepository
	userRepo     repository.UserRepository
}

// NewForecastsHandler initializes a new instance of ForecastsHandler.
func NewForecastsHandler(forecastRepo repository.ForecastRepository, userRepo repository.UserRepository) *ForecastsHandler {
	return &ForecastsHandler{forecastRepo: forecastRepo, userRepo: userRepo}
}

// ForecastsGet handles GET requests to retrieve all forecasts.
func (h *ForecastsHandler) ForecastsGet(w http.ResponseWriter, r *http.Request) {
	forecasts, err := h.forecastRepo.GetForecasts()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	json.NewEncoder(w).Encode(forecasts)
}

// ForecastsIdDelete handles DELETE requests to delete a forecast by ID.
func (h *ForecastsHandler) ForecastsIdDelete(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.ParseUint(vars["id"], 10, 32)
	if err != nil {
		http.Error(w, "Invalid forecast ID", http.StatusBadRequest)
		return
	}

	err = h.forecastRepo.DeleteForecast(uint(id))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

// ForecastsIdGet handles GET requests to retrieve a forecast by ID.
func (h *ForecastsHandler) ForecastsIdGet(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.ParseUint(vars["id"], 10, 32)
	if err != nil {
		http.Error(w, "Invalid forecast ID", http.StatusBadRequest)
		return
	}

	forecast, err := h.forecastRepo.GetForecastByID(uint(id))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	json.NewEncoder(w).Encode(forecast)
}

// ForecastsPost handles POST requests to create a new forecast.
func (h *ForecastsHandler) ForecastsPost(w http.ResponseWriter, r *http.Request) {
	var forecast models.Forecast
	if err := json.NewDecoder(r.Body).Decode(&forecast); err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	createdForecast, err := h.forecastRepo.CreateForecast(&forecast)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	json.NewEncoder(w).Encode(createdForecast)
}

// UpcomingForecastsGet handles GET requests to retrieve upcoming forecasts for the authenticated user's favorite cities.
func (h *ForecastsHandler) UpcomingForecastsGet(w http.ResponseWriter, r *http.Request) {
	userID, err := middleware.GetUserFromContext(r.Context())
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	forecasts, err := h.userRepo.GetUpcomingForecastsFromFavorites(userID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	json.NewEncoder(w).Encode(forecasts)
}
