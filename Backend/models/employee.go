package models

import "time"

type Employee struct {
	ID        int64    `json:"id"`
	Name      string `json:"fullname"`
	Phone     string `json:"phone"`
	Email     string `json:"email"`
	PositionId     string `json:"position_id"`
	DivisionId     string `json:"division_id"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	// Pake * karena nullable
	DeletedAt *time.Time `json:"deleted_at"`
}