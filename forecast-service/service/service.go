package service

import (
	"forecast-service/service/config"
	"forecast-service/service/repository/middleware"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"log"
	"net/http"
)

// ForecastService defines the interface for our forecast service.
type ForecastService interface {
	Run()
}

// forecastService implements ForecastService with its dependencies.
type forecastService struct {
	config           *config.Config
	citiesHandler    *CitiesHandler
	forecastsHandler *ForecastsHandler
	middleware       middleware.Middleware
}

func NewForecastService(cfg *config.Config, citiesHandler *CitiesHandler, forecastsHandler *ForecastsHandler, middleware middleware.Middleware) ForecastService {
	return &forecastService{
		config:           cfg,
		citiesHandler:    citiesHandler,
		forecastsHandler: forecastsHandler,
		middleware:       middleware,
	}
}

func (fs *forecastService) Run() {
	router := mux.NewRouter()

	// Public routes
	router.HandleFunc("/cities", fs.citiesHandler.CitiesGet).Methods(http.MethodGet)
	router.HandleFunc("/cities/{id}", fs.citiesHandler.CitiesIdGet).Methods(http.MethodGet)
	router.HandleFunc("/cities/{id}/forecasts", fs.citiesHandler.CitiesIdForecastsGet).Methods(http.MethodGet)
	router.HandleFunc("/forecasts", fs.forecastsHandler.ForecastsGet).Methods(http.MethodGet)
	router.HandleFunc("/forecasts/{id}", fs.forecastsHandler.ForecastsIdGet).Methods(http.MethodGet)

	// Protected routes (Require Authentication)
	router.Handle("/favourites", fs.middleware.CheckAuthenticated(http.HandlerFunc(fs.citiesHandler.FavouritesGet))).Methods(http.MethodGet)
	router.Handle("/favourites", fs.middleware.CheckAuthenticated(http.HandlerFunc(fs.citiesHandler.FavouritesPost))).Methods(http.MethodPost)
	router.Handle("/favourites/{id}", fs.middleware.CheckAuthenticated(http.HandlerFunc(fs.citiesHandler.FavouritesIdDelete))).Methods(http.MethodDelete)
	router.Handle("/upcoming-forecasts", fs.middleware.CheckAuthenticated(http.HandlerFunc(fs.forecastsHandler.UpcomingForecastsGet))).Methods(http.MethodGet)

	// Admin routes (Require Admin Authorization)
	//router.Handle("/cities", fs.middleware.CheckAuthenticated(fs.middleware.CheckAdmin(http.HandlerFunc(fs.citiesHandler.CitiesPost)))).Methods(http.MethodPost)
	router.Handle("/cities", http.HandlerFunc(fs.citiesHandler.CitiesPost)).Methods(http.MethodPost)
	router.Handle("/cities/{id}", fs.middleware.CheckAuthenticated(fs.middleware.CheckAdmin(http.HandlerFunc(fs.citiesHandler.CitiesIdDelete)))).Methods(http.MethodDelete)
	router.Handle("/forecasts", fs.middleware.CheckAuthenticated(fs.middleware.CheckAdmin(http.HandlerFunc(fs.forecastsHandler.ForecastsPost)))).Methods(http.MethodPost)
	router.Handle("/forecasts/{id}", fs.middleware.CheckAuthenticated(fs.middleware.CheckAdmin(http.HandlerFunc(fs.forecastsHandler.ForecastsIdDelete)))).Methods(http.MethodDelete)

	corsOptions := handlers.CORS(
		handlers.AllowedOrigins([]string{"http://localhost:4200"}),
		handlers.AllowedMethods([]string{"GET", "POST", "DELETE", "PUT", "OPTIONS"}),
		handlers.AllowedHeaders([]string{"Content-Type", "Authorization"}),
	)

	// Wrap the router with the CORS middleware
	corsRouter := corsOptions(router)

	log.Println("Server starting on :8080")
	if err := http.ListenAndServe(":8080", corsRouter); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
