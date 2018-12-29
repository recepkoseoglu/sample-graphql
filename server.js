import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { mergeSchemas } from 'graphql-tools';

import { productResolvers, productSchema } from './src/query/Products';

const schema = mergeSchemas({
  schemas: [productSchema],
  resolvers: [productResolvers],
});

const app = express();

const server = new ApolloServer({
  schema: schema,
  formatError: error => {
    console.log(error);
    return new Error('Internal server error');
  },
});

server.applyMiddleware({ path: '/', app });

app.listen(9000, () => console.log('Now browse to localhost:9000'));
