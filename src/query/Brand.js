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
      brands(
        _sort: String,
        _limit: Int,
        q: String,
        slug: [String]
      ): Brands,
      brand(id: Int, slug: String): Brand
    }
  `,
});

// query
export const brands = (_, arg) => {
  return Brand.GET_BRANDS.call(null, arg);
};

const brand = (_, arg) => {
  if (arg.id) {
    return Brand.GET_BRAND.call(arg);
  } else {
    return Brand.GET_BRANDS.call(null, arg).then(res => (res.result ? res.result[0] : res));
  }
};

const brandResolvers = {
  Query: {
    brands,
    brand,
  },
};

export { brandSchema, brandResolvers };
