import { execSync } from 'child_process'
import fastify from 'fastify'
import { signal } from './path-to-signal'

const debug = !!0

const app = fastify()
app.post('/send', (req, res) => {
  debug && console.log('📤 POST /send:', JSON.stringify(req.body))
  const { to, message, toGroup } = req.body as { to?: string; message?: string; toGroup?: string }

  // Is it ready to send out?
  if (to) {
    let command = `${signal} --dbus send -m "${message}" ${toGroup ? `-g ${toGroup}` : to}`
    if (!debug) command += ' 2> /dev/null'
    execSync(command)
    res.send('OK')
  } else {
    console.error('❌ missing to:', req.body)
    res.status(400).send('Bad request, missing `to` field')
  }
})

app.listen({ port: 9460 }, () => console.log('🟢 Signal sending server listening on port 9460'))
