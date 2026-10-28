// Vercel serverless function: POST /api/chat
// Set GROQ_API_KEYS (and optionally GROQ_MODEL / GROQ_FALLBACK_MODEL) in Vercel > Settings > Environment Variables.
import { handleChat } from '../server/chat-core.js'

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed.' })
  }
  const ip = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim()
  const { status, body } = await handleChat(req.body, ip)
  return res.status(status).json(body)
}
