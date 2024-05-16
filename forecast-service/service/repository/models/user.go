package models

import (
	"gorm.io/gorm"
)

// User represents a user in the database with favourites as a many-to-many relationship.
type User struct {
	ID string `gorm:"primaryKey"`
	gorm.Model
	Favourites []*City `gorm:"many2many:user_favourites;"`
}
