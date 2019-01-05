import { makeExecutableSchema } from 'graphql-tools';
import Product from '../api/Product';

const productSchema = makeExecutableSchema({
  typeDefs: `
    type Products {
      totalCount: Int,
      result: [Product]
    }

    type Product {
      name: String,
      price: Float,
      image: String,
      url: String,
      rating: Int,
      id: Int,
    }

    type ProductDetail {
      name: String,
      description: String,
      type: String,
      price: Float,
      image: String,
      url: String,
      free_shipping: Boolean,
      popularity: Int,
      rating: Int,
      categoryId: Int,
      brandId: Int,
      id: Int,
    }

    type Query {
      products(
        _limit: Int,
        _page: Int,
        _sort: Int,
        categoryId: Int,
        brandId: Int,
        q: String
      ): Products,
      product(id: Int!): ProductDetail
    }
  `,
});

// query
const products = (_, arg) => {
  return Product.GET_PRODUCTS.call(null, arg);
};

const product = (_, arg) => {
  return Product.GET_PRODUCT.call(arg);
};

const productResolvers = {
  Query: {
    products,
    product,
  },
};

export { productSchema, productResolvers };
