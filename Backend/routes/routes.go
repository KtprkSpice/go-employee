package routes

import (
	"database/sql"
	"ems-api/handlers"
	"net/http"
)

func SetupRoutes(db *sql.DB) *http.ServeMux {
	
	mux := http.NewServeMux()

	mux.HandleFunc(
		"/employees",
		handlers.GetEmployee(db),
	)

	mux.HandleFunc(
		"/employees/create",
		handlers.CreateEmployee(db),
	)

	mux.HandleFunc(
		"/employees/update",
		handlers.UpdateEmployee(db),
	)

	mux.HandleFunc(
		"/employee", 
		handlers.GetEmployeeById(db),
	)

	mux.HandleFunc(
		"/employee/delete",
		handlers.DeleteEmployee(db),
	)

	// Division
	mux.HandleFunc(
		"/divisions",
	 handlers.GetDivision(db),
	)

	mux.HandleFunc(
		"/division/create",
		handlers.CreateDivision(db),
	)

	mux.HandleFunc(
		"/division",
		handlers.GetDivisionById(db),
	)

	mux.HandleFunc(
		"/division/update",
		handlers.UpdateDivision(db),
	)

	mux.HandleFunc(
		"/division/delete",
		handlers.DeleteDivision(db),
	)

	return mux
}