package service

import (
	"forecast-service/service/config"
	"log"
	"net/http"
)

// ForecastService defines the interface for our forecast service.
type ForecastService interface {
	Run()
}

// forecastServiceImpl implements ForecastService with its dependencies.
type forecastServiceImpl struct {
	config           *config.Config
	citiesHandler    *CitiesHandler
	forecastsHandler *ForecastsHandler
}

func NewForecastService(cfg *config.Config, citiesHandler *CitiesHandler, forecastsHandler *ForecastsHandler) ForecastService {
	return &forecastServiceImpl{
		config:           cfg,
		citiesHandler:    citiesHandler,
		forecastsHandler: forecastsHandler,
	}
}

func (fs *forecastServiceImpl) Run() {
	log.Println("Using database at:", fs.config.DatabaseURI)

	// Setup routes
	http.HandleFunc("/cities", fs.citiesHandler.GetCities)
	http.HandleFunc("/forecasts", fs.forecastsHandler.GetForecasts)

	// Start HTTP server
	log.Println("Starting server on :8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal("Error starting server: ", err)
	}
}
