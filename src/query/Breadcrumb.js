import { makeExecutableSchema } from 'graphql-tools';
import Breadcrumb from '../api/Breadcrumb';

const breadcrumbSchema = makeExecutableSchema({
  typeDefs: `
    type Category {
      name: String,
      parentId: Int,
      slug: String,
      id: Int
    }

    type Query {
      breadcrumb(categoryId: Int, categorySlug: String): [Category]
    }
  `,
});

// query
const breadcrumb = (_, arg) => {
  return Breadcrumb.GET_CATEGORIES.call(null, arg);
};

const breadcrumbResolvers = {
  Query: {
    breadcrumb,
  },
};

export { breadcrumbSchema, breadcrumbResolvers };
