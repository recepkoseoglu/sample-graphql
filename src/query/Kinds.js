import { makeExecutableSchema } from 'graphql-tools';
import Kinds from '../api/Kinds';

const kindSchema = makeExecutableSchema({
  typeDefs: `
    type Kinds {
      totalCount: Int,
      result: [Kind]
    }

    type Kind {
      id: Int,
      image: String,
      title: String,
      description: String,
      url: String,
      type: String
    }

    type Query {
      kinds(type: String): Kinds,
    }
  `,
});

// query
export const kinds = (_, arg) => {
  return Kinds.GET_LIST.call(null, arg);
};

const kindResolvers = {
  Query: {
    kinds,
  },
};

export { kindSchema, kindResolvers };
