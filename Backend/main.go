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


	// Fetch Employee

	type Employee struct {
	ID      int    `json:"id"`
	Name    string `json:"name"`
	Email   string `json:"email"`
	Phone   string `json:"phone"`
	Address string `json:"address"`
}
	mux.HandleFunc("/employee", func(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

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
})

	fmt.Println("Server Running On Port 8080")

	http.ListenAndServe(":8080", mux)
}