const {
  graphql,
  GraphQLEnumType,
  GraphQLType,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLBoolean,
  printSchema,
} = require('graphql');
const { gql } = require('apollo-server');

const allowedColor = new GraphQLEnumType({
  name: 'AllowedColor',
  values: {
    RED: { value: '#f00' },
    GREEN: { value: '#0f0' },
    BLUE: { value: '#00f' },
  },
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      avatar: {
        type: GraphQLBoolean,
        args: {
          anEnum: {
            type: allowedColor,
            defaultValue: 'RED',
          },
        },
        resolve: (root, args) => (args.anEnum === 'RED' ? false : true),
      },
    }),
  }),
});

describe('Query', () => {
  it('queries', () => {
    const query = gql`
      {
        avatar
      }
    `;

    console.log(printSchema(schema));
    const res = graphql(schema, query);
    res.then(data => {
      // this returns false right now
      expect(data).toEqual({ data: { avatar: true } });
      done();
    });
  });
});
