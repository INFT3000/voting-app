install:
	go install github.com/cespare/reflex@latest

develop:
	reflex -r '\.go$$' -s -- sh -c 'go run main.go' # watch for changes in .go files and run main.go

pull-secrets:
	pnpx senv decrypt .secret.env.enc -o .secret.env

push-secrets:
	pnpx senv encrypt .secret.env -o .secret.env.enc
