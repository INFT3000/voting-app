package migrations

import (
	"log"

	"github.com/INFT3000/voting-app/server/database/models"
	"gorm.io/gorm"
)

type Migration struct {
	Version uint
	Desc    string
	Up      func(gorm.Migrator) error
	Down    func(gorm.Migrator) error
}

type MigrationRunner struct {
	db         *gorm.DB
	Migrations []Migration
}

func (m *MigrationRunner) RunMigrations() error {
	for _, migration := range m.Migrations {
		var currentVersion models.Version
		// check first if Version table exists
		if m.db.Migrator().HasTable(&models.Version{}) {
			m.db.Order("migration_number desc").Limit(1).Find(&currentVersion)
		}
		if currentVersion.MigrationNumber >= migration.Version {
			log.Default().Printf("Skipping migration %d: %s", migration.Version, migration.Desc)
			continue
		}
		log.Default().Printf("Running migration %d: %s", migration.Version, migration.Desc)
		tx := m.db.Begin()
		err := migration.Up(m.db.Migrator())
		if err != nil {
			log.Fatalf("Failed to run migration %d: %s\n%s", migration.Version, migration.Desc, err.Error())
			tx.Rollback()
			return err
		}
		tx.Create(&models.Version{MigrationNumber: migration.Version, Desc: migration.Desc})
		tx.Commit()
		log.Default().Printf("Migration %d: %s complete", migration.Version, migration.Desc)
	}
	log.Default().Println("All migrations complete!")
	return nil
}

func New(db *gorm.DB) *MigrationRunner {
	return &MigrationRunner{
		db: db,
		Migrations: []Migration{
			Init001Migration,
			OptionUuid002Migration,
		},
	}
}
