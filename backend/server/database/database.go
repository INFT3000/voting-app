package database

import (
	"fmt"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"

	"github.com/INFT3000/voting-app/server/database/migrations"
	"github.com/INFT3000/voting-app/server/env"
)

var Context *gorm.DB

func RunMigrations(db *gorm.DB) error {
	migrator := migrations.New(db)
	return migrator.RunMigrations()
}

func ConnectDatabase() {
	var dsn string = fmt.Sprintf(
		"%s:%s@tcp(%s:%s)/%s?%s",
		env.Env.DB_USER,
		env.Env.DB_PASSWORD,
		env.Env.DB_HOST,
		env.Env.DB_PORT,
		env.Env.DB_DATABASE,
		env.Env.DB_DSN_PARAMS,
	)

	connectionConfig := mysql.Config{
		DSN:                       dsn,
		DefaultStringSize:         256,
		DontSupportRenameIndex:    false, // index rename works as of mysql v5.7
		DontSupportRenameColumn:   false, // column rename works as of mysql v8
		SkipInitializeWithVersion: false, // auto configure based on currently running mysql version
	}
	database, err := gorm.Open(mysql.New(connectionConfig), &gorm.Config{})

	if err != nil {
		panic("Failed to connect to database!")
	}

	err = RunMigrations(database)

	if err != nil {
		panic("Failed to migrate database!\n" + err.Error())
	}

	Context = database
}
