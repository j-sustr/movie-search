FROM node:alpine
ENV NODE_ENV=production

# Create app directory
WORKDIR /app

COPY ["server/package.json", "server/package-lock.json", "./"]
RUN npm ci

COPY server/dist /app
COPY client/build /app/public
COPY server/.env.example ./
COPY server/.env.production ./.env

EXPOSE 8080

CMD [ "node", "index.js" ]