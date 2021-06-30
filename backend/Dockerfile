FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@7.12.0

RUN npm install express --save

COPY . ./

RUN apk add --no-cache bash


CMD [ "node", "server.js" ]
