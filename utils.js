const fs = require('fs')
const config = require('./config')

exports.loadSession = function () {
  try {
    if (fs.existsSync(config.sessionFilePath)) {
      const buf = fs.readFileSync(config.sessionFilePath)
      return JSON.parse(buf.toString())
    } else {
      throw new Error('Session path do not exist')
    }
  } catch (err) {
    return null
  }
}

exports.saveSession = function (session) {
  fs.writeFile(config.sessionFilePath, JSON.stringify(session), (err) => {
    if (err) {
      console.error(`Error occcured: unable to save session`)
    } else {
      console.log('Session saved!')
    }
  })
}
