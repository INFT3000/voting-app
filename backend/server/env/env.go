package env

import (
	"fmt"
	"os"
	"reflect"

	"github.com/go-playground/validator/v10"
	"github.com/joho/godotenv"
)

var validate *validator.Validate = validator.New(validator.WithRequiredStructEnabled())

type Environment struct {
	DB_USER             string `validate:"required,alphanum"`
	DB_HOST             string `validate:"required,ip"`
	DB_PORT             string `validate:"required,numeric"`
	DB_DATABASE         string `validate:"required,alphanum"`
	DB_DSN_PARAMS       string `validate:"required"`
	DB_PASSWORD         string `validate:"required"`
	TOKEN_HOUR_LIFESPAN string `validate:"required,numeric,min=1"`
	JWT_SECRET          string `validate:"required,alphanum"`

	SENTRY_DSN string `validate:"required,url"`
	ENV        string `validate:"required,oneof=dev prod"` // when prod is up, `validate:"required,oneof=dev prod"`
}

var Env *Environment = &Environment{}

func LoadEnv() {
	godotenv.Load(".env", ".secret.env") // this can give an error but we validate after and that gives us more info.

	v := reflect.ValueOf(Env).Elem()

	for i := 0; i < v.NumField(); i++ {
		fieldName := v.Type().Field(i).Name
		v.Field(i).SetString(os.Getenv(fieldName))
	}

	err := validate.Struct(Env)
	if err != nil {
		if validationErrors, ok := err.(validator.ValidationErrors); ok {
			for _, e := range validationErrors {
				fmt.Printf("Error in field: %s, Condition: %s\n", e.StructField(), e.ActualTag())
			}
		}
		os.Exit(1)
	}
}
