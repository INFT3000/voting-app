package controller

import "github.com/gin-gonic/gin"

type CreatePollRequest struct {
	Title    string   `json:"title"`
	Options  []string `json:"options"`
	Settings struct {
		IsMultipleChoice  bool `json:"isMultipleChoice"`
		DisallowAnonymous bool `json:"disallowAnonymous"`
		DisallowSameIp    bool `json:"disallowSameIp"`
	} `json:"settings"`
}

func postNewPoll(c *gin.Context) {
	var poll CreatePollRequest
	if err := c.ShouldBindJSON(&poll); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	// temp, log the poll
	c.JSON(200, poll)
}

var PollController = New(
	"PollController",
	"/poll",
	&[]Endpoint{
		*NewEndpoint("/", POST, postNewPoll),
	},
	nil,
)
