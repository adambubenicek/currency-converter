FROM node:16

WORKDIR /currency-converter

COPY . .

RUN npm install

RUN npm run build

CMD ["npm", "start"]