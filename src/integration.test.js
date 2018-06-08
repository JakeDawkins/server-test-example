/*---------------------------
e2e schema test -- uses real resolvers and typeDefs to execute a graphql operation

// https://graphql.org/graphql-js/graphql/#graphql
graphql(
  schema,               // executable schema built with typedefs and resolvers
  operation_to_execute, // query/mutation AST
  {},                   // root value
  context               // context to pass to resolvers
);
---------------------------*/

const { typeDefs, resolvers } = require('./resolvers');
const { makeExecutableSchema } = require('graphql-tools');
const { graphql } = require('graphql');
const { gql } = require('apollo-server');

// combine our real typedefs with real resolvers to execute against
// if all our data fetching functions are coming from the context,
// this would work splendidly, as resolvers just route data. They don't
// care where it comes from (our mocked context, below)
const schema = makeExecutableSchema({ typeDefs, resolvers });

// context to be used when executing the `graphql` function
const mockContext = {
  models: {
    dog: {
      getDogByName: () => ({ name: 'Frank', image: 'wow' }),
      updateDog: () => ({
        name: 'Jimothy',
        image: 'http://dog.ceo',
      }),
    },
  },
};

describe('Query', () => {
  it('returns expected data from dog query', done => {
    const SAMPLE_DOG_QUERY = gql`
      {
        dog(name: "Frank") {
          name
          image
        }
      }
    `;

    // execute the query
    const res = graphql(schema, SAMPLE_DOG_QUERY, {}, mockContext);
    res.then(data => {
      expect(data).toEqual({ data: { dog: { name: 'Frank', image: 'wow' } } });
      done();
    });
  });
});

describe('Mutation', () => {
  it('executes updateDog resolver correctly and returns data', done => {
    const SAMPLE_DOG_MUTATION = gql`
      mutation update {
        updateDog(name: "Jimothy", image: "http://dog.ceo") {
          success
          message
          dog {
            name
            image
          }
        }
      }
    `;

    // execute the query
    const res = graphql(schema, SAMPLE_DOG_MUTATION, {}, mockContext);
    res.then(data => {
      expect(data).toEqual({
        data: {
          updateDog: {
            success: true,
            message: 'Dog updated successfully',
            dog: {
              name: 'Jimothy',
              image: 'http://dog.ceo',
            },
          },
        },
      });
      done();
    });
  });
});
