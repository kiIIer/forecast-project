package models

import (
	"gorm.io/gorm"
)

// Forecast represents a weather forecast in the database.
type Forecast struct {
	ID uint `gorm:"primaryKey"`
	gorm.Model
	CityId         uint
	DateOfForecast string
	ChanceOfRain   float32
	Temperature    float32
}
