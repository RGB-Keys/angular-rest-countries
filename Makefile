clear-local: 
	- $(shell docker-compose down -v --remove-orphans)

remove-local: 
	- $(shell  docker-compose down)

reset-local: 
	- $(shell docker-compose down && docker-compose up angular-dev && mvn spring-boot:run)

start: 
	- docker-compose up angular-dev

start-prod:
	- docker-compose up angular-prod

stop: 
	- $(shell docker-compose stop)