const { spawn } = require('child_process')

const command = './signal-cli -a $BOT_NUMBER daemon --dbus'
// const command = './signal-cli -u $BOT_NUMBER daemon --socket'
const fullCommand = `source ./config.sh && echo "Loaded Config" && ${command} && echo "Started signal daemon"`

const child = spawn(fullCommand, [], { shell: true })

child.stdout.on('data', (data: Buffer) => {
  console.log(`stdout 📥: ${stripTrailingNewline(String(data))}`)
  //   if (data.includes('Body:')) {
  //     console.log(String(data).slice(data.indexOf('Body:') + 5))
  //   }
})

child.stderr.on('data', (data: Buffer) => {
  console.error(`stderr 🟡: ${stripTrailingNewline(String(data))}`)
})

child.on('error', (err: Buffer) => {
  console.error('err ❌:', err)
})

function stripTrailingNewline(str: string): string {
  if (str.endsWith('\n')) {
    return str.slice(0, -1)
  }
  return str
}
