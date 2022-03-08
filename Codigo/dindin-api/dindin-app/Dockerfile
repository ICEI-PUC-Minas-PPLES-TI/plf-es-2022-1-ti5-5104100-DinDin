FROM node:16.14.0-alpine3.15

# create destination directory
RUN mkdir -p /usr/src/dindin-api
WORKDIR /usr/src/dindin-api

# Update and install dependency
RUN apk update && apk upgrade
RUN apk add git
# docker-compose bash command dependency
RUN apk add bash
# Nodemon file changing detector dependency
RUN apk add inotify-tools

# Install app dependencies
COPY ./package.json .
RUN npm install -g nodemon
RUN npm install

# Bundle app source
COPY . .

# to wait database image
COPY wait-for-it.sh /usr/wait-for-it.sh
RUN chmod +x /usr/wait-for-it.sh
