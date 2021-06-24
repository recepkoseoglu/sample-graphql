import Todo from '../service/Post'
import { makeExecutableSchema } from '@graphql-tools/schema'

export const todoSchema = makeExecutableSchema({
  typeDefs: `
    type Todo {
      id: Int
      userId: Int
      title: String  
      completed: Boolean
    }
    type Query {
        todos: [Todo]
        todo(id: String): Todo
    }  
`,
  resolvers: {
    Query: {
      todos: () => Todo.list(),
      todo: (_, arg) => Todo.getById(arg.id),
    },
  },
})
