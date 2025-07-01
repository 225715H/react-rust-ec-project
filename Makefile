local_start:
	docker compose up -d

local_stop:
	docker compose down

local_build:
	docker compose up -d --build

prod_start:
	docker compose -f docker-compose-prod.yml up -d

prod_stop:
	docker compose -f docker-compose-prod.yml down