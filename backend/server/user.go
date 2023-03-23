package server

import (
	"github.com/alexandernorth/starthack-2023/backend/models"
	"github.com/gin-gonic/gin"
	"net/http"
)

func GetUser(c *gin.Context) {
	c.JSON(http.StatusOK, models.GetExampleUser())
}
