package server

import (
	"github.com/alexandernorth/starthack-2023/backend/db"
	"github.com/alexandernorth/starthack-2023/backend/models"
	"github.com/gin-gonic/gin"
	"net/http"
	"time"
)

func GetDefaultUser(c *gin.Context) {
	user := &models.User{}
	res := db.DB.Preload("Scores").First(user, 1)
	if res.Error != nil {
		_ = c.AbortWithError(http.StatusBadRequest, res.Error)
		return
	}
	year, month, _ := time.Now().Date()

	var recent models.Score

	if len(user.Scores) == 0 {
		recent = models.Score{
			Year:   year,
			Month:  month,
			Amount: 1000,
		}

		user.Scores = append(user.Scores, recent)
		res := db.DB.Save(user)
		if res.Error != nil {
			_ = c.AbortWithError(http.StatusBadRequest, res.Error)
			return
		}

	} else {
		recent = user.Scores[len(user.Scores)-1]
		if !(recent.Year == year && recent.Month == month) {
			recent = models.Score{
				Year:   year,
				Month:  month,
				Amount: 1000,
			}

			user.Scores = append(user.Scores, recent)

			res := db.DB.Save(user)
			if res.Error != nil {
				_ = c.AbortWithError(http.StatusBadRequest, res.Error)
				return
			}
		}
	}

	c.JSON(http.StatusOK, user)
}
