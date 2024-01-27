package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type HealthResp struct {
	Status string `json:"status"`
}

var okayHealthStatus HealthResp = HealthResp{
	Status: "OK",
}

func getHealth(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, okayHealthStatus)
}

func getError(c *gin.Context) {
	panic("test error! hi :)")
}

func postExample(c *gin.Context) {
	var health HealthResp
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
