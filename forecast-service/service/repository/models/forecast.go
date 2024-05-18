package models

import (
	"gorm.io/gorm"
)

// Forecast represents a weather forecast in the database.
type Forecast struct {
	ID uint `gorm:"primaryKey" json:"id"`
	gorm.Model
	CityId         uint    `json:"cityId"`
	DateOfForecast string  `json:"dateOfForecast"`
	ChanceOfRain   float32 `json:"chanceOfRain"`
	Temperature    float32 `json:"temperature"`
}
