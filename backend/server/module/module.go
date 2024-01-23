package module

import (
	"log"

	"github.com/gin-gonic/gin"
)

type QuickPollController interface {
	SubscribeEndpoints(r *gin.Engine) error
}

type QuickPollModule struct {
	Engine      *gin.Engine
	Controllers []QuickPollController
	Middleware  []gin.HandlerFunc
}

func (m QuickPollModule) SubscribeEndpoints(r *gin.Engine) {
	for _, controller := range m.Controllers {
		if err := controller.SubscribeEndpoints(r); err != nil {
			log.New(gin.DefaultWriter, "", log.LstdFlags).Println(err)
		}
	}
}

func (m QuickPollModule) SubscribeMiddleware(r *gin.Engine) {
	for _, middleware := range m.Middleware {
		r.Use(middleware)
	}
}

func (m QuickPollModule) Initialize() {
	m.SubscribeMiddleware(m.Engine)
	m.SubscribeEndpoints(m.Engine)
}
