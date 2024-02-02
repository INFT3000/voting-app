package controller

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

type HttpMethod string

const (
	GET    HttpMethod = "GET"
	POST   HttpMethod = "POST"
	PUT    HttpMethod = "PUT"
	DELETE HttpMethod = "DELETE"
	PATCH  HttpMethod = "PATCH"
)

type Endpoint struct {
	Route   string
	Method  HttpMethod
	Handler gin.HandlerFunc
}

type QuickPollController struct {
	Name       string
	Route      string
	Middleware []gin.HandlerFunc
	Endpoints  []Endpoint
}

var Validate *validator.Validate = validator.New(validator.WithRequiredStructEnabled())

func (c *QuickPollController) Initialize(r *gin.Engine, basePath string) error {
	log.New(gin.DefaultWriter, "", log.LstdFlags).Printf("Subscribing endpoints for controller %s", c.Name)
	for _, endpoint := range c.Endpoints {
		route := basePath + c.Route
		group := r.Group(route, c.Middleware...)
		group.Handle(string(endpoint.Method), endpoint.Route, endpoint.Handler)
	}
	return nil
}

// Creates a new QuickPollController with the given name, route, endpoints, and middleware.
// If endpoints or middleware are nil, they will be initialized as empty slices.
func New(name string, route string, endpoints *[]Endpoint, middleware *[]gin.HandlerFunc) *QuickPollController {
	var e []Endpoint
	if endpoints != nil {
		e = *endpoints
	}

	var m []gin.HandlerFunc
	if middleware != nil {
		m = *middleware
	}
	return &QuickPollController{
		Name:       name,
		Route:      route,
		Endpoints:  e,
		Middleware: m,
	}
}

// Creates a new Endpoint with the given subroute, method, and handler.
func NewEndpoint(subRoute string, method HttpMethod, handler gin.HandlerFunc) *Endpoint {
	return &Endpoint{
		Route:   subRoute,
		Method:  method,
		Handler: handler,
	}
	// todo: allow anonymous flag
}
