FROM node:14.18.0-alpine as build
WORKDIR './app'
COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm install -g @angular/cli@12.2.18
COPY . .
RUN ng --version
RUN ng build --prod
FROM nginx:latest
COPY --from=build app/dist/chat-forum-tool-ui /usr/share/nginx/html
EXPOSE 80