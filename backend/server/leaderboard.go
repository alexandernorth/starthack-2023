package server

import (
	"github.com/alexandernorth/starthack-2023/backend/db"
	"github.com/alexandernorth/starthack-2023/backend/models"
	"github.com/gin-gonic/gin"
	"net/http"
	"sort"
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
			Name:          user.Name,
			Score:         currentScore.Amount,
			IsCurrentUser: user.ID == 1,
		}
	}

	sort.Slice(leaderboard, func(i, j int) bool {
		return leaderboard[i].Score > leaderboard[j].Score
	})

	c.JSON(http.StatusOK, leaderboard)

}
