FROM node:20-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --ignore-scripts --silent
COPY . .
EXPOSE 3001
CMD ["node", "server.js"]
