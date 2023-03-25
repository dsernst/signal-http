import { spawn } from 'child_process'
import { extractSender } from './extract-sender'
import axios from 'axios'
import { signal } from './path-to-signal'
import './clean-logs'

const debug = !!0

const command = `${signal} -a $BOT_NUMBER daemon --dbus`
const receivingServer = spawn(command, [], { shell: true })

let mostRecentSender = { fromName: '', fromPhone: '', recipient: '' }

receivingServer.stdout.on('data', (data: Buffer) => {
  const string = String(data)
  debug && console.log(`${string}`)

  // Check if this contains senders info
  const envelopePrefix = 'Envelope from: '
  if (string.includes(envelopePrefix)) {
    const extracted = extractSender(string)
    if (extracted) mostRecentSender = extracted
  }

  // Check if this contains a message
  if (string.includes('Body:')) {
    const message = string.split('Body:')[1].split('With profile key')[0].trim()
    // console.log(`${mostRecentSender.fromName}: ${message}`)
    axios.post('http://localhost:9461/message', { ...mostRecentSender, message })
  }
})

receivingServer.stderr.on('data', (d: Buffer) => console.log(`stderr 🟡: ${String(d).trim()}`))
receivingServer.on('error', (err: Buffer) => debug && console.error('err ❌:', err))
