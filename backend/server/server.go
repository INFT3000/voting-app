package server

import (
	"github.com/INFT3000/voting-app/server/controller"
	"github.com/INFT3000/voting-app/server/database"
	"github.com/INFT3000/voting-app/server/module"

	"github.com/gin-gonic/gin"
)

func init() { // called specifically when the package is imported.
	gin.SetMode(gin.DebugMode)

	// initialize database
	database.ConnectDatabase()
}

// createQuickPollApp creates a gin.Engine with configured settings.
// Subscribes the controllers and middleware from a QuickPollModule.
func createQuickPollApp() *gin.Engine {
	g := gin.New()

	// settings
	g.SetTrustedProxies([]string{}) // currently no proxies
	g.RedirectTrailingSlash = true  // /health/ -> /health
	g.RedirectFixedPath = false     // tries to find the correct route. best disabled, we only expect frontend to use the correct routes.
	g.ForwardedByClientIP = true    // X-Forwarded-For header
	g.UseRawPath = false            // finds parameters in the raw path, not the decoded path. disabled because decoded seems safer?
	g.UnescapePathValues = true     // unescapes path values. this is already done since RawPath is disabled, and Path is decoded.

	// module is where we register controllers, middleware, providers.
	appModule := module.QuickPollModule{
		Engine: g,
		Controllers: []controller.QuickPollController{
			*controller.HealthController,
			*controller.UserController,
		},
		Middleware: []gin.HandlerFunc{
			gin.Logger(),
			gin.Recovery(),
		},
	}
	appModule.Initialize()
	return g
}

func Start() {
	engine := createQuickPollApp()
	engine.Run(":8080")
}
