package main

// Repository simulates a data store.
type Repository struct{}

func NewRepository() *Repository {
	return &Repository{}
}

func (r *Repository) GetData() string {
	return "data from repository"
}
