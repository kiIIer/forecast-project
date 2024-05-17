package models

import (
	"gorm.io/gorm"
)

// City represents a city in the database, related to forecasts.
type City struct {
	ID uint `gorm:"primaryKey" json:"id"`
	gorm.Model
	Name      string     `gorm:"unique;not null"`
	Forecasts []Forecast `gorm:"foreignKey:CityId"`
}
