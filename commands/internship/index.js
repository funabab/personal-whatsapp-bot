const search = require('../job/search')

module.exports = async function (keyword) {
  return await search('Intership Alert! 🤓', true, keyword)
}
