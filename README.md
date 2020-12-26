# Wishlist API
Wishlist management tool

## Getting started
1. Clone this repo
git clone https://github.com/vuna91/wishlist.git

2. Setup and run
2.1 Install Postgres
  ```
  docker pull postgres
  docker run -d -p 5432:5432 --name my-postgres -e POSTGRES_PASSWORD=123 postgres
  ```
  Create database name `wishlist` in your postgres database
  ```
  docker exec -it my-postgres bash
  psql -U postgres
  CREATE DATABASE wishlist;
  ```

  Update your POSTGRES_PASSWORD into `.env`
2.2 Install dependencies
  ```
  npm i -g typescript
  npm i  
  npm run migrate:up
  ```
2.3 Run unit test
  ```
  npm run test
  npm run test:cov
  ```
2.4 Start project
  ```
  npm start
  ```

## Testing flow
  ```
  Create user -> Get access token -> Use this token to send request for testing wishlist management
  ```
You can use the postman collection here for testing this app https://github.com/vuna91/wishlist/blob/main/Wishlist-APIpostman_collection.json

## Example
4.1 Create User
  ```
  curl --location --request POST 'http://localhost:3000/users' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "username": "milorinarmanturmin",
      "password": "password"
  }'
  ```
4.2 Get Token
  ```
  curl --location --request POST 'http://localhost:3000/token' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "username": "milorinarmanturmin",
      "password": "password"
  }'
  ```
4.2 Create wishlist  
  ```
  curl --location --request POST 'http://localhost:3000/wishes' \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYwODk1Njk2MSwiZXhwIjoxNjA4OTYwNTYxfQ.puzrNgb5n1JQc-sOj5gXG2I-IA0RW5y6PZl5KEwz_y4' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "title": "testing title of wishlist"
  }'
  ```