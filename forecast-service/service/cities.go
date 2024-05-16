package service

import (
	"encoding/json"
	"forecast-service/service/repository"
	"forecast-service/service/repository/middleware"
	"forecast-service/service/repository/models"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

// CitiesHandler manages city-related requests.
type CitiesHandler struct {
	cityRepo     repository.CityRepository
	forecastRepo repository.ForecastRepository
	userRepo     repository.UserRepository
}

// NewCitiesHandler initializes a new instance of CitiesHandler.
func NewCitiesHandler(cityRepo repository.CityRepository, userRepo repository.UserRepository, forecastRepo repository.ForecastRepository) *CitiesHandler {
	return &CitiesHandler{cityRepo: cityRepo, userRepo: userRepo, forecastRepo: forecastRepo}
}

// CitiesGet handles GET requests to list all cities.
func (h *CitiesHandler) CitiesGet(w http.ResponseWriter, r *http.Request) {
	cities, err := h.cityRepo.GetCities()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	json.NewEncoder(w).Encode(cities)
}

// CitiesIdDelete handles DELETE requests to delete a city by ID.
func (h *CitiesHandler) CitiesIdDelete(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.ParseUint(vars["id"], 10, 32)
	if err != nil {
		http.Error(w, "Invalid city ID", http.StatusBadRequest)
		return
	}

	err = h.cityRepo.DeleteCity(uint(id))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

// CitiesIdForecastsGet handles GET requests to retrieve all forecasts for a specific city.
func (h *CitiesHandler) CitiesIdForecastsGet(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.ParseUint(vars["id"], 10, 32)
	if err != nil {
		http.Error(w, "Invalid city ID", http.StatusBadRequest)
		return
	}

	forecasts, err := h.forecastRepo.GetForecastsForCity(uint(id))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	json.NewEncoder(w).Encode(forecasts)
}

// CitiesIdGet handles GET requests to retrieve a city by ID.
func (h *CitiesHandler) CitiesIdGet(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.ParseUint(vars["id"], 10, 32)
	if err != nil {
		http.Error(w, "Invalid city ID", http.StatusBadRequest)
		return
	}

	city, err := h.cityRepo.GetCityByID(uint(id))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	json.NewEncoder(w).Encode(city)
}

// CitiesPost handles POST requests to create a new city.
func (h *CitiesHandler) CitiesPost(w http.ResponseWriter, r *http.Request) {
	var city models.City
	if err := json.NewDecoder(r.Body).Decode(&city); err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	createdCity, err := h.cityRepo.CreateCity(&city)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	json.NewEncoder(w).Encode(createdCity)
}

// FavouritesGet handles GET requests to retrieve a user's favourite cities.
func (h *CitiesHandler) FavouritesGet(w http.ResponseWriter, r *http.Request) {
	userID, err := middleware.GetUserFromContext(r.Context())
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	favouriteCities, err := h.userRepo.GetFavoriteCities(userID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	json.NewEncoder(w).Encode(favouriteCities)
}

// FavouritesIdDelete handles DELETE requests to remove a city from a user's favourites.
func (h *CitiesHandler) FavouritesIdDelete(w http.ResponseWriter, r *http.Request) {
	userID, err := middleware.GetUserFromContext(r.Context())
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	vars := mux.Vars(r)
	cityID, err := strconv.ParseUint(vars["id"], 10, 32)
	if err != nil {
		http.Error(w, "Invalid city ID", http.StatusBadRequest)
		return
	}

	err = h.userRepo.RemoveCityFromFavorites(userID, uint(cityID))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

// FavouritesPost handles POST requests to add a city to a user's favourites.
func (h *CitiesHandler) FavouritesPost(w http.ResponseWriter, r *http.Request) {
	userID, err := middleware.GetUserFromContext(r.Context())
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	var city models.City
	if err := json.NewDecoder(r.Body).Decode(&city); err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	err = h.userRepo.AddCityToFavorites(userID, city.ID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
}
