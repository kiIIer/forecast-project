package repository

import (
	"forecast-service/service/repository/models"
	"gorm.io/gorm"
)

type CityRepository interface {
	CreateCity(city *models.City) (*models.City, error)
	DeleteCity(id uint) error
	GetCityByID(id uint) (*models.City, error)
	SearchCitiesByName(name string) ([]*models.City, error)
	GetCities() ([]*models.City, error)
}

// cityRepository struct implements the CityRepository interface using GORM.
type cityRepository struct {
	db *gorm.DB
}

// NewCityRepository creates a new instance of CityRepository.
func NewCityRepository(db *gorm.DB) CityRepository {
	return &cityRepository{db: db}
}

// CreateCity adds a new city to the database.
func (repo *cityRepository) CreateCity(city *models.City) (*models.City, error) {
	err := repo.db.Create(city).Error
	return city, err
}

// DeleteCity removes a city from the database by ID.
func (repo *cityRepository) DeleteCity(id uint) error {
	return repo.db.Delete(&models.City{}, id).Error
}

// GetCityByID finds a city by its ID.
func (repo *cityRepository) GetCityByID(id uint) (*models.City, error) {
	var city models.City
	err := repo.db.First(&city, id).Error
	return &city, err
}

func (repo *cityRepository) GetCities() ([]*models.City, error) {
	var cities []*models.City
	err := repo.db.Find(&cities).Error
	return cities, err
}

// SearchCitiesByName finds cities that match or contain the provided name.
func (repo *cityRepository) SearchCitiesByName(name string) ([]*models.City, error) {
	var cities []*models.City
	err := repo.db.Where("name LIKE ?", "%"+name+"%").Find(&cities).Error
	return cities, err
}
