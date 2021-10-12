const package = require('../../package.json')

module.exports = function () {
  const authors = Object.keys(package.dependencies)
    .map((key) => {
      const depPackage = require(`${key}/package.json`)
      const author =
        (depPackage.author && (depPackage.author.name || depPackage.author)) ||
        ''

      return author
    })
    .filter((depAuthor) => !!depAuthor)

  return `
  I'm a bot, I'm a developer companion, I'm here to serve.
  I was incubated by ${package.author.name} 🧑‍💻
  
  ${package.author.url} (let's connect!)

  *version:* ${package.version} ✅

  A huge thanks to ${authors.join(
    ', '
  )} ... and a very special thanks to Jeff Bezos 😏
    `
}
