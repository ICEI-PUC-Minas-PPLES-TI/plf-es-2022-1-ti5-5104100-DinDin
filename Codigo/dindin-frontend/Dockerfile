FROM node:16.14.0-alpine3.15

# create destination directory
RUN mkdir -p /usr/src/dindin-frontend
WORKDIR /usr/src/dindin-frontend

# update and install dependency
RUN apk update && apk upgrade
# docker-compose bash command dependency
RUN apk add bash
# nodemon file changing detector dependency
RUN apk add inotify-tools
# convert endline to linux
RUN apk add dos2unix

RUN rm -rf ./node_modules
RUN rm -rf package-lock.json

RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache

# Install app dependencies
COPY ./package.json .
RUN npm install

# copy the app, note .dockerignore, bundle app source
COPY . .
# convert from windows to linux
RUN find /usr/src/dindin-frontend -type f -print0 | xargs -0 -n 1 -P 4 dos2unix

# set app serving to permissive / assigned
ENV NUXT_HOST=0.0.0.0
# set app port
ENV NUXT_PORT=80
