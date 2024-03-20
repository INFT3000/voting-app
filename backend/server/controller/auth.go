package controller

import (
	"errors"
	"html"
	"net/http"
	"strings"

	"github.com/INFT3000/voting-app/server/database"
	"github.com/INFT3000/voting-app/server/database/models"
	"github.com/INFT3000/voting-app/server/token"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type UserAuthRequest struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type SignupResponse struct {
	Username string `json:"username"`
}

func postSignup(c *gin.Context) {
	var signup UserAuthRequest
	if err := c.ShouldBindJSON(&signup); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var user models.User
	result := database.Context.Where("username = ?", signup.Username).First(&user)
	if err := result.Error; err != nil {
		if !errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to query database"})
			return
		}
		c.JSON(http.StatusConflict, gin.H{"error": "username already exists"})
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(signup.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to hash password"})
		return
	}

	user = models.User{
		Username: html.EscapeString(strings.TrimSpace(signup.Username)),
		Password: string(hashedPassword),
	}

	database.Context.Create(&user)

	c.JSON(http.StatusCreated, SignupResponse{Username: signup.Username})
}

func postLogin(c *gin.Context) {
	var loginReq UserAuthRequest
	if err := c.ShouldBindJSON(&loginReq); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var user models.User
	database.Context.Where("username = ?", loginReq.Username).First(&user)
	if user.Id == 0 {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid username or password"})
		return
	}

	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(loginReq.Password))
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid username or password"})
		return
	}

	token, err := token.GenerateToken(user.Id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to generate token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"token": token})
}

var AuthController *QuickPollController = New(
	"AuthController",
	"/auth",
	&[]Endpoint{
		*NewEndpoint("/signup", POST, postSignup),
		*NewEndpoint("/login", POST, postLogin),
	},
	nil, // no middleware
)
