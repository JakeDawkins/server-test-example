const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { ApolloEngine } = require("apollo-engine");

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
}), ({ url }) => console.log('Your app is listening on port 3000');
