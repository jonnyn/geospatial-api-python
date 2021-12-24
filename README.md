# geospatial-api-python

EV Charging Station application.

## Backend API

Geospatial Rest API. Using Flask, Marshmallow and PostgreSQL.

### To run backend

- `cd backend`
- run `./bootstrap.sh`, it will execute these commands:
  - `python3 -m venv env`
  - `source env/bin/activate`
  - `python3 app.py`

### Setup local postgres db

1. install postgres locally
2. create `postgres` user, password `password`
3. create database `stations`
4. From Terminal, run `python3`
5. Then `from app import Station,db`
6. And `db.create_all()`
7. `quit()`

## Frontend App

Using create-react-app, TypeScript, React-Query, and Chakra UI. Also using Context in place of global state management.

### To run FE

- `cd frontend`
- `yarn` to install dependencies
- `yarn start` or `yarn start:win` to start app on port 8081
- `yarn test` to run tests
