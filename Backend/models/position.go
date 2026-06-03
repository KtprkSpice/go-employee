package models

import "time"

type Position struct {
	ID           int64  `json:"id"`
	Name         string `json:"name"`
	Description  string `json:"description"`
	DivisionId   int64  `json:"division_id"`
	DivisionName string `json:"division_name"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
	// Pake * karena nullable
	DeletedAt *time.Time `json:"deleted_at"`
}