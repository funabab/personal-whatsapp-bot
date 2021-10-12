const path = require('path')

module.exports = {
  baseAPI: {
    token: process.env.BASE_API_ACCESS_TOKEN,
  },
  sessionFilePath: path.join(__dirname, 'session.json'),
  reportMail: process.env.REPORT_MAIL,
}
