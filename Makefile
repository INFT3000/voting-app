develop:
	cd frontend && pnpm i && pnpm dev

start-backend:
	cd backend && go run main.go

lint:
	cd frontend && pnpm lint

test:
	echo test
