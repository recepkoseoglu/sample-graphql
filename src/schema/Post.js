import Post from '../service/Post'
import { makeExecutableSchema } from '@graphql-tools/schema'

export const postSchema = makeExecutableSchema({
  typeDefs: `
    type Post {
        userId: Int,
        id: Int,
        title: String,
        body: String
    }
    type Query {
        posts: [Post]
        post(id: String): Post
    }  
`,
  resolvers: {
    Query: {
      posts: () => Post.list(),
      post: (_, arg) => Post.getById(arg.id),
    },
  },
})
