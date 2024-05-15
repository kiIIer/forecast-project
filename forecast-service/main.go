package main

import "fmt"

func main() {
	service := InitializeService()
	fmt.Println(service.ServeData())
}
