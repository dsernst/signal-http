import { execSync } from 'child_process'
import fastify from 'fastify'
import { signal } from './path-to-signal'

const debug = process.env.DEBUG || !!0

const app = fastify()
app.post('/send', (req, res) => {
  debug && console.log('📤 POST /send:', JSON.stringify(req.body))
  const { to, message, toGroup } = req.body as { to?: string; message?: string; toGroup?: string }

  // Is it ready to send out?
  if (to) {
    const escaped = (message || '').replace(/\\/g, '\\\\').replace(/"/g, '\\"')
    // .replace(/'/g, "'\\''") Not needed
    // .replace(/\[/g, '\\[')
    // .replace(/\]/g, '\\]')
    let command = `${signal} --dbus send -m "${escaped}" ${toGroup ? `-g ${toGroup}` : to}`
    if (!debug) command += ' 2> /dev/null'
    try {
      execSync(command)
      res.send('OK')
    } catch (error) {
      debug && console.error('sending error ❌:', req.body, error)
      res.send('ERROR')
    }
  } else {
    console.error('❌ missing to:', req.body)
    res.status(400).send('Bad request, missing `to` field')
  }
})

const port = 9460
app.listen({ port }, () => console.log(`🟢 signal-http live on port ${port}`))
