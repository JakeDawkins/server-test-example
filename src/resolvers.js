const { gql } = require('apollo-server');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    dog(name: String!): Dog
  }

  type Mutation {
    updateDog(name: String!, image: String!): DogMutationResponse
  }

  type DogMutationResponse {
    success: Boolean!
    message: String!
    dog: Dog
  }

  type Dog {
    name: String!
    image: String!
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    dog: (parent, args, context) => context.models.dog.getDogByName(args.name),
  },
  Mutation: {
    updateDog: (parent, args, context) => {
      const res = context.models.dog.updateDog(args);

      if (!(res instanceof Error)) {
        return {
          success: true,
          message: 'Dog updated successfully',
          dog: res,
        };
      }

      return {
        success: false,
        message: res.message,
      };
    },
  },
};

module.exports = { resolvers, typeDefs };
