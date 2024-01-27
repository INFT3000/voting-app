package module

import (
	"log"

	"github.com/INFT3000/voting-app/server/controller"
	"github.com/gin-gonic/gin"
)

// QuickPollModule is used to bundle controllers, middleware, and providers together.
type QuickPollModule struct {
	Engine      *gin.Engine
	Controllers []controller.QuickPollController
	Middleware  []gin.HandlerFunc
}

func (m QuickPollModule) SubscribeEndpoints(r *gin.Engine) {
	for _, controller := range m.Controllers {
		if err := controller.Initialize(r); err != nil {
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
