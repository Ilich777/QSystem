FROM node:18-alpine

ARG BACKEND_PATH
ARG FRONTEND_PATH

WORKDIR /usr/qsystem/
COPY $BACKEND_PATH ./backend/dist
COPY $FRONTEND_PATH ./frontend/terminal/build
CMD ["node", "./backend/dist/server.js"]

EXPOSE $port
