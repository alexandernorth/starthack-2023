package config

import (
	"github.com/kelseyhightower/envconfig"
	"log"
)

var Config Configuration

type Configuration struct {
	ListenAddr       string `default:"" split_words:"true"`
	ListenPort       int    `default:"8080" split_words:"true"`
	PostgresHost     string `default:"localhost" split_words:"true"`
	PostgresUser     string `default:"postgres" split_words:"true"`
	PostgresPassword string `default:"postgres" split_words:"true"`
	PostgresDbName   string `default:"postgres" split_words:"true"`
	PostgresPort     int    `default:"5432" split_words:"true"`
}

func ReadConfig() {
	err := envconfig.Process("", &Config)
	if err != nil {
		log.Fatal(err)
	}
}
