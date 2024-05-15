// service/config/config.go
package config

import (
	"github.com/spf13/viper"
	"log"
)

// Config stores all configuration of the application.
type Config struct {
	DatabaseURI string `mapstructure:"database_uri"`
}

// LoadConfig initializes and loads configuration using Viper.
func LoadConfig() *Config {
	viper.SetConfigName("config")
	viper.SetConfigType("yaml")
	viper.AddConfigPath(".")

	viper.AutomaticEnv() // Automatically override with environment variables

	viper.SetDefault("database_uri", "mongodb://localhost:27017")

	if err := viper.ReadInConfig(); err != nil {
		log.Fatalf("Error reading config file, %s", err)
	}

	var config Config
	if err := viper.Unmarshal(&config); err != nil {
		log.Fatalf("Unable to decode into struct, %s", err)
	}

	return &config
}
