package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Name            string  `json:"name"`
	Username        string  `json:"username"`
	Password        string  `json:"password"`
	EmployeeProfile string  `json:"employeeProfile"`
	Scores          []Score `json:"scores" gorm:"foreignKey:UserID"`
}
