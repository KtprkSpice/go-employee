package config

import (
	"database/sql"

	_ "github.com/go-sql-driver/mysql"
)

func ConnectDB() (*sql.DB, error) {
	return  sql.Open(
		"mysql",
		// Harus parseTime agar time di model terbaca
		"root:@tcp(localhost:3306)/ems?parseTime=true",
	)
}
