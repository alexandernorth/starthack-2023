package db

import (
	"errors"
	"fmt"
	"github.com/alexandernorth/starthack-2023/backend/config"
	"github.com/alexandernorth/starthack-2023/backend/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() error {
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%d sslmode=disable TimeZone=Europe/Zurich",
		config.Config.PostgresHost,
		config.Config.PostgresUser,
		config.Config.PostgresPassword,
		config.Config.PostgresDBName,
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
	)
	if err != nil {
		return err
	}
	defaultUser := &models.User{
		Model:           gorm.Model{ID: 1},
		Name:            "Geoff",
		Username:        "geoffthethird",
		Password:        "",
		EmployeeProfile: "Sales",
		Scores: []models.Score{
			{
				Year:   2023,
				Month:  1,
				Amount: 5,
			},
			{
				Year:   2023,
				Month:  2,
				Amount: 10,
			},
			{
				Year:   2023,
				Month:  3,
				Amount: 20,
			},
		},
	}

	temp := &models.User{}
	res := DB.Find(temp, 1)
	if res.Error != nil {
		if errors.Is(res.Error, gorm.ErrRecordNotFound) {
			res = DB.Create(defaultUser)
			if res.Error != nil {
				return res.Error
			}
		} else {
			return res.Error
		}
	}
	return nil
}
