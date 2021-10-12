const axios = require('axios').default
const striptags = require('striptags')

// async function scrapIndeed(term, title, internship) {
//   let url = `https://ng.indeed.com/jobs?q=${encodeURIComponent(term)}`
//   if (internship) {
//     url += '&jt=internship'
//   }

//   const reScrap =
//     /^\s*window\.mosaic\.providerData\["mosaic-provider-jobcards"\]=(?<json>.+?);\s*$/m

//   const { data: page } = await axios.get(url)

//   const match = page.match(reScrap)
//   if (!match) {
//     throw new Error(`Indeed scrap regex didn't match... new changes? ${url}`)
//   }

//   const jsonData = JSON.parse(match.groups.json)

//   const out = jsonData.metaData.mosaicProviderJobCardsModel.results.map(
//     (result) => {
//       return `
//     ${title}

//     *${result.title}*
//     Summary: _${
//       striptags(result.snippet).trim().replace(/\n/g, ' ') || 'not specified'
//     }_

//     Salary: *${
//       (result.salarySnippet && result.salarySnippet.text) || 'Undisclosed'
//     }*

//     *Company:* ${result.company}
//     *Location:* ${result.formattedLocation || '----'}
//     *Active:* ${result.formattedRelativeTime || '----'}
//     *Jop Type:* ${
//       (Array.isArray(result.jobTypes) && result.jobTypes.join(', ')) || 'job'
//     }

//     https://ng.indeed.com${result.viewJobLink}
//     `
//     }
//   )

//   return out
// }

module.exports = async function (title = 'Job Alert!', internship = false) {
  const keywords = [
    'Javascript',
    'PHP',
    'Nodejs',
    'React',
    'Frontend',
    'Backend',
    'Data',
    'Flutter',
    'Laravel',
    'Java',
    'Python',
    'Product',
    'Designer',
    'UI UX',
    'Digital Marketing',
  ]

  const keywordIndex = Math.floor(Math.random() * keywords.length)

  const { data: jobs } = await axios.post(
    'https://winter-sky-4bc9.cskwasu2019.workers.dev/',
    {
      title,
      internship,
      query: keywords[keywordIndex],
    }
  )

  if (!jobs.length) {
    throw new Error(
      `No job found for keyword: ${keywords[keywordIndex]}, intership: ${internship}`
    )
  }

  return striptags(jobs[Math.floor(Math.random() * jobs.length)])
}
