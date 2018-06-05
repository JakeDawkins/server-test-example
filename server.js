const { ApolloServer, gql } = require('apollo-server');
const fetch = require('node-fetch');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    # returns a random dog image
    dog(name: String!): Dog
  }

  type Mutation {
    # this doesn't do anything, but don't tell anyone ;)
    addDog(name: String!, image: String!): Dog
  }

  type Dog {
    name: String!
    image: String!
  }
`;

let count = 0;
// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: (root, args, context) => {
      count++;
      console.log({ count });
      return 'Hello world!';
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
});