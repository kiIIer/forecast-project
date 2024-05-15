package main

// MyService is a service that needs a Repository.
type MyService struct {
	repository *Repository
}

func NewMyService(r *Repository) *MyService {
	return &MyService{repository: r}
}

func (s *MyService) ServeData() string {
	return s.repository.GetData()
}
