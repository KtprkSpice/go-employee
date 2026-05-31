package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func main() {

	db,err := Connect()

	if(err != nil) {
		panic(err)
	}

	defer db.Close()

	fmt.Println("database Connected")

	mux := http.NewServeMux()


	type Employee struct {
	ID      int    `json:"id"`
	Name    string `json:"name"`
	Email   string `json:"email"`
	Phone   string `json:"phone"`
	Address string `json:"address"`
	// Fetch employee
}
mux.HandleFunc("/employee", func(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	switch r.Method {

	case "GET":

		rows, err := db.Query("SELECT id, name, email, phone, address FROM employee")
		if err != nil {
			http.Error(w, err.Error(), 500)
			return
		}
		defer rows.Close()

		var employees []Employee

		for rows.Next() {
			var emp Employee

			err := rows.Scan(
				&emp.ID,
				&emp.Name,
				&emp.Email,
				&emp.Phone,
				&emp.Address,
			)

			if err != nil {
				http.Error(w, err.Error(), 500)
				return
			}

			employees = append(employees, emp)
		}

		json.NewEncoder(w).Encode(employees)

	case "POST":

		var employee Employee

		err := json.NewDecoder(r.Body).Decode(&employee)
		if err != nil {
			http.Error(w, err.Error(), 400)
			return
		}

		result, err := db.Exec(
			`INSERT INTO employee(name,email,phone,address)
			 VALUES(?,?,?,?)`,
			employee.Name,
			employee.Email,
			employee.Phone,
			employee.Address,
		)

		if err != nil {
			http.Error(w, err.Error(), 500)
			return
		}

		id, _ := result.LastInsertId()
		employee.ID = int(id)

		json.NewEncoder(w).Encode(employee)

	default:
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
	}
})




	fmt.Println("Server Running On Port 8080")

	http.ListenAndServe(":8080", mux)
}