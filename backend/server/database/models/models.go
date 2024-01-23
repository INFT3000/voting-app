package models

type User struct {
	Id       uint   `json:"id" gorm:"primary_key"`
	Username string `json:"username"`
	Password string `json:"password"` // will not be stored in plaintext or ever sent to client.
}

type VoterSession struct { // stores info about one particular voter's session whether or not they have an account.
	Id     uint   `json:"id" gorm:"primary_key"`
	UserId uint   `json:"user_id"`
	Ip     string `json:"ip"`
} // info like this should be deleted after poll is closed.

type PollSettings struct {
	Id                uint `json:"id" gorm:"primary_key"`
	MultipleChoice    bool `json:"multiple_choice"`
	DisallowSameIp    bool `json:"disallow_same_ip"`
	DisallowAnonymous bool `json:"disallow_anonymous"`
}

type Poll struct {
	Id         uint   `json:"id" gorm:"primary_key"`
	OwnerID    uint   `json:"owner_id"`
	SettingsId uint   `json:"settings_id"`
	Question   string `json:"question"`
}

type Option struct {
	Id     uint   `json:"id" gorm:"primary_key"`
	PollID uint   `json:"poll_id"`
	Text   string `json:"text"`
}

type Vote struct {
	Id       uint `json:"id" gorm:"primary_key"`
	PollID   uint `json:"poll_id"`
	VoterId  uint `json:"voter_id"`
	OptionID uint `json:"option_id"`
}
