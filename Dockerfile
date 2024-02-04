# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM node:21-alpine
WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000/tcp
ENTRYPOINT [ "npm", "run", "start:dev" ]
