//go:build wireinject
// +build wireinject

package main

import (
	"forecast-service/service"
	"forecast-service/service/config"
	"github.com/google/wire"
)

func InitializeService() service.ForecastService {
	wire.Build(service.NewForecastService, config.LoadConfig, service.NewForecastsHandler, service.NewCitiesHandler)
	return nil // Return nil here. Wire will generate the correct code.
}
