package models

import (
	"gorm.io/gorm"
)

// Forecast represents a weather forecast in the database.
type Forecast struct {
	ID uint `gorm:"primaryKey" json:"id"`
	gorm.Model
	CityId         uint
	DateOfForecast string
	ChanceOfRain   float32
	Temperature    float32
}
