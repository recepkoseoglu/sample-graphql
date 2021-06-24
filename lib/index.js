const _express = _interopRequireDefault(require('express'))

const _apolloServerExpress = require('apollo-server-express')

let _templateObject

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0)
  }
  return Object.freeze(
    Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })
  )
}

const typeDefs = (0, _apolloServerExpress.gql)(
  _templateObject ||
    (_templateObject = _taggedTemplateLiteral([
      '\n  type Query {\n    hello: String\n  }\n',
    ]))
)
const resolvers = {
  Query: {
    hello: function hello() {
      return 'Hello world!'
    },
  },
}
const server = new _apolloServerExpress.ApolloServer({
  typeDefs,
  resolvers,
})
const app = (0, _express.default)()
server.applyMiddleware({
  app,
})
app.listen(
  {
    port: 4000,
  },
  () =>
    console.log(
      'Now browse to http://localhost:4000 + '.concat(server.graphqlPath)
    )
)
