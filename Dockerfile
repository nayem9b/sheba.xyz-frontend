FROM node:18-alpine

WORKDIR /myapp

COPY . . 

RUN npm install

RUN npm i yarn

EXPOSE 5000

CMD ["yarn", "run", "dev"]
