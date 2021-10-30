const fs = require('fs').promises
const fsSync = require('fs')
const path = require('path')

const { sendReport } = require('../report')

class CommandManager {
  __initialized = false

  constructor(cmdHome) {
    this.cmdHome = cmdHome || __dirname
  }

  async initialize() {
    this.__commands = {}
    const dirListing = await fs.readdir(this.cmdHome)
    dirListing.forEach((dir) => {
      const cmd = dir
      const absPath = path.join(__dirname, dir)
      if (!fsSync.statSync(absPath).isDirectory()) {
        return
      }
      const { processCMD, helpCMD } = require(path.join(absPath, 'index.js'))
      if (!processCMD) {
        return
      }

      this.__commands[cmd] = {
        process: processCMD,
        help: helpCMD,
      }
    })

    this.__initialized = true
  }

  help() {
    return `
    _Ding Ding! I'm Online 👋..._

    You need some help?
    Here are my commands: 🤖
    ${
      '\n' +
      Object.keys(this.__commands)
        .map((cmd) =>
          this.__commands[cmd].help
            ? `*/${cmd}* -> ${this.__commands[cmd].help()}\n${'='.repeat(10)}\n`
            : ''
        )
        .join('')
    }


    There's also */about* you can check out if you are curious 😉
    And yeah! I also reply DMs
    `
  }

  async process(cmd, arg, successCallback) {
    const callback = (message) => {
      if (typeof successCallback === 'function') {
        successCallback(message)
      }
      return message
    }

    try {
      cmd = cmd.toLowerCase()
      if (!this.__initialized) {
        throw new Error('CommandManager instance not initialized')
      }

      if (cmd in this.__commands === false) {
        return callback(this.help())
      }

      return callback(await this.__commands[cmd].process(arg))
    } catch (err) {
      console.error('Error occurred while processing cmd:', cmd)
      sendReport(
        `Error occurred while processing cmd: ${cmd}`,
        `${err.message}\n\n${err.stack}`,
        'warning'
      )
    }
    return null
  }
}

module.exports = { CommandManager }
