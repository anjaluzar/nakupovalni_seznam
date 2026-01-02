FROM node:16-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --silent || npm install --silent
COPY . .
EXPOSE 3001
CMD ["node", "server.js"]
