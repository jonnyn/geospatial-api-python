# Backend Geospatial API

Rest API with Flask, Marshmallow and PostSQL

## Home to run

1. install packages:
   1. from root directory, `python3 -m venv env`
   2. `source env/bin/activate`
   3. `pip3 install -r requirements.txt`
2. run `./bootstrap.sh`, it will execute these commands:
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
