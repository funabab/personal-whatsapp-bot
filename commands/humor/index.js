const axios = require('axios').default

module.exports = async function (jokeType) {
  const { data: joke } = await axios.get(
    `https://v2.jokeapi.dev/joke/${
      jokeType === 'dark' ? 'Dark' : 'Programming'
    }`
  )

  return `
  ${jokeType === 'dark' ? "*Dark Humor... Yov've been warned!* 💀☠️" : '🤓🤓🤓'}

  ${joke.joke ? joke.joke : ''}${(!joke.joke && joke.setup) || ''}
  ${(!joke.joke && '......') || ''}
  ${(!joke.joke && joke.delivery) || ''}
  `
}
