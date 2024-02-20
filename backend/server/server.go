package server

import (
	"log"
	"strings"
	"time"

	"github.com/INFT3000/voting-app/server/controller"
	"github.com/INFT3000/voting-app/server/database"
	"github.com/INFT3000/voting-app/server/env"
	"github.com/INFT3000/voting-app/server/module"
	"github.com/getsentry/sentry-go"
	sentrygin "github.com/getsentry/sentry-go/gin"
	"github.com/gin-contrib/cors"

	"github.com/gin-gonic/gin"
)

func init() { // called specifically when the package is imported.
	gin.SetMode(gin.DebugMode)

	// initialize database
	env.LoadEnv()
	setupSentry()
	database.ConnectDatabase()
}

func setupSentry() {
	err := sentry.Init(sentry.ClientOptions{
		Dsn:              env.Env.SENTRY_DSN,
		EnableTracing:    true,
		Environment:      env.Env.ENV,
		TracesSampleRate: 1.0, // capture 100% of transactions
	})
	if err != nil {
		log.Fatalf("Failed to initialize sentry: %v\n", err)
	}
}

// createQuickPollApp creates a gin.Engine with configured settings.
// Subscribes the controllers and middleware from a QuickPollModule.
func createQuickPollApp() *gin.Engine {
	g := gin.New()

	// settings
	g.SetTrustedProxies([]string{}) // currently no proxies
	g.RedirectTrailingSlash = false  // /health/ -> /health
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
			*controller.PollController,
		},
		Middleware: []gin.HandlerFunc{
			gin.Logger(),
			gin.Recovery(),
			sentrygin.New(sentrygin.Options{
				Repanic: true, // gin.Recovery() already does this, but we want to capture panics in sentry.

			}),
			cors.New(cors.Config{
				AllowOrigins:     []string{"*"},
				AllowMethods:     []string{"POST", "GET", "OPTIONS", "PUT", "DELETE"},
				AllowHeaders:     []string{"Accept, Baggage, Content-Type, Sentry-Trace, User-Agent"},
				ExposeHeaders:    []string{"Content-Length"},
				AllowCredentials: true,
				AllowOriginFunc: func(origin string) bool {
					return strings.Contains(origin, "localhost") || strings.Contains(origin, "quickpoll.ca")
				},
				MaxAge: 12 * time.Hour,
			}),
		},
		Config: module.QuickPollModuleConfig{
			BasePath: "/api",
		},
	}
	appModule.Initialize()
	return g
}

func Start() {
	engine := createQuickPollApp()
	engine.Run(":8080")
}
