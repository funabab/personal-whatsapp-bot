const { Client } = require('base-api-io')
const config = require('./config')

const api = new Client(config.baseAPI.token)

exports.sendReport = function (title, content, type = 'normal') {
  let reportType = ''
  switch (type) {
    case 'error':
      reportType = '[ERROR] '
      break
    case 'info':
      reportType = '[INFO] '
      break
    case 'warning':
      reportType = '[WARNING] '
      break
  }

  const body = `
  New report ${reportType}:
  ${title}
  ${content}
  `

  api.emails
    .send(
      `${reportType}${title}`,
      config.reportMail,
      config.reportMail,
      null,
      null,
      body
    )
    .catch((err) => {
      console.error(err)
    })
}
