build:
	docker-compose up --build -d

chrome:
	google-chrome --incognito http://localhost:4200

firefox:
	firefox --private-window http://localhost:4200

web: firefox chrome

up:
	docker-compose up -d

clean:
	docker-compose down

cleandata:
	docker-compose down -v

fclean: cleandata 
	docker system prune -af

re: clean up

red: cleandata up

refd:  cleandata fclean build

logs:
	docker-compose logs
