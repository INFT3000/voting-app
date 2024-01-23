package env

import (
	"os"

	"github.com/joho/godotenv"
)

/*
DB_USER=user
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=quickpoll
DB_DSN_PARAMS=charset=utf8mb4
DB_PASSWORD=
*/

type Environment struct {
	DB_USER       string
	DB_HOST       string
	DB_PORT       string
	DB_DATABASE   string
	DB_DSN_PARAMS string
	DB_PASSWORD   string
}

var Env *Environment = &Environment{}

func LoadEnv() {
	err := godotenv.Load(".env", ".secret.env")
	if err != nil {
		panic("Failed to load environment variables!")
	}

	Env.DB_USER = os.Getenv("DB_USER")
	Env.DB_HOST = os.Getenv("DB_HOST")
	Env.DB_PORT = os.Getenv("DB_PORT")
	Env.DB_DATABASE = os.Getenv("DB_DATABASE")
	Env.DB_DSN_PARAMS = os.Getenv("DB_DSN_PARAMS")
	Env.DB_PASSWORD = os.Getenv("DB_PASSWORD")
}
