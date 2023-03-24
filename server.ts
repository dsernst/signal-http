import { extractSender } from './extract-sender'

const { spawn } = require('child_process')

const command = './signal-cli -a $BOT_NUMBER daemon --dbus'
// const command = './signal-cli -u $BOT_NUMBER daemon --socket'
const fullCommand = `source ./config.sh && echo "Loaded Config" && ${command} && echo "Started signal daemon"`

const child = spawn(fullCommand, [], { shell: true })

const debug = false

let mostRecentSender = {
  senderName: '',
  senderPhone: '',
  recipientPhone: '',
}

child.stdout.on('data', (data: Buffer) => {
  const string = String(data)
  //   console.log(`stdout 📥: ${stripTrailingNewline(string)}`)
  const envelopePrefix = 'Envelope from: '
  if (string.includes(envelopePrefix)) {
    const extracted = extractSender(string)
    if (extracted) mostRecentSender = extracted
  }
  if (string.includes('Body:')) {
    const message = string.split('Body:')[1]
    console.log(`${mostRecentSender.senderName}: ${message}`)
  }
})

child.stderr.on('data', (data: Buffer) => {
  debug && console.error(`stderr 🟡: ${stripTrailingNewline(String(data))}`)
})

child.on('error', (err: Buffer) => {
  debug && console.error('err ❌:', err)
})

function stripTrailingNewline(str: string): string {
  if (str.endsWith('\n')) {
    return str.slice(0, -1)
  }
  return str
}
