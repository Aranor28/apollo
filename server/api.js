const { privateKey } = require('./private')
const md5 = require('md5')

const publicKey = 'd1331e284f42b871b2a9451c037811a4'

function getHash() {
  const timestamp = Date.now()
  // console.log('timestamp: ', timestamp);
  const hash = md5(timestamp + publicKey + privateKey)
  // console.log('hash: ', hash)
  // console.log('totalQueryParams: ', `?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`)
  return hash
}

function getQueryParams() {
  const timestamp = Date.now()
  const hash = md5(timestamp + privateKey + publicKey)
  const queryParams = `?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`

  return queryParams
}

module.exports = {
  getHash,
  getQueryParams,
}
