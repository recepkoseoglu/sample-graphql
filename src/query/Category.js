import { makeExecutableSchema } from 'graphql-tools';
import Category from '../api/Category';

const categorySchema = makeExecutableSchema({
  typeDefs: `
    type Category {
      name: String,
      parentInd: Int,
      id: Int
    }

    type Query {
      categories(
        _limit: Int,
        _sort: Int,
        parentId: Int
      ): [Category],
      cateory(id: Int!): Category
    }
  `,
});

// query
const categories = (_, arg) => {
  return Category.GET_CATEGOIES.call(null, arg);
};

const cateory = (_, arg) => {
  return Category.GET_CATEGORY.call(arg);
};

const categoryResolvers = {
  Query: {
    categories,
    cateory,
  },
};

export { categorySchema, categoryResolvers };
