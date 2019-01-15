import { makeExecutableSchema } from 'graphql-tools';
import User from '../api/User';

const userSchema = makeExecutableSchema({
  typeDefs: `
    type Users {
      totalCount: Int,
      result: [User]
    }

    type User {
      id: Int,
      name: String,
      job: String,
      github: String,
      linkedIn: String,
      mail: String,
      title: String,
      samples: [Sample]
    }

    type Sample {
      url: String,
      image: String,
      title: String,
    }

    type Query {
      users(
        _sort: String,
        _limit: Int,
        q: String,
      ): Users,
      user(id: Int, mail: String): User
    }
  `,
});

// query
export const users = (_, arg) => {
  return User.GET_USERS.call(null, arg);
};

const user = (_, arg) => {
  if (arg.id) {
    return User.GET_USER.call(arg);
  } else {
    return User.GET_USERS.call(null, arg).then(res => (res.result ? res.result[0] : res));
  }
};

const userResolvers = {
  Query: {
    users,
    user,
  },
};

export { userSchema, userResolvers };
