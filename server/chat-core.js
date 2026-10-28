// Chat logic shared by the local Express server (server/index.js) and the Vercel function (api/chat.js).
// The Groq keys come from GROQ_API_KEYS (server-side env var) and never reach the browser.
import { SYSTEM_PROMPT, SCOPE_REMINDER } from './knowledge.js'

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
const ATTEMPT_TIMEOUT_MS = 9_000
const TOTAL_BUDGET_MS = 24_000 // stay under the serverless function time limit (maxDuration 30s)

// Read on every call so changing env vars never needs a code change.
const keys = () => (process.env.GROQ_API_KEYS || '').split(',').map((k) => k.trim()).filter(Boolean)
// Rate limits are per model, so a second model gives headroom when the first is busy.
const models = () =>
  [process.env.GROQ_MODEL || 'openai/gpt-oss-120b', process.env.GROQ_FALLBACK_MODEL || 'openai/gpt-oss-20b'].filter((m, i, a) => m && a.indexOf(m) === i)
// gpt-oss models spend tokens on reasoning first; keep it short for quick chat replies.
const extra = (m) => (m.startsWith('openai/gpt-oss') ? { reasoning_effort: 'low' } : {})

// Best-effort per-IP limit (20 / minute). On serverless each instance keeps its own counter,
// so this is a speed bump, not a guarantee; Groq's own limits are the hard stop.
const hits = new Map()
function limited(ip) {
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter((t) => now - t < 60_000)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) hits.clear()
  return recent.length > 20
}

let next = 0
async function askGroq(messages) {
  const K = keys()
  const started = Date.now()
  let lastStatus = 0
  // Each model gets one pass over every key, so one flaky response never reaches the visitor.
  for (const model of models()) {
    for (let i = 0; i < K.length; i++) {
      if (Date.now() - started > TOTAL_BUDGET_MS) break
      const key = K[(next + i) % K.length]
      const r = await fetch(GROQ_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
        body: JSON.stringify({ model, messages, temperature: 0.4, max_tokens: 500, ...extra(model) }),
        signal: AbortSignal.timeout(ATTEMPT_TIMEOUT_MS),
      }).catch(() => null)
      if (r?.ok) {
        const reply = (await r.json().catch(() => null))?.choices?.[0]?.message?.content?.trim()
        if (reply) {
          next = (next + i + 1) % K.length
          return reply
        }
        lastStatus = 'empty reply'
        continue
      }
      lastStatus = r?.status || 'no response'
      console.warn(`groq ${model} key ${((next + i) % K.length) + 1} failed: ${lastStatus}`)
    }
  }
  const err = new Error(`upstream ${lastStatus}`)
  err.busy = lastStatus === 429
  throw err
}

/** @returns {Promise<{status: number, body: object}>} */
export async function handleChat(payload, ip = 'unknown') {
  if (!keys().length) return { status: 503, body: { error: 'Chat is not configured.' } }
  if (limited(ip)) return { status: 429, body: { error: 'Too many messages. Please wait a moment.' } }

  const history = Array.isArray(payload?.messages) ? payload.messages : []
  const messages = history
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .slice(-12)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 800) }))
  if (!messages.length || messages[messages.length - 1].role !== 'user') {
    return { status: 400, body: { error: 'Invalid request.' } }
  }

  try {
    const reply = await askGroq([{ role: 'system', content: SYSTEM_PROMPT }, ...messages, { role: 'system', content: SCOPE_REMINDER }])
    return { status: 200, body: { reply } }
  } catch (e) {
    console.error('chat failed:', e.message)
    if (e.busy) {
      return { status: 503, body: { error: 'I am receiving a lot of questions right now. Please try again in a few seconds, or call +91 90876 74688.' } }
    }
    return { status: 502, body: { error: 'The assistant is unavailable right now. Please call +91 90876 74688 or email saiconsultancy0009@gmail.com.' } }
  }
}
