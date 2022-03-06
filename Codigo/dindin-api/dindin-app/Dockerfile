FROM node:16.14.0-alpine3.15

# create destination directory
RUN mkdir -p /usr/src/dindin-api
WORKDIR /usr/src/dindin-api

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git
RUN apk add bash

# Install app dependencies
COPY ./package.json /usr/src/dindin-api
RUN npm install

# Bundle app source
COPY . /usr/src/dindin-api

# to wait database image
COPY wait-for-it.sh /usr/wait-for-it.sh
RUN chmod +x /usr/wait-for-it.sh
