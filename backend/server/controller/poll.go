package controller

import (
	"github.com/INFT3000/voting-app/server/database"
	"github.com/INFT3000/voting-app/server/database/models"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type CreatePollRequest struct {
	Title    string   `json:"title"`
	Options  []string `json:"options"`
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
		c.JSON(400, gin.H{"error": err.Error()})
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
		c.AbortWithError(500, err)
		return
	}

	tx.Commit()

	res := CreatePollResponse{
		Uuid: pollModel.Uuid,
	}

	c.JSON(201, gin.H{"response": res})
}

var PollController = New(
	"PollController",
	"/poll",
	&[]Endpoint{
		*NewEndpoint("/", POST, postNewPoll),
	},
	nil,
)
