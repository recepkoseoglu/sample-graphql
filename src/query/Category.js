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
      parentId: Int,
      id: Int
    }

    type Query {
      categories(
        _limit: Int,
        _sort: Int,
        parentId: Int,
        slug: String
        parentSlug: String
      ): Categories,
      category(id: Int, slug: String): Category
    }
  `,
});

// query
const categories = async (_, arg) => {
  if (arg.parentSlug) {
    const categoryItem = await category(_, { slug: arg.parentSlug });
    if (categoryItem) {
      arg.parentId = categoryItem.id;
    }
    delete arg.parentSlug;
  }
  return Category.GET_CATEGORIES.call(null, arg);
};

export const category = (_, arg) => {
  if (arg.id) {
    return Category.GET_CATEGORY.call(arg);
  } else {
    return Category.GET_CATEGORIES.call(null, arg).then(res => (res.result ? res.result[0] : res));
  }
};

const categoryResolvers = {
  Query: {
    categories,
    category,
  },
};

export { categorySchema, categoryResolvers };
