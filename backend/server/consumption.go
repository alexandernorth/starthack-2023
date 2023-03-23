package server

import (
	"github.com/alexandernorth/starthack-2023/backend/db"
	"github.com/alexandernorth/starthack-2023/backend/models"
	"github.com/gin-gonic/gin"
	"net/http"
	"time"
)

type consComp struct {
	Local      float64 `json:"local"`
	Overall    float64 `json:"overall"`
	Normalised float64 `json:"normalised"`
}

type consumptionData struct {
	Shift consComp `json:"shift"`
	Site  consComp `json:"site"`
}

func GetConsumptionData(c *gin.Context) {

	now := time.Now()
	monthTS := time.Date(now.Year(), now.Month(), 1, 0, 0, 0, 0, now.Location())

	var shiftLocal float64
	res := db.DB.Model(models.SiteData{}).Select("AVG(kw)").
		Where("time >= ? and date_part('HOUR', time) > 8 and date_part('HOUR', time) < 17 and site = ?", monthTS, models.Zell).
		Find(&shiftLocal)
	if res.Error != nil {
		_ = c.AbortWithError(http.StatusBadRequest, res.Error)
		return
	}
	var shiftOverall float64
	res = db.DB.Model(models.SiteData{}).Select("AVG(kw)").
		Where("time >= ? and date_part('HOUR', time) > 8 and date_part('HOUR', time) < 17", monthTS).
		Find(&shiftOverall)
	if res.Error != nil {
		_ = c.AbortWithError(http.StatusBadRequest, res.Error)
		return
	}
	var local float64
	res = db.DB.Model(models.SiteData{}).Select("AVG(kw)").
		Where("time >= ? and site = ?", monthTS, models.Zell).
		Find(&local)
	if res.Error != nil {
		_ = c.AbortWithError(http.StatusBadRequest, res.Error)
		return
	}
	var overall float64
	res = db.DB.Model(models.SiteData{}).Select("AVG(kw)").
		Where("time >= ?", monthTS).
		Find(&overall)
	if res.Error != nil {
		_ = c.AbortWithError(http.StatusBadRequest, res.Error)
		return
	}

	shiftMax := shiftLocal
	shiftNormal := shiftOverall / shiftMax
	if shiftLocal < shiftOverall {
		shiftMax = shiftOverall
		shiftNormal = -(shiftLocal / shiftMax)
	}

	overallMax := local
	overallNormal := overall / overallMax
	if local < overall {
		overallMax = overallNormal
		overallNormal = -(local / overallMax)
	}

	cd := consumptionData{
		Shift: consComp{
			Local:      shiftLocal,
			Overall:    shiftOverall,
			Normalised: shiftNormal,
		},
		Site: consComp{
			Local:      local,
			Overall:    overall,
			Normalised: overallNormal,
		},
	}

	c.JSON(http.StatusOK, cd)
}
