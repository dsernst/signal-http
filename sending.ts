import fastify from 'fastify'

const app = fastify()

app.post('/send', (req, res) => {
  console.log('Received /send:', JSON.stringify(req.body))
  res.send('OK')
})

app.listen({ port: 9460 }, () => {
  console.log('🟢 Signal sending server listening on port 9460')
})
