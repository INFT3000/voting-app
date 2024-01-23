package database

import (
	"gorm.io/driver/mysql"
	_ "gorm.io/driver/mysql"
	"gorm.io/gorm"

	"github.com/INFT3000/voting-app/server/database/models"
)

var DB *gorm.DB
var dsn string = "user:mysql@tcp(127.0.0.1:3306)/quickpoll?charset=utf8mb4" // todo: construct from env

func ConnectDatabase() {
	connectionConfig := mysql.Config{
		DSN: dsn,
		DefaultStringSize: 256,
		DontSupportRenameIndex: false, // index rename works as of mysql v5.7
		DontSupportRenameColumn: false, // column rename works as of mysql v8
		SkipInitializeWithVersion: false, // auto configure based on currently running mysql version
	}
	database, err := gorm.Open(mysql.New(connectionConfig), &gorm.Config{})

	if err != nil {
		panic("Failed to connect to database!")
	}

	err = database.AutoMigrate(
		&models.User{},
		&models.VoterSession{},
		&models.PollSettings{},
		&models.Poll{},
		&models.Option{},
		&models.Vote{},
	)

	if err != nil {
		panic("Failed to migrate database!")
	}

	DB = database
}
