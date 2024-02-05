package controller

import (
	"net/http"

	"github.com/INFT3000/voting-app/server/database"
	"github.com/INFT3000/voting-app/server/database/models"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"github.com/google/uuid"
	
)

type CreatePollRequest struct {
	Title    string   `json:"title" validate:"required,gte=2"`
	Options  []string `json:"options" validate:"required,dive,gte=1"`
	Settings struct {
		IsMultipleChoice  bool `json:"isMultipleChoice"`
		DisallowAnonymous bool `json:"disallowAnonymous"`
		DisallowSameIp    bool `json:"disallowSameIp"`
	} `json:"settings"`
}

type CreatePollResponse struct {
	Uuid string `json:"uuid"`
}

func postNewPoll(c *gin.Context) {
	var poll CreatePollRequest
	if err := c.ShouldBindJSON(&poll); err != nil {
		c.Errors = append(c.Errors, err.(*gin.Error))
		c.AbortWithError(http.StatusBadRequest, err)
		return
	}

	// validate
	if err := Validate.Struct(poll); err != nil {
		c.Errors = append(c.Errors, err.(*gin.Error))
		c.AbortWithError(http.StatusBadRequest, err.(validator.ValidationErrors))
		return
	}

	// start transaction
	tx := database.Context.Begin()

	// Settings
	pollSettingsModel := models.PollSettings{
		MultipleChoice:    poll.Settings.IsMultipleChoice,
		DisallowAnonymous: poll.Settings.DisallowAnonymous,
		DisallowSameIp:    poll.Settings.DisallowSameIp,
	}
	tx.Create(&pollSettingsModel)

	// Poll
	pollModel := models.Poll{
		Question:       poll.Title,
		PollSettingsId: pollSettingsModel.Id,
		Uuid:           uuid.New().String(),
	}
	tx.Create(&pollModel)

	// Options
	var options []models.Option
	for _, option := range poll.Options {
		options = append(options, models.Option{Text: option})
	}
	err := tx.Model(&pollModel).Association("Options").Append(options)

	if err != nil {
		c.Errors = append(c.Errors, err.(*gin.Error))
		tx.Rollback()
		c.AbortWithError(http.StatusInternalServerError, err)
		return
	}

	tx.Commit()

	res := CreatePollResponse{
		Uuid: pollModel.Uuid,
	}

	c.JSON(http.StatusCreated, gin.H{"response": res})
}

func getPoll(c *gin.Context) {
	

	uuid := c.Param("uuid") 

	var poll models.Poll
	result := database.Context.Preload("Options").Preload("PollSettings").First(&poll, "uuid = ?", uuid)

	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Poll not found"})
		return
	}

	
	response := struct {
		Uuid      string   `json:"uuid"`
		Title     string   `json:"title"`
		Options   []string `json:"options"`
		Settings  struct {
			IsMultipleChoice  bool `json:"isMultipleChoice"`
			DisallowAnonymous bool `json:"disallowAnonymous"`
			DisallowSameIp    bool `json:"disallowSameIp"`
		} `json:"settings"`
	}{
		Uuid:  poll.Uuid,
		Title: poll.Question,
		Options: func() []string {
			var options []string
			for _, option := range poll.Options {
				options = append(options, option.Text)
			}
			return options
		}(),
		Settings: struct {
			IsMultipleChoice  bool `json:"isMultipleChoice"`
			DisallowAnonymous bool `json:"disallowAnonymous"`
			DisallowSameIp    bool `json:"disallowSameIp"`
		}{
			IsMultipleChoice:  poll.PollSettings.MultipleChoice,
			DisallowAnonymous: poll.PollSettings.DisallowAnonymous,
			DisallowSameIp:    poll.PollSettings.DisallowSameIp,
		},
	}

	c.JSON(http.StatusOK, gin.H{"poll": response})
}

var PollController = New(
	"PollController",
	"/poll",
	&[]Endpoint{
		*NewEndpoint("/", POST, postNewPoll),
		*NewEndpoint("/:uuid", GET, getPoll),
	},
	nil,
)
