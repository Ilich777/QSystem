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

WORKDIR /usr/qsystem
COPY ./backend/package*.json ./
COPY ./backend/tsconfig*.json ./
RUN npm install
COPY . .
RUN npm run build
LABEL artifacts='{"paths": ["./backend/dist/"]}'
CMD ["node", "./backend/dist/server.js"]
EXPOSE 3000
