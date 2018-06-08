const { ApolloServer, gql } = require('apollo-server');
const fetch = require('node-fetch');

const models = require('./models');
const { resolvers, typeDefs } = require('./resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    models,
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
