const quotes = require('./data/quotes.json')

exports.helpCMD = function () {
  return 'Some dev quotes to keep you motivated'
}

exports.processCMD = function () {
  const quote = quotes[Math.floor(Math.random() * quotes.length)]
  return `
    Stay Motivated! ✍️

    _${quote.quote}_
      -- *${quote.author}*
    `
}
