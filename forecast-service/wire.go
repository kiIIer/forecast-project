//go:build wireinject
// +build wireinject

package main

import (
	"github.com/google/wire"
)

func InitializeService() *MyService {
	wire.Build(NewMyService, NewRepository)
	return &MyService{}
}
