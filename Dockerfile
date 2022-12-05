FROM node:17.9.1-slim

WORKDIR /usr/src/app

COPY package*.json ./


RUN npm install


COPY . .


EXPOSE 10000


CMD ["node", "index.js"]