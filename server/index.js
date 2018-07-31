const { ApolloServer, gql } = require('apollo-server')
const fetch = require('node-fetch')
const { getQueryParams } = require('./api')

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

const resolvers = {
  Query: {
    characters() {
      return fetch(`http://gateway.marvel.com/v1/public/characters${getQueryParams()}`)
        .then(res => res.json())
        .then(res => res.data.results)
    }
  },
  Characters: {
    character(characters) {
      return characters[0]
    }
  },
  Character: {
    thumbnail(character) {
      return character.thumbnail.path
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
  fetch(`http://gateway.marvel.com/v1/public/characters${getQueryParams()}`)
    .then(res => res.json())
    .then(res => console.log('ehe', res.data.results[0]))
})
