FROM node:23

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run build

CMD ["sh", "-c", "npm run migrate && npm run seed && npm run start:prod"]
