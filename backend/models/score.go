package models

import (
	"gorm.io/gorm"
	"time"
)

type Score struct {
	gorm.Model
	UserID uint `json:"-"`
	Year   int
	Month  time.Month
	Amount int
}
