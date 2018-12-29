import { makeExecutableSchema } from 'graphql-tools';
import Product from '../api/Product';

const productSchema = makeExecutableSchema({
  typeDefs: `
    type Product {
      Name: String,
      Price: String,
      Category: String,
      CompanyName: String,
      CompanyURL: String,
      Source: String,
      Link: String,
      id: Int,
      Image: String,
    }

    type Query {
      products(
        _limit: Int,
        _page: Int,
        _sort: Int
      ): [Product],
      productById(id: Int): Product
    }

    type Mutation {
      product(
        Name: String,
        Price: String,
        Category: String,
        CompanyName: String,
        CompanyURL: String,
        Source: String,
        Link: String,
        Image: String
        ): Product
    }
  `,
});

// query
const products = (_, arg) => {
  return Product.GET_PRODUCTS.call(null, arg);
};

const productById = (_, arg) => {
  return Product.GET_PRODUCT.call(arg);
};

// mutation
const product = (_, arg) => {
  return Product.POST_PRODUCT.call(null, null, arg);
};

const productResolvers = {
  Query: {
    products,
    productById,
  },
  Mutation: {
    product,
  },
};

export { productSchema, productResolvers };
