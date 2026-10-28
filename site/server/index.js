// Local / self-hosted server: serves the chat API and (after `npm run build`) the built site.
// Run with: node --env-file=.env server/index.js   (Vercel uses api/chat.js instead)
import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { handleChat } from './chat-core.js'

const PORT = Number(process.env.PORT) || 8787
if (!process.env.GROQ_API_KEYS) console.warn('GROQ_API_KEYS is empty: /api/chat will return 503')

const app = express()
app.disable('x-powered-by')
app.use(express.json({ limit: '16kb' }))

app.post('/api/chat', async (req, res) => {
  const { status, body } = await handleChat(req.body, req.ip)
  res.status(status).json(body)
})

const dist = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist')
app.use(express.static(dist))
app.use((req, res) => {
  if (req.method !== 'GET' || req.path.startsWith('/api/')) return res.status(404).end()
  res.sendFile(path.join(dist, 'index.html'), (err) => err && res.status(404).end())
})

app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`))
