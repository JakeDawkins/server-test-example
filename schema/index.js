const { makeExecutableSchema } = require('graphql-tools');


const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});