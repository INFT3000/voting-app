package controller

import (
	"net/http"
	"strconv"

	"github.com/INFT3000/voting-app/server/database"
	"github.com/INFT3000/voting-app/server/database/models"
	"github.com/gin-gonic/gin"
)

func getUser(c *gin.Context) {
	// parse id into int or fail
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var user models.User

	database.Context.Find(&user, "id = ?", id)

	database.Context.Model(&user).Where("id = ?", id).Association("Polls").Find(&user.Polls);

	if user.Id == 0 {
		c.IndentedJSON(http.StatusNotFound, gin.H{"error": "user not found"})
		return
	}

	c.IndentedJSON(http.StatusOK, user)
}

func postUser(c *gin.Context) {
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	user.Id = 0 // ensure id is not set, so gorm knows to handle it as a new record

	database.Context.Create(&user)
	c.JSON(http.StatusCreated, gin.H{"status": "created"})
}

func putUser(c *gin.Context) {
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	database.Context.Save(&user)
	c.JSON(http.StatusOK, gin.H{"status": "updated"})
}

func deleteUser(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	user := models.User{
		Id: uint(id),
	}
	database.Context.Delete(&user)
	c.JSON(http.StatusOK, gin.H{"status": "deleted"})
}

var UserController *QuickPollController = New(
	"UserController",
	"/users",
	&[]Endpoint{
		*NewEndpoint("/:id", GET, getUser),
		*NewEndpoint("/", POST, postUser),
		*NewEndpoint("/", PUT, putUser),
		*NewEndpoint("/", DELETE, deleteUser),
	},
	nil, // no middleware
)
