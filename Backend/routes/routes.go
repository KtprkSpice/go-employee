package routes

import (
	"database/sql"
	"ems-api/handlers"
	"net/http"
)

func SetupRoutes(db *sql.DB) {
	http.HandleFunc(
		"/employees",
		handlers.GetEmployee(db),
	)

	http.HandleFunc(
		"/employees/create",
		handlers.CreateEmployee(db),
	)

	http.HandleFunc(
		"/employees/update",
		handlers.UpdateEmployee(db),
	)

	http.HandleFunc(
		"/employee", 
		handlers.GetEmployeeById(db),
	)

	http.HandleFunc(
		"/employee/delete",
		handlers.DeleteEmployee(db),
	)
}