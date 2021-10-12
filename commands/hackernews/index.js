const axios = require('axios').default

module.exports = async function () {
  const newsType = ['topstories', 'newstories', 'beststories'][
    Math.floor(Math.random() * 3)
  ]

  const newsTypeTitle = {
    topstories: 'Top Stories',
    newstories: 'New Stories',
    beststories: 'Best Stories',
  }

  const { data: newsIds } = await axios.get(
    `https://hacker-news.firebaseio.com/v0/${newsType}.json`
  )

  const { data: news } = await axios.get(
    `https://hacker-news.firebaseio.com/v0/item/${
      newsIds[Math.floor(Math.random() * newsIds.length)]
    }.json`
  )

  return `
    Hackernews: ${newsTypeTitle[newsType]} 📰
    *${news.title}*

    ${news.url || ''}
  `
}
