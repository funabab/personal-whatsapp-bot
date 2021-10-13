const search = require('./search')

module.exports = async function (keyword) {
  return await search('Job Alert! 💼', false, keyword)
}
