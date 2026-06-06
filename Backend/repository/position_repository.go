package repository

import (
	"database/sql"
	"ems-api/models"
	"time"
)

func GetPosition(db *sql.DB) ([]models.Position, error) {
	q, err := db.Query(`
    SELECT
        p.id,
        p.name,
        p.description,
        p.division_id,
        d.name,
        p.created_at,
        p.updated_at,
        p.deleted_at
    FROM positions p
    JOIN divisions d ON p.division_id = d.id
    WHERE p.deleted_at IS NULL
`)

	if err != nil {
		return  nil, err
	}

	defer q.Close()

	var Position []models.Position

	for q.Next() {
		var pst models.Position

		err := q.Scan(
			&pst.ID,
			&pst.Name,
			&pst.Description,
			&pst.DivisionId,
			&pst.DivisionName,
			&pst.CreatedAt,
			&pst.UpdatedAt,
			&pst.DeletedAt,
		)

		if err != nil {
			return  nil,err
		}

		Position = append(Position, pst)
	}

	return  Position, nil

}

func CreatePosition(db *sql.DB, pst models.Position) error {
	q := `
	INSERT INTO positions (
	name,
	description,
	division_id,
	created_at,
	updated_at
	) VALUES (
	?, 
	?,
	?,
	?,
	?
	)
	` 

	now := time.Now()
	_,err := db.Exec(
		q,
		pst.Name,
		pst.Description,
		pst.DivisionId,
		now,
		now,
	)

	return  err
} 

func GetPositionById(db *sql.DB, id int) (models.Position, error) {
	var pst models.Position

	err := db.QueryRow(`
	SELECT 
		name,description,division_id 
	FROM positions WHERE id = ?
	`, id).Scan(
		&pst.Name,
		&pst.Description,
		&pst.DivisionId,
	)

	return  pst,err
}

func UpdatePosition(db *sql.DB, id int, pst models.Position) error {
	q:= `
	UPDATE positions
	SET
		name = ?,
		description = ?,
		division_id = ?,
		updated_at = ?
	WHERE id = ?
	`

	now := time.Now()
	_,err := db.Exec(
		q,
		pst.Name,
		pst.Description,
		pst.DivisionId,
		now,
		id,
	)

	return  err
}

func DeletePosition(db *sql.DB, id int, pst models.Position) error {
	q := `
	UPDATE positions
	SET 
		deleted_at = ?
	WHERE id = ?
	`

	now := time.Now()

	_,err := db.Exec(
		q,
		now,
		id,
	)

	return  err
}