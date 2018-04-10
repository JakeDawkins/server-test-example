const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { ApolloEngine } = require("apollo-engine");

// const { ApolloServer } = require("apollo-server");

// const server = new ApolloServer({ typeDefs, resolvers });

// XXX if you have an existing application
// const { graphql, graphiql } = server.middleware({ endpoint: "/" });
        
// app.use(graphql);
// app.use(graphiql);

// server.listen({ app });

// otherwise you just call this
// server.listen();

// Import GraphQL schema
const schema = require('./schema');

// Express App Setup
const app = express();
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema, tracing: true, cacheControl: true }));
app.get('/', bodyParser.json(), graphiqlExpress({ endpointURL: '/graphql' }));

// Listen for connections
const PORT = process.env.PORT || 3000;

const engine = new ApolloEngine({
  apiKey: process.env.ENGINE_API_KEY,
  reporting: { disabled: !process.env.ENGINE_API_KEY }
});

// Start your server
engine.listen({
  port: 3000,
  expressApp: app,
}), ({ url }) => console.log('Your app is listening on port 3000');;
