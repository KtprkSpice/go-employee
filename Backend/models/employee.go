package models

import "time"

type Employee struct {
	ID        int64    `json:"id"`
	Name      string `json:"fullname"`
	Phone     string `json:"phone"`
	Email     string `json:"email"`
	PositionId     int16 `json:"position_id"`
	PositionName string `json:"position_name"`
	DivisionId     int64 `json:"division_id"`
	DivisionName string `json:"division_name"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	// Pake * karena nullable
	DeletedAt *time.Time `json:"deleted_at"`
}