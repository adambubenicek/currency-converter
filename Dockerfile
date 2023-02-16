FROM node:16

WORKDIR /currency-converter

COPY . .

RUN npm install

CMD ["npm", "start"]