import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { mergeSchemas } from 'graphql-tools';

import { productResolvers, productSchema } from './src/query/Product';
import { categoryResolvers, categorySchema } from './src/query/Category';
import { brandResolvers, brandSchema } from './src/query/Brand';
import { breadcrumbResolvers, breadcrumbSchema } from './src/query/Breadcrumb';

const schema = mergeSchemas({
  schemas: [productSchema, categorySchema, brandSchema, breadcrumbSchema],
  resolvers: [productResolvers, categoryResolvers, brandResolvers, breadcrumbResolvers],
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

app.listen(9000, () => console.log('Now browse to http://localhost:9000'));
