package repository

import (
	"fmt"
	"forecast-service/service/config"
	"forecast-service/service/repository/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"log"
)

func NewGormDB(cfg *config.Config) *gorm.DB {
	// Construct the DSN (Data Source Name) string
	dsn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		cfg.DBHost, cfg.DBPort, cfg.DBUser, cfg.DBPassword, cfg.DBName, cfg.SSLMode)

	// Open the database connection using the PostgreSQL GORM driver
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
		return nil
	}

	log.Println("Database connection successfully established")

	// Optionally, you can perform database migration here
	err = db.AutoMigrate(&models.User{}, &models.City{}, &models.Forecast{})
	if err != nil {
		log.Fatalf("Failed to perform database migration: %v", err)
		return nil
	}

	return db
}
