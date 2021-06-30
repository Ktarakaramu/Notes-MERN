FROM node:alpine

WORKDIR /app

COPY package.json ./

COPY package-lock.json ./

RUN npm install -g npm@7.12.0

RUN npm install --save react react-dom react-scripts

COPY . ./

RUN apk add --no-cache bash

CMD [ "npm", "start" ]
