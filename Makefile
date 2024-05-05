build:
	sudo docker compose up --build -d

up:
	sudo docker compose up -d

clean:
	sudo docker compose down

cleandata:
	sudo docker compose down -v

fclean: cleandata 
	sudo docker system prune -af

re: clean up

red: cleandata up

refd:  cleandata fclean build

logs:
	sudo docker compose logs
