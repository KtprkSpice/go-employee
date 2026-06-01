package handlers

import (
	"database/sql"
	"ems-api/models"
	"ems-api/repository"
	"encoding/json"
	"net/http"
	"strconv"
)

// Get
func GetEmployee(db *sql.DB) http.HandlerFunc {
	return  func(w http.ResponseWriter, r *http.Request) {
		Employee, err := repository.GetEmployee(db)

		if err != nil {
			http.Error(w, err.Error(), 500)
		}

		w.Header().Set("Content-type", "application/json")

		json.NewEncoder(w).Encode(Employee)
	}
}

// Create
func CreateEmployee(db *sql.DB) http.HandlerFunc {
	return  func(w http.ResponseWriter, r *http.Request) {

		// Jika method bukan post error not allowed
		if r.Method != http.MethodPost {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return 
		}

		var emp models.Employee

		err := json.NewDecoder(r.Body).Decode(&emp)

		if err != nil {
			http.Error(w,err.Error(), http.StatusBadRequest)
			return 
		}

		err = repository.CreateEmployee(db,emp)

		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return 
		}

		w.Header().Set("Content-Type", "application/json")

		// Message Untuk Alert
		json.NewEncoder(w).Encode(map[string]string {
			"message" : "Employee Created Successfuly",
		})
	}
}

func GetEmployeeById(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		idStr := r.URL.Query().Get("id")

		id, err := strconv.Atoi(idStr)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
json.NewEncoder(w).Encode(map[string]string{
    "error": "Invalid Id",
})
			return 
		}

		emp, err := repository.GetEmployeeById(db, id)
		if err != nil {
			http.Error(w, err.Error(), 500)
			return 
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(emp)
	}
}

func UpdateEmployee(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		
		if r.Method != http.MethodPut {
			http.Error(w, "Method note allowed", http.StatusMethodNotAllowed)
			return 
		}

		idStr := r.URL.Query().Get("id")

		id,err := strconv.Atoi(idStr)

		if err != nil {
			http.Error(w, "Invalid Id", http.StatusBadRequest)
			return 
		}

		var emp models.Employee

		err = json.NewDecoder(r.Body).Decode(&emp)

		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return 
		}

		err = repository.EditEmployee(
			db,
			id,
			emp,
		)

		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return 
		}

		json.NewEncoder(w).Encode(map[string]string {
			"message" : "Employee updated Successfuly",
		})
	}
}