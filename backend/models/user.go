package models

type User struct {
	Name     string
	Username string
	Password string
	Scores   []Score
}

func GetExampleUser() *User {

	return &User{
		Name:     "Geoff",
		Username: "geoffthethird",
		Password: "",
		Scores: []Score{
			{
				Year:   2023,
				Month:  1,
				Amount: 5,
			},
			{
				Year:   2023,
				Month:  2,
				Amount: 10,
			},
			{
				Year:   2023,
				Month:  3,
				Amount: 20,
			},
		},
	}
}
