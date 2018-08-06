const { gql } = require('apollo-server')

const typeDefs = gql`
  type Query {
    characters: Characters
  }

  type Characters {
    character: Character
  }

  type Character {
    id: Int
    name: String
    thumbnail: String
  }
`

module.exports = {
  typeDefs,
}
