require('dotenv').config()

const { Client, Events } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')
const { sendReport } = require('./report')
const { loadSession, saveSession } = require('./utils')
const commands = require('./commands')

const ww = new Client({
  session: loadSession(),
})

ww.on(Events.QR_RECEIVED, (qr) => {
  console.clear()
  qrcode.generate(qr, { small: true })
})
ww.on(Events.AUTHENTICATED, (session) => {
  saveSession(session)
  console.clear()
  console.log('Authenticated!')
  sendReport(
    'Authenticated',
    'Successfully logged in to whatsapp web client',
    'info'
  )
})
ww.on(Events.AUTHENTICATION_FAILURE, (message) => {
  console.error('Unable to Authenticate', message)
  sendReport('Unable to Authenticate', message, 'error')
})
ww.on(Events.DISCONNECTED, () => {
  sendReport('Bot Disconnected', 'info')
})

const reCmd = /^\/(?<cmd>[a-zA-Z]{3,}\b)\s*(?<arg>.+?)?$/
function formatCmdInput(input) {
  const format = input
    .split('\n')[0] // get only the first line
    .replace(
      // remove all emojis
      /\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]/g,
      ''
    ) // remove all mention tags
    .replace(/@[\w]+/g, '')
    .trim()

  return format
}

function parseCmd(input) {
  const match = input.match(reCmd)
  if (!match) {
    return []
  }

  return [match.groups.cmd, input.replace(`/${match.groups.cmd}`, '').trim()]
}

ww.on(Events.MESSAGE_CREATE, async (message) => {
  let { body } = message

  const chat = await message.getChat()
  const [cmd, arg] = parseCmd(formatCmdInput(body))

  try {
    if (cmd && message.fromMe) {
      const cmdMsg = await commands(cmd, arg)
      chat.sendMessage(cmdMsg)
      return
    }
  } catch (err) {
    console.error(err)
    sendReport(
      'Error occurred while processing chat command',
      `${err.message}\n\n${err.stack}`,
      'warning'
    )
  }
})

ww.on(Events.MESSAGE_RECEIVED, async (message) => {
  let { body } = message

  const mentions = await message.getMentions()
  const chat = await message.getChat()
  const mentioned = (mentions.find((contact) => contact.isMe) && true) || false
  const [cmd, arg] = parseCmd(formatCmdInput(body))

  try {
    if (
      cmd &&
      !message.fromMe &&
      ((chat.isGroup && mentioned) || !chat.isGroup)
    ) {
      const cmdMsg = await commands(cmd, arg)
      if (cmdMsg) {
        await chat.sendSeen()
        message.reply(cmdMsg)
      }
    }
  } catch (err) {
    console.error(err)
    sendReport(
      'Error occurred while processing chat command',
      `${err.message}\n\n${err.stack}`,
      'warning'
    )
  }
})

ww.initialize()
