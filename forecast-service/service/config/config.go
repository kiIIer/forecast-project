package config

import (
	"log"

	"github.com/spf13/viper"
)

// Config stores all configuration of the application.
type Config struct {
	Authority  string
	Audience   string
	DBHost     string `mapstructure:"db_host"`     // Database host
	DBPort     string `mapstructure:"db_port"`     // Database port
	DBUser     string `mapstructure:"db_user"`     // Database user
	DBPassword string `mapstructure:"db_password"` // Database password
	DBName     string `mapstructure:"db_name"`     // Database name
	SSLMode    string `mapstructure:"ssl_mode"`    // SSL mode for PostgreSQL connection
	JWTSecret  string `mapstructure:"jwt_secret"`  // JWT Secret for token signing
}

// LoadConfig initializes and loads configuration using Viper.
func LoadConfig() *Config {
	viper.SetConfigName("app")
	viper.SetConfigType("yaml")
	viper.AddConfigPath(".") // Optionally include additional paths

	viper.AutomaticEnv() // Read configuration from environment variables

	// Setting defaults
	viper.SetDefault("db_host", "localhost")
	viper.SetDefault("db_port", "5432")
	viper.SetDefault("db_user", "postgres")
	viper.SetDefault("db_password", "password")
	viper.SetDefault("db_name", "forecastdb")
	viper.SetDefault("ssl_mode", "disable")
	viper.SetDefault("jwt_secret", "your_jwt_secret") // Default JWT secret

	// Try to read from the configuration file
	if err := viper.ReadInConfig(); err != nil {
		log.Printf("Error reading config file: %s. Falling back to environment variables.", err)
	}

	// Override with environment variables if present
	viper.BindEnv("db_host", "DB_HOST")
	viper.BindEnv("db_port", "DB_PORT")
	viper.BindEnv("db_user", "DB_USER")
	viper.BindEnv("db_password", "DB_PASSWORD")
	viper.BindEnv("db_name", "DB_NAME")
	viper.BindEnv("ssl_mode", "SSL_MODE")
	viper.BindEnv("jwt_secret", "JWT_SECRET")

	var cfg Config
	if err := viper.Unmarshal(&cfg); err != nil {
		log.Fatalf("Unable to decode into struct: %v", err)
	}

	// Override with environment variables if they are set
	cfg.Authority = "https://forecast-project.eu.auth0.com/"
	cfg.Audience = "http://localhost:8080"
	cfg.DBHost = viper.GetString("db_host")
	cfg.DBPort = viper.GetString("db_port")
	cfg.DBUser = viper.GetString("db_user")
	cfg.DBPassword = viper.GetString("db_password")
	cfg.DBName = viper.GetString("db_name")
	cfg.SSLMode = viper.GetString("ssl_mode")
	cfg.JWTSecret = viper.GetString("jwt_secret")

	return &cfg
}
