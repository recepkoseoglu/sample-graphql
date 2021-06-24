
FROM node:10

WORKDIR /Graphql

COPY package*.json ./

RUN npm install
RUN npm build

COPY . .

EXPOSE 9000
CMD [ "npm", "start" ]