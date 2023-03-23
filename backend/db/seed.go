package db

import (
	"archive/zip"
	"bytes"
	"encoding/json"
	"errors"
	"github.com/alexandernorth/starthack-2023/backend/models"
	"github.com/goombaio/namegenerator"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"math/rand"
	"path"
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
			Site:            models.Zell,
			Scores: []models.Score{
				{
					Year:   2023,
					Month:  1,
					Amount: 100 + rand.Intn(100),
				},
				{
					Year:   2023,
					Month:  2,
					Amount: 100 + rand.Intn(100),
				},
				{
					Year:   2023,
					Month:  3,
					Amount: 100 + rand.Intn(100),
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
			Username:        "eco-" + name,
			Password:        "",
			EmployeeProfile: "Sales",
			Site:            models.Sites(rand.Intn(4)),
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

func loadSiteData() error {
	var sdCount int64
	res := DB.Model(models.SiteData{}).Count(&sdCount)
	if res.Error != nil {
		return res.Error
	}

	if sdCount != 0 {
		return nil
	}

	reader, err := zip.OpenReader(path.Join("raw-data", "sitedata.json.zip"))
	if err != nil {
		return err
	}

	sd, err := reader.Open("sitedata.json")
	if err != nil {
		return err
	}

	var b bytes.Buffer
	_, err = b.ReadFrom(sd)
	if err != nil {
		return err
	}

	var sites []models.SiteData
	err = json.Unmarshal(b.Bytes(), &sites)
	if err != nil {
		return err
	}

	res = DB.CreateInBatches(sites, 5000)
	if res.Error != nil {
		return res.Error
	}

	return nil

}
