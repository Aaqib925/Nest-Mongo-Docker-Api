# Nest-Docker-Mongo API Example 🔥.

## Installation

```bash
$ npm install
```

## Set environment

```
$ cp .env.example .env
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Docker

There is a `docker-compose.yml` file for starting MongoDB with Docker.

`$ docker-compose up`

After running, you can stop the Docker container with

`$ docker-compose down`

## Url Swagger for Api Documentation
```
http://127.0.0.1:3000/api/doc
```

## Getting with Curl Users

```bash
    $ curl -H 'content-type: application/json' -v -X GET http://127.0.0.1:3000/api/users  
    $ curl -H 'content-type: application/json' -v -X GET http://127.0.0.1:3000/api/users/:id 
    $ curl -H 'content-type: application/json' -v -X DELETE http://127.0.0.1:3000/api/users/:id 
```


## Getting Pagination using limit and offset

```bash 
    $ curl -H 'content-type: application/json' -v -X GET http://127.0.0.1:3000/api/users?limit=10
```

```bash 
    $ curl -H 'content-type: application/json' -v -X GET http://127.0.0.1:3000/api/users?offset=10
```
```bash 
    $ curl -H 'content-type: application/json' -v -X GET http://127.0.0.1:3000/api/users?limit=10&offset=0
```