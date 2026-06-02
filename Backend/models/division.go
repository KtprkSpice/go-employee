package models

import "time"

type Division struct {
	Id          int64     `json:"id"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
	// Pake * karena nullable
	DeletedAt *time.Time `json:"deleted_at"`
}