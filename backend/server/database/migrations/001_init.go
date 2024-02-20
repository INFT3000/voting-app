package migrations

import (
	"gorm.io/gorm"
)

type version struct {
	Id              uint
	MigrationNumber uint
	Desc            string
}

type user struct {
	Id       uint
	Email    string
	Username string
	Password string

	Polls []poll
}

type voterSession struct {
	Id     uint
	UserId uint
	Ip     string
}

type pollSettings struct {
	Id                uint
	MultipleChoice    bool
	DisallowSameIp    bool
	DisallowAnonymous bool
}

type poll struct {
	Id             uint
	UserId         *uint
	Uuid           string
	PollSettingsId uint
	Question       string

	User         user
	PollSettings pollSettings
	Options      []option
}

type option struct {
	Id     uint
	PollId uint
	Text   string

	Votes []vote
}

type vote struct {
	Id             uint
	PollId         uint
	VoterSessionId uint
	OptionId       uint

	Poll         poll
	VoterSession voterSession
	Option       option
}

var Init001Migration = Migration{
	Version: 1,
	Desc:    "init the database",
	Up: func(m gorm.Migrator) error {
		err := m.CreateTable(&version{})
		if err != nil {
			return err
		}
		err = m.CreateTable(&user{})
		if err != nil {
			return err
		}
		err = m.CreateTable(&voterSession{})
		if err != nil {
			return err
		}
		err = m.CreateTable(&pollSettings{})
		if err != nil {
			return err
		}
		err = m.CreateTable(&poll{})
		if err != nil {
			return err
		}
		err = m.CreateTable(&option{})
		if err != nil {
			return err
		}
		err = m.CreateTable(&vote{})
		if err != nil {
			return err
		}
		return nil
	},
	Down: func(m gorm.Migrator) error {
		return gorm.ErrNotImplemented
	},
}
