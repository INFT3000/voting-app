package server

import (
	"net/http"

	"github.com/INFT3000/voting-app/server/responses"

	"github.com/gin-gonic/gin"
)

var resp responses.Ex = responses.Ex{
	ID:   1,
	Name: "Example",
}

func getEx(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, resp)
}

func Start() {
	router := gin.Default()
	router.GET("/ex", getEx)
	router.Run(":8080")
}
