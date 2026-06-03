package handlers

import (
	"database/sql"
	"ems-api/models"
	"ems-api/repository"
	"encoding/json"
	"net/http"
	"strconv"
)

func GetPosition(db *sql.DB) http.HandlerFunc {
	return  func(w http.ResponseWriter, r *http.Request) {

		Position, err := repository.GetPosition(db)

		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return 
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(Position)
	}
}

func CreatePosition(db *sql.DB) http.HandlerFunc {
	return  func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			http.Error(w, "Invalid Method", http.StatusMethodNotAllowed)
			return 
		}

		var pst models.Position

		err := json.NewDecoder(r.Body).Decode(&pst)

		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return 
		}

		err = repository.CreatePosition(db, pst)

		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return 
		}

		w.Header().Set("Content-Type", "application/json")
		
		json.NewEncoder(w).Encode(map[string]string {
			"message" : "Position Created Successfuly",
		})
	}
}

func GetPositionById(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		idStr := r.URL.Query().Get("id")

		id,err := strconv.Atoi(idStr)

		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]string {
				"error" : "Invalid Id",
			})
			return 
		}

		pst, err := repository.GetPositionById(db,id)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(pst)
	}
}

func UpdatePosition (db *sql.DB) http.HandlerFunc {
	return  func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPut {
			http.Error(w, "Invalid Method", http.StatusMethodNotAllowed)
			return 
		}

		idStr := r.URL.Query().Get("id")

		id, err := strconv.Atoi(idStr)

		if err != nil {
			http.Error(w, "invalid id", http.StatusBadRequest)
			return 
		}

		var pst models.Position

		err = json.NewDecoder(r.Body).Decode(&pst)

		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return 
		}

		err = repository.UpdatePosition(db, id, pst)

		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return 
		}

		json.NewEncoder(w).Encode(map[string]string {
			"message" :"Updated Successfuly",
		})
	}
}