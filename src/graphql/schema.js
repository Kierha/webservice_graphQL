const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Query {
    games(genre: String, platform: String, studio: String): [Game]
    game(id: ID!): Game
    editors: [Editor]
    editor(id: ID!): Editor
    studios: [Studio]
    studio(id: ID!): Studio
  }

  type Game {
    id: ID
    name: String!
    genres: [String!]!
    publicationDate: Int
    editors: [Editor!]!
    studios: [Studio!]!
    platform: [String!]!
  }

  type Editor {
    id: ID
    name: String!
    games: [Game]
  }

  type Studio {
    id: ID
    name: String!
    games: [Game]
  }

  type Infos {
    count: Int!
    pages: Int!
    nextPage: Int
    previousPage: Int
  }

  type Games {
    infos: Infos
    results: [Game]
  }

  type Editors {
    infos: Infos
    results: [Editor]
  }

  type Studios {
    infos: Infos
    results: [Studio]
  }
`);

module.exports = schema;
