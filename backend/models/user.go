package models

import (
	"fmt"
	"gorm.io/gorm"
	"time"
)

type Sites int

const (
	Zell Sites = iota
	Schiltach
	DaellikonFeldhof
	Orbe
)

func ParseString(s string) (Sites, error) {
	switch s {
	case "zell":
		return Zell, nil
	case "schiltach":
		return Schiltach, nil
	case "daellikonfeldhof":
		return DaellikonFeldhof, nil
	case "orbe":
		return Orbe, nil
	default:
		return Zell, fmt.Errorf("invalid site location")
	}
}

type User struct {
	gorm.Model
	Name            string  `json:"name"`
	Username        string  `json:"uname"`
	Password        string  `json:"password"`
	EmployeeProfile string  `json:"employeeProfile"`
	Site            Sites   `json:"site"`
	Scores          []Score `json:"scores" gorm:"foreignKey:UserID"`
}

func (u *User) GetCurrentMonthScore() (*Score, error) {
	var recent *Score
	year, month, _ := time.Now().Date()

	if len(u.Scores) == 0 {
		return nil, nil
	} else {
		recent = &u.Scores[len(u.Scores)-1]
		if !(recent.Year == year && recent.Month == month) {
			return nil, nil
		} else {
			return recent, nil
		}
	}
}
