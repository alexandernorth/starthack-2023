package config

import (
	"github.com/kelseyhightower/envconfig"
	"log"
)

var Config Configuration

type Configuration struct {
	ListenAddr       string `default:""`
	ListenPort       int    `default:"8080"`
	PostgresHost     string `default:"localhost"`
	PostgresUser     string `default:"postgres"`
	PostgresPassword string `default:"postgres"`
	PostgresDBName   string `default:"postgres"`
	PostgresPort     int    `default:"5432"`
}

func ReadConfig() {
	err := envconfig.Process("", &Config)
	if err != nil {
		log.Fatal(err)
	}
}
