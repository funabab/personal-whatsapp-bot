const aboutCmd = require('./about')
const courseCmd = require('./course')
const darkhumorCmd = require('./darkhumor')
const hackernewsCmd = require('./hackernews')
const ideaCmd = require('./idea')
const internshipCmd = require('./internship')
const jobCmd = require('./job')
const motivationCmd = require('./motivation')
const { sendReport } = require('../report')

const cmdMessage = `
_Ding Ding! I'm Online 👋..._

You need some help?
Here are my commands: 🤖


[COOPORATE]:
*/job* -> Get new jobs, fast and easy

*/internship* -> Looking for internship? Get it with this command

*/hackernews* -> Fastest way to get hackernews from here



[LEISURE]:
*/motivation* -> Some dev quotes to keep you motivated 

*/idea* -> Get Awesome Startup Ideas

*/darkhumor* -> They are so dark, yor need some light


[LEARNING]:
*/course* -> Get link to premium course avaible for free download



There is also */about* you can check out if you are curious 😉
And yeah! I also reply DMs
`

module.exports = async function commands(cmd) {
  try {
    switch (cmd.toLowerCase()) {
      case 'course':
        return await courseCmd()
      case 'darkhumor':
        return await darkhumorCmd()
      case 'hackernews':
        return await hackernewsCmd()
      case 'idea':
        return await ideaCmd()
      case 'job':
        return await jobCmd()
      case 'internship':
        return await internshipCmd()
      case 'motivation':
        return await motivationCmd()
      case 'about':
        return await aboutCmd()
      default:
        return cmdMessage
    }
  } catch (err) {
    console.error('Error occurred while processing cmd:', cmd)
    sendReport(
      `Error occurred while processing cmd: ${cmd}`,
      err.message,
      'warning'
    )
    return null
  }
}
