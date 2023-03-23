package server

import (
	"github.com/alexandernorth/starthack-2023/backend/db"
	"github.com/alexandernorth/starthack-2023/backend/models"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
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
	siteQuery := c.DefaultQuery("site", "0")
	site, err := strconv.Atoi(siteQuery)
	if err != nil {
		_ = c.AbortWithError(http.StatusBadRequest, err)
		return
	}

	now := time.Now()
	monthTS := time.Date(now.Year(), now.Month(), 1, 0, 0, 0, 0, now.Location())

	var shiftLocal float64
	res := db.DB.Model(models.SiteData{}).Select("AVG(kw)").
		Where("time >= ? and date_part('HOUR', time) > 8 and date_part('HOUR', time) < 17 and site = ?", monthTS, site).
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
		Where("time >= ? and site = ?", monthTS, site).
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

	diffS := shiftLocal - shiftOverall
	shiftMax := shiftLocal
	if shiftLocal < shiftOverall {
		shiftMax = shiftOverall
	}

	diffO := local - overall
	overallMax := local
	if local < overall {
		overallMax = overall
	}

	cd := consumptionData{
		Shift: consComp{
			Local:      shiftLocal,
			Overall:    shiftOverall,
			Normalised: diffS / shiftMax,
		},
		Site: consComp{
			Local:      local,
			Overall:    overall,
			Normalised: diffO / overallMax,
		},
	}

	c.JSON(http.StatusOK, cd)
}
