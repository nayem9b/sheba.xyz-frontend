# Sheba.xyz Makefile
# Commands for local development and deployment

.PHONY: help dev build start docker-up docker-down docker-dev docker-build

# Show help message
help:
	@echo "Sheba.xyz Makefile"
	@echo ""
	@echo "Usage:"
	@echo "  make help         Show this help message"
	@echo "  make dev          Start development server on port 5000"
	@echo "  make build        Build the production application"
	@echo "  make start        Start the production server on port 5000"
	@echo "  make docker-up    Build and start production Docker containers"
	@echo "  make docker-down  Stop Docker containers"
	@echo "  make docker-dev   Start development Docker containers"
	@echo "  make docker-build Build Docker image"

# Start development server
dev:
	yarn install
	yarn dev

# Build the application
build:
	yarn build

# Start production server
start:
	yarn start

# Build and start production Docker containers
docker-up:
	docker-compose up --build

# Stop Docker containers
docker-down:
	docker-compose down

# Start Docker in development mode with hot-reloading
docker-dev:
	docker-compose -f docker-compose.dev.yml up --build

# Build Docker image only
docker-build:
	docker build -t sheba-client .