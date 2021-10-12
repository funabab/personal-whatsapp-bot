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

ww.on(Events.MESSAGE_RECEIVED, async (message) => {
  let { body } = message
  body = body.trim()

  const mentions = await message.getMentions()
  const chat = await message.getChat()
  const mentioned = (mentions.find((contact) => contact.isMe) && true) || false
  const match = body.match(/\b\/(?<cmd>[a-zA-Z]{3,})\b/)
  const words = body.split(' ').length
  const command = match && match.groups.cmd

  if (
    command &&
    ((chat.isGroup && !message.fromMe && mentioned && words === 2) ||
      (!chat.isGroup && words === 1))
  ) {
    const cmdMsg = await commands(command)
    if (cmdMsg) {
      await chat.sendSeen()
      message.reply(cmdMsg)
    }
  }
})

ww.initialize()
