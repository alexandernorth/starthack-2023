package server

import (
	"github.com/alexandernorth/starthack-2023/backend/db"
	"github.com/alexandernorth/starthack-2023/backend/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"net/http"
	"time"
)

func getUser(id uint) (*models.User, error) {

	user := &models.User{}
	res := db.DB.Preload("Scores").First(user, id)
	if res.Error != nil {
		return nil, res.Error
	}

	rScore, err := user.GetCurrentMonthScore()
	if err != nil {
		return nil, err
	}

	if rScore == nil {
		year, month, _ := time.Now().Date()
		recent := models.Score{
			Year:   year,
			Month:  month,
			Amount: 0,
		}
		user.Scores = append(user.Scores, recent)
		res := db.DB.Save(user)
		if res.Error != nil {
			return nil, res.Error
		}
	}
	return user, nil
}

func GetDefaultUser(c *gin.Context) {

	user, err := getUser(1)
	if err != nil {
		_ = c.AbortWithError(http.StatusBadRequest, err)
		return
	}

	c.JSON(http.StatusOK, user)
}

type patchRequest struct {
	Score int `json:"score"`
}

func PatchDefaultUserScore(c *gin.Context) {
	var preq patchRequest
	err := c.ShouldBind(&preq)
	if err != nil {
		_ = c.AbortWithError(http.StatusBadRequest, err)
		return
	}

	user, err := getUser(1)
	if err != nil {
		_ = c.AbortWithError(http.StatusBadRequest, err)
		return
	}

	user.Scores[len(user.Scores)-1].Amount = preq.Score

	res := db.DB.Session(&gorm.Session{FullSaveAssociations: true}).Save(user)
	if res.Error != nil {
		_ = c.AbortWithError(http.StatusBadRequest, res.Error)
		return
	}

	GetDefaultUser(c)
}
