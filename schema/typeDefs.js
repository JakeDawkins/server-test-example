const typeDefs = `

  type Author {
    id: Int!
    firstName: String
    lastName: String
    posts: [Post] # the list of Posts by this author
  }

  type Post {
    id: Int!
    title: String
    author: Author
    votes: Int
  }

  # the schema allows the following query:
  type Query {
    posts: [Post] @cacheControl(maxAge: 60000)
    author(id: Int!): Author @cacheControl(maxAge: 60000)
  }

  # this schema allows the following mutation:
  type Mutation {
    upvotePost (
      postId: Int!
    ): Post
  }

`;

module.exports = typeDefs;