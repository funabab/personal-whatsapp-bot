const axios = require('axios').default

module.exports = async function () {
  const { data: joke } = await axios.get('https://v2.jokeapi.dev/joke/Dark')

  return `
  *Dark Humor... Yov've been warned!* 💀☠️

  ${joke.joke ? joke.joke : ''}${(!joke.joke && joke.setup) || ''}
  ${(!joke.joke && '......') || ''}
  ${(!joke.joke && joke.delivery) || ''}
  `
}
