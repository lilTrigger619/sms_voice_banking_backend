FROM node:15.14.0-alpine

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY dist ./dist
COPY package.json .env ./

RUN npm install 

CMD ["npm", "run", "start"]

