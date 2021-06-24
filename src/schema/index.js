import { mergeSchemas } from '@graphql-tools/merge'
import { todoSchema } from './Todo'
import { postSchema } from './Post'

const schema = mergeSchemas({
  schemas: [todoSchema, postSchema],
})

export default schema
