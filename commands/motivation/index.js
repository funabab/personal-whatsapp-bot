const quotes = require('./data/quotes.json')

module.exports = function () {
  const quote = quotes[Math.floor(Math.random() * quotes.length)]
  return `
    Stay Motivated! ✍️

    _${quote.quote}_
      -- *${quote.author}*
    `
}
