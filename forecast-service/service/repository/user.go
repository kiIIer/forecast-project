package repository

import (
	"forecast-service/service/repository/models"
	"gorm.io/gorm"
	"time"
)

// UserRepository defines methods to manage users and their favorite cities.
type UserRepository interface {
	AddCityToFavorites(userID string, cityID uint) error
	GetFavoriteCities(userID string) ([]*models.City, error)
	RemoveCityFromFavorites(userID string, cityID uint) error
	GetUpcomingForecastsFromFavorites(userID string) ([]*models.Forecast, error)
	CreateUser(user *models.User) error
	GetUserByID(id string) (*models.User, error)
}

type userRepository struct {
	db *gorm.DB
}

// NewUserRepository creates a new instance of UserRepository.
func NewUserRepository(db *gorm.DB) UserRepository {
	return &userRepository{db: db}
}

// AddCityToFavorites adds a city to a user's favorites.
func (repo *userRepository) AddCityToFavorites(userID string, cityID uint) error {
	user := &models.User{ID: userID}
	city := &models.City{ID: cityID}

	// Using GORM's association method to append the city to the user's favorites
	return repo.db.Model(user).Association("Favourites").Append(city)
}

// GetFavoriteCities retrieves a user's favorite cities.
func (repo *userRepository) GetFavoriteCities(userID string) ([]*models.City, error) {
	var user models.User
	err := repo.db.Preload("Favourites").First(&user, userID).Error
	if err != nil {
		return nil, err
	}
	return user.Favourites, nil
}

// RemoveCityFromFavorites removes a city from a user's favorites.
func (repo *userRepository) RemoveCityFromFavorites(userID string, cityID uint) error {
	user := &models.User{ID: userID}
	city := &models.City{ID: cityID}

	// Using GORM's association method to delete the city from the user's favorites
	return repo.db.Model(user).Association("Favourites").Delete(city)
}

// GetUpcomingForecastsFromFavorites retrieves upcoming forecasts from a user's favorite cities.
func (repo *userRepository) GetUpcomingForecastsFromFavorites(userID string) ([]*models.Forecast, error) {
	var forecasts []*models.Forecast

	// Join user_favourites to get cities, then join forecasts to get upcoming forecasts
	err := repo.db.Table("forecasts").
		Select("forecasts.*").
		Joins("join cities on cities.id = forecasts.city_id").
		Joins("join user_favourites on user_favourites.city_id = cities.id").
		Where("user_favourites.user_id = ? AND forecasts.date_of_forecast >= ?", userID, time.Now()).
		Scan(&forecasts).Error

	return forecasts, err
}

// CreateUser adds a new user to the database.
func (repo *userRepository) CreateUser(user *models.User) error {
	return repo.db.Create(user).Error
}

// GetUserByID retrieves a user by their ID.
func (repo *userRepository) GetUserByID(id string) (*models.User, error) {
	var user models.User
	err := repo.db.Where("id = ?", id).First(&user).Error
	return &user, err
}
