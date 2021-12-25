# syntax=docker/dockerfile:1
# pull official base image
FROM python:3.9.9-bullseye

# set work directory
ADD . /station-api
WORKDIR /station-api

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install dependencies
RUN pip3 install --upgrade pip
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

# copy project
COPY . .