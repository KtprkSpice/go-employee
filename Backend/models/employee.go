package models

import "time"

type Employee struct {
	ID        int    `json:"id"`
	Name      string `json:"fullname"`
	Phone     string `json:"phone"`
	Email     string `json:"email"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	// Pake * karena nullable
	DeletedAt *time.Time `json:"deleted_at"`
}