FROM node:14

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3000

CMD ["npm", "start", "node", "--inspect=0.0.0.0:9229", "server.ts"]