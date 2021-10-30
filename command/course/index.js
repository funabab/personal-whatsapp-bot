const axios = require('axios').default

exports.helpCMD = function () {
  return 'Get link to premium course avaible for free download'
}

exports.processCMD = async function () {
  const { data } = await axios.get(
    'https://www.reddit.com/r/udemyfreebies/new.json'
  )

  const result = data.data.children.filter(({ data: post }) => !!post.url)

  if (!result.length) {
    throw new Error('No course found!')
  }

  const { data: course } = result[Math.floor(Math.random() * result.length)]

  return `
  *FREE COURSE!* 🚨
  ${course.title}

  ${course.url}
  `
}
