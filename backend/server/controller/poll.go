package controller

import (
	"errors"
	"fmt"
	"net/http"

	"github.com/INFT3000/voting-app/server/database"
	"github.com/INFT3000/voting-app/server/database/models"
	"github.com/INFT3000/voting-app/server/token"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"github.com/google/uuid"
)

type SettingsResponse struct {
	IsMultipleChoice  bool `json:"is_multiple_choice"`
	DisallowAnonymous bool `json:"disallow_anonymous"`
	DisallowSameIp    bool `json:"disallow_same_ip"`
}

type OptionResponse struct {
	Uuid string `json:"uuid"`
	Text string `json:"text"`
}

type PollResponse struct {
	Uuid     string           `json:"uuid"`
	Title    string           `json:"title"`
	Options  []OptionResponse `json:"options"`
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

type ResultsResponse struct {
	PollUuid string `json:"pollUuid"`
	Results  []struct {
		Option string `json:"option"`
		Votes  int    `json:"votes"`
	} `json:"results"`
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
		options = append(options, models.Option{Text: option, Uuid: uuid.New().String()})
	}
	err := tx.Model(&pollModel).Association("Options").Append(options)

	if err != nil {
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
		c.AbortWithError(http.StatusNotFound, pollRes.Error) // Change on build to "Poll not found."
		fmt.Println(pollRes.Error)
		return
	}

	session := models.VoterSession{
		Ip: c.ClientIP(),
	}

	if token.ExtractToken(c) != "" {
		err := token.EnsureTokenIsValid(c)
		if err != nil {
			c.AbortWithError(http.StatusUnauthorized, err)
			return
		}
		token, err := token.ExtractTokenID(c)
		if err != nil {
			c.AbortWithError(http.StatusInternalServerError, err)
			return
		}
		session.UserId = token
	}

	selectedOptionId := 0

	for _, option := range poll.Options {
		if option.Uuid == voteReq.Option {
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
		c.AbortWithError(http.StatusNotFound, result.Error) // Change on build to "Poll not found."
		fmt.Println(result.Error)
		return
	}

	response := PollResponse{
		Uuid:  poll.Uuid,
		Title: poll.Question,
		Options: func() []OptionResponse {
			var options []OptionResponse
			for _, option := range poll.Options {
				options = append(options, OptionResponse{
					Uuid: option.Uuid,
					Text: option.Text,
				})
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

func getResults(c *gin.Context) {
	uuid := c.Param("uuid")

	var poll models.Poll
	result := database.Context.Preload("Options").Preload("PollSettings").First(&poll, "uuid = ?", uuid)

	if result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error) // Change on build to "Poll not found."
		fmt.Println(result.Error)
		return
	}

	response := ResultsResponse{
		PollUuid: poll.Uuid,
		Results: func() []struct {
			Option string `json:"option"`
			Votes  int    `json:"votes"`
		} {
			var results []struct {
				Option string `json:"option"`
				Votes  int    `json:"votes"`
			}
			for _, option := range poll.Options {
				count := database.Context.Model(&option).Association("Votes").Count()
				results = append(results, struct {
					Option string `json:"option"`
					Votes  int    `json:"votes"`
				}{
					Option: option.Text,
					Votes:  int(count),
				})
			}
			return results
		}(),
	}

	c.JSON(http.StatusOK, gin.H{"results": response})
}

var PollController = New(
	"PollController",
	"/poll",
	&[]Endpoint{
		*NewEndpoint("/", POST, postNewPoll),
		*NewEndpoint("/:uuid/vote", POST, postVote),
		*NewEndpoint("/:uuid", GET, getPoll),
		*NewEndpoint("/:uuid/results", GET, getResults),
	},
	nil,
)
