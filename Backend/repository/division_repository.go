package repository

import (
	"database/sql"
	"ems-api/models"
	"time"
)

func GetDivision(db *sql.DB) ([]models.Division, error) {
	q,err := db.Query("SELECT * FROM divisions WHERE deleted_at IS NULL")

	// Jika error gak ada lewati lanjut ke defer q.close()
	if err != nil {
		return  nil, err
	}

	defer q.Close()

	// Siapin array kosong
	var Division []models.Division

	// Anggap 1 data sudah diabmbil lalu ditampung oleh dvs lalu di ambil valuenya di scan setelah itu ditaro value data tersebut ke division
	// Looping dimulai
	for q.Next() {
		// Data yang ditampung
		var dvs models.Division
		
		// Ngambil data dari dvs atau data yang sudah ditampung
		q.Scan(
			&dvs.Id,
			&dvs.Name,
			&dvs.Description,
			&dvs.CreatedAt,
			&dvs.UpdatedAt,
			&dvs.DeletedAt,
		)

		// Masukan data ke variable Division
		Division = append(Division, dvs)
	}

	// return Division dan err jika ada
	return  Division, nil
}

func CreateDivision(db *sql.DB, dvs models.Division) error {
	now := time.Now()

	q := `
	INSERT INTO divisions (
	name,
	description,
	created_at,
	updated_at
	)
	VALUES (
	?,
	?,
	?,
	?
	)
	`

	_,err := db.Exec(
		q,
		dvs.Name,
		dvs.Description,
		now,
		now,
	)

	return  err
}

func GetDivisionById(db *sql.DB, id int) (models.Division, error) {

	var dvs models.Division

	err := db.QueryRow(
		"SELECT id, name, description FROM divisions WHERE id = ?",
		id,
	).Scan(
		&dvs.Id,
		&dvs.Name,
		&dvs.Description,
	)

	return  dvs, err

}

func EditDivision(db *sql.DB, id int, dvs models.Division) error {
	q:= `
	UPDATE divisions 
	SET
		name = ?,
		description = ?,
		updated_at = ?
	WHERE id = ?
	`

	now := time.Now()
	_, err := db.Exec(
		q,
		dvs.Name,
		dvs.Description,
		now,
		id,
	) 

	return  err
}

func DeleteDivision(db *sql.DB, id int, dvs models.Division) error {
	q := `
	UPDATE divisions
	SET
		deleted_at = ?
	WHERE id  = ?
	AND deleted_at IS NULL
	`

	now := time.Now()
	_,err := db.Exec(
		q,
		now,
		id,
	)

	return  err
}