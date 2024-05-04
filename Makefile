DOCKER_COMPOSE_DIR = ./srcs/docker-compose.yml

all: up

up:
	docker compose -f $(DOCKER_COMPOSE_DIR) up --build

down:
	docker compose -f $(DOCKER_COMPOSE_DIR) down

start:
	docker compose -f $(DOCKER_COMPOSE_DIR) start

stop:
	docker compose -f $(DOCKER_COMPOSE_DIR) stop

clean:
	@if docker images | grep -q none; then \
		docker rmi $$(docker images -f "dangling=true" -q) && echo "Removing the dangling images ..."; \
	fi

fclean: clean down rmvolumes
	docker system prune --volumes -af

rmvolumes:
	@if docker ps -q;then \
		echo "Removing the following volumes:" && docker volume rm $$(docker volume ls -q); \
	fi

re: fclean all

.PHONY: all up down start stop clean fclean rmvolumes re
