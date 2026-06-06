package routes

import (
	"database/sql"
	"ems-api/handlers"
	"net/http"
)

func SetupRoutes(db *sql.DB) *http.ServeMux {
	
	mux := http.NewServeMux()

	// Employees
	mux.HandleFunc(
		"/employees",
		handlers.GetEmployee(db),
	)

	// Employee create
	mux.HandleFunc(
		"/employees/create",
		handlers.CreateEmployee(db),
	)

	// Employee update
	mux.HandleFunc(
		"/employees/update",
		handlers.UpdateEmployee(db),
	)

	// Get employee by id
	mux.HandleFunc(
		"/employee", 
		handlers.GetEmployeeById(db),
	)

	// Employee Delete
	mux.HandleFunc(
		"/employee/delete",
		handlers.DeleteEmployee(db),
	)

	// Division
	mux.HandleFunc(
		"/divisions",
	 handlers.GetDivision(db),
	)

	// Division Create
	mux.HandleFunc(
		"/division/create",
		handlers.CreateDivision(db),
	)

	// Division by ID
	mux.HandleFunc(
		"/division",
		handlers.GetDivisionById(db),
	)

	// Division Update
	mux.HandleFunc(
		"/division/update",
		handlers.UpdateDivision(db),
	)

	// Division Delte
	mux.HandleFunc(
		"/division/delete",
		handlers.DeleteDivision(db),
	)

	// Position
	mux.HandleFunc(
		"/positions",
		handlers.GetPosition(db),
	)

	// Position Create
	mux.HandleFunc(
		"/position/create",
		handlers.CreatePosition(db),
	)

	// Position get by id
	mux.HandleFunc(
		"/position",
		handlers.GetPositionById(db),
	)

	// Update
	mux.HandleFunc(
		"/position/update",
		handlers.UpdatePosition(db),
	)

	// delete
	mux.HandleFunc(
		"/position/delete",
		handlers.DeletedPosition(db),
	)

	return mux
}