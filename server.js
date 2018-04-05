const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

// const { ApolloServer } = require("apollo-server/express");

// const server = new ApolloServer({ typeDefs, resolvers });

// server.middleware(app, { endpoint: "/" });
// app.use(server.middleware({ endpoint: "/" });

// const { graphql, graphiql } = server.middleware({ endpoint: "/" });
        
// app.use(graphql);
// app.use(graphiql);

// server.listen(app);


// Import GraphQL schema
const schema = require('./schema');


// Express App Setup
const app = express();
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.get('/', bodyParser.json(), graphiqlExpress({ endpointURL: '/graphql' }));


// Listen for connections
const PORT = process.env.PORT || 3000;
const listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
