import { makeExecutableSchema } from 'graphql-tools';
import Category from '../api/Category';

const categorySchema = makeExecutableSchema({
  typeDefs: `
    type Categories {
      totalCount: Int,
      result: [Category]
    }

    type Category {
      name: String,
      slug: String,
      parentInd: Int,
      id: Int
    }

    type Query {
      categories(
        _limit: Int,
        _sort: Int,
        parentId: Int
      ): Categories,
      category(id: Int!): Category
    }
  `,
});

// query
const categories = (_, arg) => {
  return Category.GET_CATEGOIES.call(null, arg);
};

const category = (_, arg) => {
  return Category.GET_CATEGORY.call(arg);
};

const categoryResolvers = {
  Query: {
    categories,
    category,
  },
};

export { categorySchema, categoryResolvers };
