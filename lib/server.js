'use strict';

var _templateObject = _taggedTemplateLiteral(['\n  type Query {\n    hello: String\n  }\n\n  type Mutation {\n    hello(name: String): String\n  }\n\n  schema {\n    query: Query\n    mutation: Mutation\n  }\n'], ['\n  type Query {\n    hello: String\n  }\n\n  type Mutation {\n    hello(name: String): String\n  }\n\n  schema {\n    query: Query\n    mutation: Mutation\n  }\n']);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _apolloServerExpress = require('apollo-server-express');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var typeDefs = (0, _apolloServerExpress.gql)(_templateObject);

var resolvers = {
  Query: {
    hello: function hello(_) {
      return 'world';
    }
  },
  Mutation: {
    hello: function hello(_, arg) {
      return 'Hello ' + arg.name + '!';
    }
  }
};

var server = new _apolloServerExpress.ApolloServer({ typeDefs: typeDefs, resolvers: resolvers });
var app = (0, _express2.default)();
server.applyMiddleware({ path: '/graphql', app: app });
app.listen(4000, function () {
  return console.log('Now browse to localhost:4000/graphql');
});