package main

import (
	"database/sql"

	_ "github.com/go-sql-driver/mysql"
)

func Connect() (*sql.DB, error) {
	db, err := sql.Open(
		"mysql",
		"root:@tcp(localhost:3306)/employee",
	)

	if(err != nil) {
		return  nil, err
	}

	err = db.Ping()
	if(err != nil) {
		return nil, err
	}

	return  db, nil
}