const aboutCmd = require('./about')
const courseCmd = require('./course')
const humorCmd = require('./humor')
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
You can also pass the job keyword as an arguement (spaces should be replaced with +)
e.g 
/job Frontend+Development
/job Designer

*/internship* -> Looking for internship? Get it with this command.
You optionaly can also pass the job keyword as an arguement (spaces should be replaced with +)
e.g 
/internship Frontend+Development
/internship Designer

*/hackernews* -> Fastest way to get hackernews from here



[LEISURE]:
*/motivation* -> Some dev quotes to keep you motivated 

*/idea* -> Get Awesome Startup Ideas

*/humor* -> Programming Jokes... (your can optionally also pass *dark* as an arguement for the dark side)
e.g
/humor dark

[LEARNING]:
*/course* -> Get link to premium course avaible for free download



There is also */about* you can check out if you are curious 😉
And yeah! I also reply DMs
`

module.exports = async function commands(cmd, arg) {
  try {
    switch (cmd.toLowerCase()) {
      case 'course':
        return await courseCmd()
      case 'humor':
        return await humorCmd(arg)
      case 'hackernews':
        return await hackernewsCmd()
      case 'idea':
        return await ideaCmd()
      case 'job':
        return await jobCmd(arg)
      case 'internship':
        return await internshipCmd(arg)
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
      `${err.message}\n\n${err.stack}`,
      'warning'
    )
    return null
  }
}
