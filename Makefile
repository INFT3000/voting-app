develop:
	cd frontend && make develop

start-backend:
	cd backend && go run main.go

lint:
	cd frontend && make lint
