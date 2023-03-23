package models

import (
	"gorm.io/gorm"
	"time"
)

type SiteData struct {
	gorm.Model
	Site Sites     `json:"site"`
	Time time.Time `json:"time" gorm:"index"`
	Kw   float64   `json:"kw"`
}
type ElectricityConsumption struct {
}
