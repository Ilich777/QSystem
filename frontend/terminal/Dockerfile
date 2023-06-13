FROM node:18-alpine as frontend-builder
WORKDIR /usr/qsystem/frontend/terminal

COPY ./package*.json .
COPY ./tsconfig.json .
RUN npm install

COPY . .
RUN npm run build
LABEL artifacts='{"paths": ["./build/"]}'

