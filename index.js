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

const reCmd = /\/(?<cmd>[a-zA-Z]{3,}\b)(?<arg>[a-zA-Z]{2,})?/

ww.on(Events.MESSAGE_CREATE, async (message) => {
  let { body } = message
  body = body.trim()

  const chat = await message.getChat()
  const match = body
    .replace(/@[\w\d]/, '')
    .trim()
    .match(reCmd)

  const words = body.split(' ').length
  const command = match && match.groups.cmd

  try {
    if (command && message.fromMe && words <= 2) {
      const cmdMsg = await commands(command, [match.groups.arg])
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
  body = body.trim()

  const mentions = await message.getMentions()
  const chat = await message.getChat()
  const mentioned = (mentions.find((contact) => contact.isMe) && true) || false
  const match = body
    .replace(/@[\w]+/, '')
    .trim()
    .match(reCmd)
  const words = body.split(' ').length
  const command = match && match.groups.cmd

  try {
    if (
      command &&
      words <= 2 &&
      !message.fromMe &&
      ((chat.isGroup && mentioned) || !chat.isGroup)
    ) {
      const cmdMsg = await commands(command)
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
