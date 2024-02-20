package migrations

import (
	"github.com/INFT3000/voting-app/server/database/models"
	"gorm.io/gorm"
)

var OptionUuid002Migration = Migration{
	Version: 2,
	Desc:    "Add uuid column to options table",
	Up: func(m gorm.Migrator) error {
		return m.AddColumn(models.Option{}, "uuid")
	},
	Down: func(m gorm.Migrator) error {
		return m.DropColumn(models.Option{}, "uuid")
	},
}
