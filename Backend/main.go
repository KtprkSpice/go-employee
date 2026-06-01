package main

import (
	"ems-api/config"
	"ems-api/middleware"
	"ems-api/routes"
	"fmt"
	"net/http"
)

func main() {
	db, err := config.ConnectDB()

	if (err != nil) {
		panic(err)
	}

	defer db.Close()

	routes.SetupRoutes(db)

	fmt.Println("Server running on port 8080")

	handler := middleware.EnableCors(http.DefaultServeMux)

	http.ListenAndServe(":8080", handler)
}