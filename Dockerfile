FROM node:18-alpine
WORKDIR /usr/qsystem/
COPY --from=backend-builder ./backend/dist ./backend/dist
COPY --from=frontend-builder ./frontend/terminal/build ./frontend/terminal/build
CMD ["node", "./backend/dist/server.js"]

EXPOSE $port
