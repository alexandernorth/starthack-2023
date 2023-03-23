package db

import (
	"errors"
	"github.com/alexandernorth/starthack-2023/backend/models"
	"github.com/goombaio/namegenerator"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"math/rand"
	"time"
)

func createUsers() error {
	users := []models.User{
		{
			Model:           gorm.Model{ID: 1},
			Name:            "Geoff",
			Username:        "geoffthethird",
			Password:        "",
			EmployeeProfile: "Sales",
			Scores: []models.Score{
				{
					Year:   2023,
					Month:  1,
					Amount: rand.Intn(100),
				},
				{
					Year:   2023,
					Month:  2,
					Amount: rand.Intn(100),
				},
				{
					Year:   2023,
					Month:  3,
					Amount: rand.Intn(100),
				},
			},
		},
	}
	seed := time.Now().UTC().UnixNano()
	nameGenerator := namegenerator.NewNameGenerator(seed)

	for i := len(users); i < 50; i++ {
		name := nameGenerator.Generate()
		users = append(users, models.User{
			Model:           gorm.Model{ID: uint(i)},
			Name:            name,
			Username:        "eco" + name,
			Password:        "",
			EmployeeProfile: "Sales",
			Scores: []models.Score{
				{
					Year:   2023,
					Month:  1,
					Amount: rand.Intn(100),
				},
				{
					Year:   2023,
					Month:  2,
					Amount: rand.Intn(100),
				},
				{
					Year:   2023,
					Month:  3,
					Amount: rand.Intn(100),
				},
			},
		})
	}

	for _, user := range users {
		temp := models.User{}
		res := DB.Session(&gorm.Session{Logger: DB.Logger.LogMode(logger.Silent)}).First(&temp, user.ID)
		if res.Error != nil {
			if errors.Is(res.Error, gorm.ErrRecordNotFound) {
				res = DB.Create(&user)
				if res.Error != nil {
					return res.Error
				}
			} else {
				return res.Error
			}
		}
	}
	return nil
}
