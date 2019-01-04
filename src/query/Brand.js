import { makeExecutableSchema } from 'graphql-tools';
import Brand from '../api/Brand';

const brandSchema = makeExecutableSchema({
  typeDefs: `
    type Brands {
      totalCount: Int,
      result: [Brand]
    }

    type Brand {
      name: String,
      slug: String,
      id: Int,
    }
    type Query {
      brands: Brands,
      brand(id: Int!): Brand
    }
  `,
});

// query
const brands = (_, arg) => {
  return Brand.GET_BRANDS.call(null, arg);
};

const brand = (_, arg) => {
  return Brand.GET_BRAND.call(arg);
};

const brandResolvers = {
  Query: {
    brands,
    brand,
  },
};

export { brandSchema, brandResolvers };
