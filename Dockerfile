FROM node:14.18.0-alpine
WORKDIR './app'
COPY package.json ./
RUN npm install
COPY . .
RUN npm run start
