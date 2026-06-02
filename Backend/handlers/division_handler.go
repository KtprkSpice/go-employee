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

func GetDivision(db *sql.DB) http.HandlerFunc {
	return  func(w http.ResponseWriter, r *http.Request) {
		Division, err := repository.GetDivision(db)

		if err != nil {
			http.Error(w, err.Error(), 500)
			return 
		}

		w.Header().Set("Content-type", "application/json")
		json.NewEncoder(w).Encode(Division)
	}
}


func CreateDivision(db *sql.DB,) http.HandlerFunc {
	return  func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return 
		}

		// Panggil model
		var dvs models.Division

		// isi model dari request 
		err := json.NewDecoder(r.Body).Decode(&dvs)

		// Check apakah request ada error
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return 
		}

		err = repository.CreateDivision(db,dvs)

		// Check apakah ada error disaat create seperti database mati 
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return 
		}

		w.Header().Set("Content-Type", "application/json")

		json.NewEncoder(w).Encode(map[string]string {
			"message" : "Division Created Successfuly",
		})
	}
}

func GetDivisionById(db *sql.DB) http.HandlerFunc {
	return  func(w http.ResponseWriter, r *http.Request) {
		// ambil id berbentuk string dari url contoh www.x.com/edit/1 maka id diambil 1 tapi masih berbentuk string
		idStr := r.URL.Query().Get("id")

		// ubah string id menjadi int
		id,err := strconv.Atoi(idStr)
		
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]string {
				"error" : "invalid Id",
			})

			return 
		}

		dvs, err := repository.GetDivisionById(db, id)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return 
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(dvs)
	}
}

func UpdateDivision(db *sql.DB) http.HandlerFunc {
	return  func(w http.ResponseWriter, r *http.Request) {

		// Check metghod apa method put jika tidak ada error
		if r.Method != http.MethodPut {
			http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
			return 
		}

		// Ambil id dari url
		idStr := r.URL.Query().Get("id")

		// Conversi id string jadi int
		id,err := strconv.Atoi(idStr)

		// Check id apa ada
		if err != nil {
			http.Error(w, "invalid id", http.StatusBadRequest)
			return 
		}

		// Value dari model atau panggil struck
		var dvs models.Division

// err = check request apa sesuai propertinya denfgan yang ada di model / struck
		err = json.NewDecoder(r.Body).Decode(&dvs)

		// Pengecekan jika ada err
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return 
		}

		// check jika property, id, dan data di struck benar benar sesuai, ada ,atau semacamna
		err = repository.EditDivision(db,id,dvs)

		// Jika ada error maka error 500 atau status internal server error
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return 
		}

		json.NewEncoder(w).Encode(map[string]string {
			"message" : "Data berhasil dibuat",
		})
	}
}

func DeleteDivision(db *sql.DB) http.HandlerFunc {
	return  func(w http.ResponseWriter, r *http.Request) {

		if r.Method != http.MethodPut {
			http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
			return 
		}

		idStr := r.URL.Query().Get("id")

		id,err := strconv.Atoi(idStr)

		if err != nil {
			http.Error(w, "Invalid id", http.StatusBadRequest)
			return 
		}

		var dvs models.Division

		err = json.NewDecoder(r.Body).Decode(&dvs)

		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return 
		}

		err = repository.DeleteDivision(
			db,
			id,
			dvs,
		)

		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return 
		}
		
		json.NewEncoder(w).Encode(map[string]string {
			"message" : "Berhasil Hapus data",
		})



	}
}