package controllers

import (
	"log"
	"net/http"

	"github.com/INFT3000/voting-app/server/models"
	"github.com/gin-gonic/gin"
)

type HealthController struct{}

var okayHealthStatus models.Health = models.Health{
	Status: "OK",
}

func (h HealthController) GetHealth(c *gin.Context) {
	c.IndentedJSON(200, okayHealthStatus)
}

func (h HealthController) CauseError(c *gin.Context) {
	c.IndentedJSON(500, models.Health{Status: "Not good!"})
}

func (h HealthController) PostExample(c *gin.Context) {
	var health models.Health
	if err := c.ShouldBindJSON(&health); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	okayHealthStatus.Status = health.Status
	c.JSON(http.StatusCreated, gin.H{"status": health.Status})
}

func (h HealthController) SubscribeEndpoints(r *gin.Engine) error {
	r.GET("/health", h.GetHealth)
	r.GET("/health/error", h.CauseError)
	r.POST("/health", h.PostExample)
	log.New(gin.DefaultWriter, "", log.LstdFlags).Println("Health controller subscribed endpoints")

	return nil
}
