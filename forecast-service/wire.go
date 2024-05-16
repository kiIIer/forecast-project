//go:build wireinject
// +build wireinject

package main

import (
	"forecast-service/service"
	"forecast-service/service/config"
	"forecast-service/service/repository"
	"forecast-service/service/repository/middleware"
	"github.com/google/wire"
)

func InitializeService() service.ForecastService {
	wire.Build(
		config.LoadConfig,
		repository.NewGormDB,
		repository.NewForecastRepository,
		repository.NewCityRepository,
		repository.NewUserRepository,
		service.NewForecastsHandler,
		service.NewCitiesHandler,
		service.NewForecastService,
		middleware.NewMiddleware,
	)
	return nil // Return nil here. Wire will generate the correct code.
}
