const { ApolloServer } = require('apollo-server')
const fetch = require('node-fetch')

const { typeDefs } = require('./typeDefs')
const { getQueryParams } = require('./api')

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

const server = new ApolloServer({
  typeDefs,
  resolvers,
  engine: {
    apiKey: "service:Aranor28-2972:lkwQGRZoiGZAMOcqIP7Olw"
  },
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
