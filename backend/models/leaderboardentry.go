package models

type LeaderboardEntry struct {
	Name          string `json:"name"`
	Score         int    `json:"score"`
	IsCurrentUser bool   `json:"isCurrentUser"`
}
