const { ApolloServer } = require('apollo-server');

// Import GraphQL schema
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  engine: true
});

server.listen()
  .then(({ url }) =>
    console.log(`🚀 Server ready at ${url}`)
  );