package controller

import (
	"net/http"

	"github.com/INFT3000/voting-app/server/models"
	"github.com/gin-gonic/gin"
)

var okayHealthStatus models.Health = models.Health{
	Status: "OK",
}

func getHealth(c *gin.Context) {
	c.IndentedJSON(200, okayHealthStatus)
}

func getError(c *gin.Context) {
	c.IndentedJSON(500, models.Health{Status: "Not good!"})
}

func postExample(c *gin.Context) {
	var health models.Health
	if err := c.ShouldBindJSON(&health); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	okayHealthStatus.Status = health.Status
	c.JSON(http.StatusCreated, gin.H{"status": health.Status})
}

var HealthController *QuickPollController = New(
	"HealthController",
	"/health",
	&[]Endpoint{
		*NewEndpoint("/", GET, getHealth),
		*NewEndpoint("/error", GET, getError),
		*NewEndpoint("/", POST, postExample),
	},
	nil, // no middleware
)
