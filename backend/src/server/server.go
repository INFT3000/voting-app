package server

import (
	"fmt"
	"net/http"
)

func Start() {
	fmt.Println("Starting server at port 8080")
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello world")
	})
	http.ListenAndServe(":8080", nil)
}
