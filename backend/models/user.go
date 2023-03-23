package models

import (
	"gorm.io/gorm"
	"time"
)

type User struct {
	gorm.Model
	Name            string  `json:"name"`
	Username        string  `json:"uname"`
	Password        string  `json:"password"`
	EmployeeProfile string  `json:"employeeProfile"`
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
