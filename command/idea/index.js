const ideas = require('./data/ideas.json')
const audiences = require('./data/audiences.json')

exports.helpCMD = function () {
  return 'Get Awesome Startup Ideas'
}

exports.processCMD = function () {
  return `
    Random Startup Idea: 🚀
    *${ideas[Math.floor(Math.random() * ideas.length)]} for ${
    audiences[Math.floor(Math.random() * audiences.length)]
  }*
  `
}
