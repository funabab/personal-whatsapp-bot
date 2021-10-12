const ideas = require('./data/ideas.json')
const audiences = require('./data/audiences.json')

module.exports = function () {
  return `
    Random Startup Idea: 🚀
    *${ideas[Math.floor(Math.random() * ideas.length)]} for ${
    audiences[Math.floor(Math.random() * audiences.length)]
  }*
  `
}
