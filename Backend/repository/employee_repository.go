package repository

import (
	"database/sql"
	"ems-api/models"
	"time"
)

// Get Employee
func GetEmployee(db *sql.DB) ([]models.Employee, error) {
	rows, err := db.Query(`
	SELECT 
		e.id,
		e.fullname,
		e.phone,
		e.email,
		e.position_id,
		p.name,
		e.division_id,
		d.name,
		e.created_at,
		e.updated_at,
		e.deleted_at
	FROM employee e 
	JOIN divisions
		d on e.division_id = d.id
	JOIN positions
		p on e.position_id = p.id
	WHERE e.deleted_at IS NULL
	`)

	// Jika ada error
	if(err != nil) {
		return  nil, err
	}

	// Tutup Pool atau connection ke db
	defer rows.Close()

	// Ambil data
	var Employee []models.Employee

	for rows.Next() {
		var emp models.Employee

		rows.Scan(
			&emp.ID,
			&emp.Name,
			&emp.Phone,
			&emp.Email,
			&emp.PositionId,
			&emp.PositionName,
			&emp.DivisionId,
			&emp.DivisionName,
			&emp.CreatedAt,
			&emp.UpdatedAt,
			&emp.DeletedAt,
		)

		Employee = append(Employee, emp)
	}

	return  Employee, nil
}

func CreateEmployee(db *sql.DB, emp models.Employee) error {
	now := time.Now()
	q := `
	INSERT INTO employee 
	(fullname,email,phone,position_id,division_id,created_at,updated_at)
	VALUES 
	(?,?,?,?,?,?,?)`

	_, err := db.Exec(
		q,
		emp.Name,
		emp.Email,
		emp.Phone,
		emp.PositionId,
		emp.DivisionId,
		now,
		now,
	)

	return  err
}

func GetEmployeeById(db *sql.DB, id int) (models.Employee, error) {
	var emp models.Employee

	err := db.QueryRow(`
	SELECT 
		id,
		fullname,
		phone,
		email,
		position_id,
		division_id
	FROM employee
	WHERE id = ?
	AND deleted_at IS NULL`,
		id,
		).Scan(
		&emp.ID,
		&emp.Name,
		&emp.Phone,
		&emp.Email,
		&emp.PositionId,
		&emp.DivisionId,
	)

	return emp, err
}

func EditEmployee(db *sql.DB, id int, emp models.Employee) error {
	now := time.Now()

	q := `
	UPDATE employee 
	SET
		fullname = ?,
		phone = ?,
		email = ?,
		position_id = ?,
		division_id = ?,
		updated_at = ?
	WHERE id = ?
	`

	_,err := db.Exec(
		q,
		emp.Name,
		emp.Phone,
		emp.Email,
		emp.PositionId,
		emp.DivisionId,
		now,
		id,
	)
	
	return  err
}

func DeleteEmployee(db *sql.DB, id int, emp models.Employee) error {
	now := time.Now()

	q := `
	UPDATE employee
	SET
		deleted_at = ?
	WHERE id = ?
	`

	_, err := db.Exec(
		q,
		now,
		id,
	)

	if err != nil {
		return  err
	}

	return  nil
}