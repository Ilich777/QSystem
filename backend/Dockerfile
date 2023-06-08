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
COPY ./package*.json ./
COPY .tsconfig*.json ./
RUN npm install
COPY . .
RUN npm run build
LABEL artifacts='{"paths": ["./dist/"]}'
CMD ["node", "./dist/server.js"]
EXPOSE 3000
