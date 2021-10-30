const search = require('../job/search')

exports.helpCMD = function () {
  return 'Looking for internship? Get it with this command'
}

exports.processCMD = async function (keyword) {
  return await search('Intership Alert! 🤓', true, keyword)
}
