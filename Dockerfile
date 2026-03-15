FROM node:24.13.0

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm i -g @expo/ngrok@^4.1.0

COPY . .

EXPOSE 8081
EXPOSE 19000
EXPOSE 19001
EXPOSE 19002

CMD ["npx", "expo", "start"]
