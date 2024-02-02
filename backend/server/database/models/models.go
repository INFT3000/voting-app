package models

type User struct {
	Id       uint   `json:"id" gorm:"primary_key"`
	Email    string `json:"email"`
	Username string `json:"username"`
	Password string // will not be stored in plaintext or ever sent to client.

	Polls []Poll `json:"polls"`
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
	Id             uint   `json:"id" gorm:"primary_key"`
	UserId         *uint   `json:"owner_id"`
	Uuid           string `json:"uuid"`
	PollSettingsId uint   `json:"poll_settings_id"`
	Question       string `json:"question"`

	User         User         `json:"user"`
	PollSettings PollSettings `json:"settings"`
	Options      []Option     `json:"options"`
}

type Option struct {
	Id     uint   `json:"id" gorm:"primary_key"`
	PollId uint   `json:"poll_id"`
	Text   string `json:"text"`

	Votes []Vote `json:"votes"`
}

type Vote struct {
	Id             uint `json:"id" gorm:"primary_key"`
	PollId         uint `json:"poll_id"`
	VoterSessionId uint `json:"voter_id"`
	OptionId       uint `json:"option_id"`

	Poll         Poll         `json:"poll"`
	VoterSession VoterSession `json:"voter"`
	Option       Option       `json:"option"`
}
