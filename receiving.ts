import { spawn } from 'child_process'
import axios from 'axios'
import { signal } from './path-to-signal'
import './clean-logs'

const debug = process.env.DEBUG || !!0

const command = `${signal} -o json -a $BOT_NUMBER daemon --dbus`
const receivingServer = spawn(command, [], { shell: true })

receivingServer.stdout.on('data', (data: Buffer) => {
  const string = String(data)
  debug && console.log(`📥 ${string}`)

  // Try to parse the incoming data as JSON
  let json
  try {
    json = JSON.parse(string)
  } catch (err) {
    return
  }
  const { envelope } = json

  // Check if this has an incoming message (not just isTyping, group updated, etc)
  if (envelope?.dataMessage?.message) {
    const { sourceNumber, sourceName, dataMessage } = envelope
    const { message, groupInfo } = dataMessage
    const groupId = groupInfo?.groupId

    // Forward to webhook
    axios.post('http://localhost:9461/message', { message, sourceName, sourceNumber, groupId })
  }
})

receivingServer.stderr.on('data', (d: Buffer) => console.log(`🟡 stderr: ${String(d).trim()}`))
receivingServer.on('error', (err: Buffer) => debug && console.error('err ❌:', err))
