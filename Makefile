#!/bin/bash

UID = $(shell id -u)
DOCKER_BE = boilerplate

start: ## inicia la creacion del contenedor
	docker network create ca_net || true
	U_ID=${UID} docker compose up -d
stop: ## Stop the containers
	U_ID=${UID} docker compose stop
down: ## Stop the containers
	U_ID=${UID} docker compose down
restart: ## Restart the containers
	U_ID=${UID} docker compose restart
clear:
	U_ID=${UID} docker compose stop
	U_ID=${UID} docker compose down
	U_ID=${UID} docker volume prune
