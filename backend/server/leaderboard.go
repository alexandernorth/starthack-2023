package server

import (
	"github.com/alexandernorth/starthack-2023/backend/db"
	"github.com/alexandernorth/starthack-2023/backend/models"
	"github.com/gin-gonic/gin"
	"net/http"
)

func GetLeaderboard(c *gin.Context) {
	var users []models.User
	res := db.DB.Preload("Scores").Find(&users)
	if res.Error != nil {
		_ = c.AbortWithError(http.StatusBadRequest, res.Error)
		return
	}
	leaderboard := make([]models.LeaderboardEntry, len(users))
	for i, user := range users {
		currentScore, err := user.GetCurrentMonthScore()
		if err != nil {
			_ = c.AbortWithError(http.StatusBadRequest, err)
			return
		}

		leaderboard[i] = models.LeaderboardEntry{
			Name:  user.Name,
			Score: currentScore.Amount,
		}
	}

	c.JSON(http.StatusOK, leaderboard)

}
