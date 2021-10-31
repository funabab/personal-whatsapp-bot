const axios = require('axios').default

exports.helpCMD = function () {
  return 'Get link to premium course avaible for free download'
}

exports.processCMD = async function (arg) {
  const { data } = await axios.get(
    'https://www.reddit.com/r/udemyfreebies/new.json'
  )

  const result = data.data.children.filter(({ data: post }) => !!post.url)

  if (!result.length) {
    throw new Error('No course found!')
  }

  const courses =
    arg === 'all'
      ? result.map((item) => item.data)
      : [result[Math.floor(Math.random() * result.length)].data]

  return `
  *FREE COURSE!* 🚨

  ${courses
    .map(
      (course) =>
        `\n${course.title}${'\n'.repeat(courses.length > 1 ? 1 : 2)}${
          course.url
        }\n\n${(courses.length > 1 && `${'='.repeat(10)}\n`) || ''}`
    )
    .join('')}
  `
}
