const search = require('./search')

exports.helpCMD = function () {
  return 'Get new jobs, fast and easy'
}

exports.processCMD = async function (keyword) {
  return await search('Job Alert! 💼', false, keyword)
}
