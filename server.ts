import { spawn, execSync } from 'child_process'
import { extractSender } from './extract-sender'

const debug = !!0

const command = './signal-cli -a $BOT_NUMBER daemon --dbus'
const fullCommand = `source ./config.sh && echo "Loaded config" && ${command} && echo "Started signal daemon"`

execSync('rm ./hs_err_pid*.log 2>/dev/null') // Clean up old logs
const child = spawn(fullCommand, [], { shell: true })

let mostRecentSender = {
  senderName: '',
  senderPhone: '',
  recipientPhone: '',
}

child.stdout.on('data', (data: Buffer) => {
  const string = String(data)
  debug && console.log(`stdout 📥: ${string.trim()}`)
  const envelopePrefix = 'Envelope from: '
  if (string.includes(envelopePrefix)) {
    const extracted = extractSender(string)
    if (extracted) mostRecentSender = extracted
  }
  if (string.includes('Body:')) {
    const message = string.split('Body:')[1].split('With profile key')[0].trim()
    console.log(`${mostRecentSender.senderName}: ${message}`)
  }
})

child.stderr.on('data', (d: Buffer) => debug && console.log(`stderr 🟡: ${String(d).trim()}`))
child.on('error', (err: Buffer) => debug && console.error('err ❌:', err))
