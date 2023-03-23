package db

import (
	"archive/zip"
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/alexandernorth/starthack-2023/backend/models"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"io"
	"io/fs"
	"math/rand"
	"net/http"
	"path"
)

func generateNameAPI() (string, error) {
	url := "https://randomuser.me/api/"
	method := "GET"

	client := &http.Client{}
	req, err := http.NewRequest(method, url, nil)

	if err != nil {
		return "", err
	}

	res, err := client.Do(req)
	if err != nil {
		return "", err
	}

	defer func(Body io.ReadCloser) {
		_ = Body.Close()
	}(res.Body)

	var rn struct {
		Results []struct {
			Name struct {
				First string `json:"first"`
				Last  string `json:"last"`
			} `json:"name"`
		} `json:"results"`
	}

	body, err := io.ReadAll(res.Body)
	if err != nil {
		return "", err
	}

	err = json.Unmarshal(body, &rn)
	if err != nil {
		return "", err
	}

	if len(rn.Results) > 0 {
		return rn.Results[0].Name.First + " " + rn.Results[0].Name.Last, nil
	}

	return "", fmt.Errorf("no results for name generation api")

}

func createUsers() error {
	users := []models.User{
		{
			Model:           gorm.Model{ID: 1},
			Name:            "Geoff Jeffers",
			Username:        "geoffthethird",
			Password:        "",
			EmployeeProfile: "Sales",
			Site:            models.Zell,
			Scores: []models.Score{
				{
					Year:   2023,
					Month:  1,
					Amount: 10 + rand.Intn(10),
				},
				{
					Year:   2023,
					Month:  2,
					Amount: 10 + rand.Intn(10),
				},
				{
					Year:   2023,
					Month:  3,
					Amount: 10 + rand.Intn(10),
				},
			},
		},
	}

	for i := len(users); i < 50; i++ {
		name, err := generateNameAPI()
		if err != nil {
			return err
		}
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
					Amount: rand.Intn(10),
				},
				{
					Year:   2023,
					Month:  2,
					Amount: rand.Intn(10),
				},
				{
					Year:   2023,
					Month:  3,
					Amount: rand.Intn(10),
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
	defer func(reader *zip.ReadCloser) {
		_ = reader.Close()
	}(reader)

	sd, err := reader.Open("sitedata.json")
	if err != nil {
		return err
	}
	defer func(sd fs.File) {
		_ = sd.Close()
	}(sd)

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
