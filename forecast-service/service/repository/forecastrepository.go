package repository

import (
	"forecast-service/service/repository/models"
	"gorm.io/gorm"
)

// ForecastRepository defines methods to manage forecasts in the database.
type ForecastRepository interface {
	CreateForecast(forecast *models.Forecast) (*models.Forecast, error)
	DeleteForecast(id uint) error
	GetForecastByID(id uint) (*models.Forecast, error)
	GetForecasts() ([]*models.Forecast, error)
	GetForecastsForCity(cityId uint) ([]*models.Forecast, error)
}

type forecastRepository struct {
	db *gorm.DB
}

// NewForecastRepository creates a new instance of ForecastRepository.
func NewForecastRepository(db *gorm.DB) ForecastRepository {
	return &forecastRepository{db: db}
}

// CreateForecast adds a new forecast to the database.
func (repo *forecastRepository) CreateForecast(forecast *models.Forecast) (*models.Forecast, error) {
	err := repo.db.Create(forecast).Error
	return forecast, err
}

// GetForecasts retrieves all forecasts from the database.
func (repo *forecastRepository) GetForecasts() ([]*models.Forecast, error) {
	var forecasts []*models.Forecast
	err := repo.db.Find(&forecasts).Error
	return forecasts, err

}

// DeleteForecast removes a forecast from the database by ID.
func (repo *forecastRepository) DeleteForecast(id uint) error {
	return repo.db.Delete(&models.Forecast{}, id).Error
}

// GetForecastByID finds a forecast by its ID.
func (repo *forecastRepository) GetForecastByID(id uint) (*models.Forecast, error) {
	var forecast models.Forecast
	err := repo.db.First(&forecast, id).Error
	return &forecast, err
}

// GetForecastsForCity retrieves all forecasts associated with a specific city.
func (repo *forecastRepository) GetForecastsForCity(cityId uint) ([]*models.Forecast, error) {
	var forecasts []*models.Forecast
	err := repo.db.Where("city_id = ?", cityId).Find(&forecasts).Error
	return forecasts, err
}
