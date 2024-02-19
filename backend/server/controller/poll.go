package controller

import (
	"errors"
	"fmt"
	"net/http"

	"github.com/INFT3000/voting-app/server/database"
	"github.com/INFT3000/voting-app/server/database/models"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"github.com/google/uuid"
)

type SettingsResponse struct {
	IsMultipleChoice  bool `json:"is_multiple_choice"`
	DisallowAnonymous bool `json:"disallow_anonymous"`
	DisallowSameIp    bool `json:"disallow_same_ip"`
}

type PollResponse struct {
	Uuid     string           `json:"uuid"`
	Title    string           `json:"title"`
	Options  []string         `json:"options"`
	Settings SettingsResponse `json:"settings"`
}

type CreatePollRequest struct {
	Title    string   `json:"title" validate:"required,gte=2"`
	Options  []string `json:"options" validate:"required,dive,gte=1"`
	Settings struct {
		IsMultipleChoice  bool `json:"isMultipleChoice"`
		DisallowAnonymous bool `json:"disallowAnonymous"`
		DisallowSameIp    bool `json:"disallowSameIp"`
	} `json:"settings"`
}

type VoteRequest struct {
	Option string `json:"option" validate:"required,gte=2"`
}

type VoteResponse struct {
	PollUuid string `json:"pollUuid"`
	Option   string `json:"option"`
	Success  bool   `json:"success"`
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

func postVote(c *gin.Context) {
	var voteReq VoteRequest
	if err := c.ShouldBindJSON(&voteReq); err != nil {
		c.Errors = append(c.Errors, err.(*gin.Error))
		c.AbortWithError(http.StatusBadRequest, err)
		return
	}

	uuid := c.Param("uuid")

	var poll models.Poll
	pollRes := database.Context.Preload("Options").Preload("PollSettings").First(&poll, "uuid = ?", uuid)

	if pollRes.Error != nil {
		c.Errors = append(c.Errors, pollRes.Error.(*gin.Error))
		c.AbortWithError(http.StatusNotFound, pollRes.Error) // Change on build to "Poll not found."
		fmt.Println(pollRes.Error)
		return
	}

	session := models.VoterSession{
		Ip: c.ClientIP(),
	}

	selectedOptionId := 0

	for _, option := range poll.Options {
		if option.Text == voteReq.Option {
			selectedOptionId = int(option.Id)
		}
	}

	if selectedOptionId == 0 {
		err := &gin.Error{
			Err:  errors.New("option not found"),
			Type: gin.ErrorTypePublic,
		}
		c.Errors = append(c.Errors, err)
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	tx := database.Context.Begin()

	tx.Create(&session)

	vote := models.Vote{
		PollId:         poll.Id,
		VoterSessionId: session.Id,
		OptionId:       uint(selectedOptionId),
	}

	tx.Create(&vote)

	tx.Commit()

	res := VoteResponse{
		PollUuid: poll.Uuid,
		Option:   voteReq.Option,
		Success:  true,
	}

	c.JSON(http.StatusCreated, gin.H{"response": res})
}

func getPoll(c *gin.Context) {

	uuid := c.Param("uuid")

	var poll models.Poll
	result := database.Context.Preload("Options").Preload("PollSettings").First(&poll, "uuid = ?", uuid)

	if result.Error != nil {
		c.Errors = append(c.Errors, result.Error.(*gin.Error))
		c.AbortWithError(http.StatusNotFound, result.Error) // Change on build to "Poll not found."
		fmt.Println(result.Error)
		return
	}

	response := PollResponse{
		Uuid:  poll.Uuid,
		Title: poll.Question,
		Options: func() []string {
			var options []string
			for _, option := range poll.Options {
				options = append(options, option.Text)
			}
			return options
		}(),
		Settings: SettingsResponse{
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
		*NewEndpoint("/:uuid/vote", POST, postVote),
		*NewEndpoint("/:uuid", GET, getPoll),
	},
	nil,
)
