import { execSync } from 'child_process'
import fastify from 'fastify'
import { signal } from './path-to-signal'

const debug = !!0

const app = fastify()
app.post('/send', (req, res) => {
  console.log('signal-http received POST /send:', JSON.stringify(req.body))
  const { to, message } = req.body as { to?: string; message?: string }
  if (to) {
    let command = `${signal} --dbus send -m "${message}" ${to}`
    if (!debug) command += ' 2> /dev/null'
    execSync(command)
    res.send('OK')
  } else {
    res.status(400).send('Bad request, missing `to` field')
  }
})

app.listen({ port: 9460 }, () => console.log('🟢 Signal sending server listening on port 9460'))
