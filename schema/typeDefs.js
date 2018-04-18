const { gql } = require('apollo-server');

const typeDefs = gql`

  type Author @cacheControl(maxAge: 60000) {
    id: Int!
    firstName: String
    lastName: String
    posts: [Post] # the list of Posts by this author
  }

  type Post @cacheControl(maxAge: 60000) {
    id: Int!
    title: String
    author: Author
    votes: Int
  }

  # the schema allows the following query:
  type Query {
    posts: [Post] 
    author(id: Int!): Author
  }

  # this schema allows the following mutation:
  type Mutation {
    upvotePost (
      postId: Int!
    ): Post
  }

`;

module.exports = typeDefs;