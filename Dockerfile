FROM node:18-alpine

ARG port
ARG creds
ARG postgres
ARG session
ARG api

ENV PORT=$port
ENV OAuth2Creds=$creds
ENV POSTGRES=$postgres
ENV SESSION=$session
ENV API=$api
ENV NODE_ENV=production

WORKDIR /usr/qsystem/backend

COPY ./backend/package*.json ./
COPY ./backend/tsconfig.json ./
RUN npm install

COPY ./backend .
RUN npm run build

WORKDIR /usr/qsystem/frontend/terminal

COPY ./frontend/terminal/package*.json .
COPY ./frontend/terminal/tsconfig.json .
RUN npm install

COPY ./frontend/terminal .
RUN npm run build

WORKDIR /usr/qsystem/backend/dist
RUN npm run start

EXPOSE $port
