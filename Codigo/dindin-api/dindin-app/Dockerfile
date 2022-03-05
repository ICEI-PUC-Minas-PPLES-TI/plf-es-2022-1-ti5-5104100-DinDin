FROM node:16

WORKDIR /dindin-app
COPY package.json .
RUN npm install
COPY . .

COPY wait-for-it.sh /usr/wait-for-it.sh
RUN chmod +x /usr/wait-for-it.sh
