// Chat pieces shared by the floating widget and the full /assistant page.
import { useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { EASE } from './ui.jsx'

export const GREETING = "Hi! I'm the SAI Consultancy assistant. Ask me about our programs, placement support or how to get in touch."

const BULLET = /^\s*(?:[-*•]|\d+[.)])\s+(.*)$/

// Inline **bold** only; everything else is rendered as plain text (never as HTML).
function inline(s) {
  return s.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') && part.length > 4 ? <strong key={i}>{part.slice(2, -2)}</strong> : part
  )
}

/** Turns the model's plain-text reply into paragraphs and bullet lists. */
export function Rich({ text }) {
  const out = []
  let para = []
  let list = []
  const flushPara = () => { if (para.length) out.push(<p key={out.length}>{inline(para.join(' '))}</p>); para = [] }
  const flushList = () => { if (list.length) out.push(<ul key={out.length}>{list.map((x, i) => <li key={i}>{inline(x)}</li>)}</ul>); list = [] }
  for (const raw of text.replace(/\r/g, '').split('\n')) {
    const line = raw.replace(/^#+\s*/, '')
    const m = line.match(BULLET)
    if (m) { flushPara(); list.push(m[1]) }
    else if (!line.trim()) { flushPara(); flushList() }
    else { flushList(); para.push(line.trim()) }
  }
  flushPara(); flushList()
  return <>{out}</>
}

/** Conversation state + the call to /api/chat. */
export function useChat() {
  const [msgs, setMsgs] = useState([{ role: 'assistant', content: GREETING }])
  const [busy, setBusy] = useState(false)

  const send = useCallback(async (raw) => {
    const content = raw.trim()
    if (!content || busy) return false
    const next = [...msgs, { role: 'user', content }]
    setMsgs(next)
    setBusy(true)
    try {
      const r = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Skip the canned greeting; the server adds its own system prompt.
        body: JSON.stringify({ messages: next.slice(1) }),
      })
      const data = await r.json().catch(() => ({}))
      setMsgs([...next, { role: 'assistant', content: r.ok ? data.reply : data.error || 'Something went wrong. Please try again.' }])
    } catch {
      setMsgs([...next, { role: 'assistant', content: "I couldn't reach the server. Please call +91 90876 74688." }])
    } finally {
      setBusy(false)
    }
    return true
  }, [msgs, busy])

  const reset = useCallback(() => { if (!busy) setMsgs([{ role: 'assistant', content: GREETING }]) }, [busy])

  return { msgs, busy, send, reset }
}

export function Messages({ msgs, busy }) {
  return (
    <>
      {msgs.map((m, i) => (
        <motion.div key={i} className={`msg ${m.role}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: EASE }}>
          {m.role === 'assistant' ? <Rich text={m.content} /> : m.content}
        </motion.div>
      ))}
      {busy && <div className="msg assistant typing" aria-label="Typing"><i /><i /><i /></div>}
    </>
  )
}
