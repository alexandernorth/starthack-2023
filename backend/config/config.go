package config

import (
	"github.com/kelseyhightower/envconfig"
	"log"
)

var Config Configuration

type Configuration struct {
	ListenAddr string `default:""`
	ListenPort int    `default:"8080"`
}

func ReadConfig() {
	err := envconfig.Process("", &Config)
	if err != nil {
		log.Fatal(err)
	}
}
