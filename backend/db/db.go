package db

import (
	"fmt"
	"github.com/alexandernorth/starthack-2023/backend/config"
	"github.com/alexandernorth/starthack-2023/backend/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"log"
)

var DB *gorm.DB

func InitDB() error {

	log.Printf("Initialising DB, this might take a while...\n")

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%d sslmode=disable TimeZone=Europe/Zurich",
		config.Config.PostgresHost,
		config.Config.PostgresUser,
		config.Config.PostgresPassword,
		config.Config.PostgresDbName,
		config.Config.PostgresPort,
	)
	var err error
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return err
	}

	err = DB.AutoMigrate(
		models.User{},
		models.Score{},
		models.SiteData{},
	)
	if err != nil {
		return err
	}

	err = createUsers()
	if err != nil {
		return err
	}

	err = loadSiteData()
	if err != nil {
		return err
	}

	log.Printf("Database Initialised.\n")

	return nil
}
