import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from '../ui/Icon.jsx'
import Illo from '../ui/Illo.jsx'
import { EASE } from '../ui/primitives.jsx'
import { Messages, useChat } from './useChat.jsx'
import { Link, useLocation } from 'react-router-dom'

const SUGGESTIONS = ['What programs do you offer?', 'How do you help with placements?', 'How can I contact you?']

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const { msgs, busy, send } = useChat()
  const [text, setText] = useState('')
  const { pathname } = useLocation()
  const [tip, setTip] = useState(false)
  const endRef = useRef(null)
  const inputRef = useRef(null)

  // Nudge once per session: show after a few seconds, hide on its own, never again once dismissed.
  useEffect(() => {
    let seen = false
    try { seen = sessionStorage.getItem('sai-tip') === '1' } catch { /* storage unavailable */ }
    if (seen) return
    const show = setTimeout(() => setTip(true), 4000)
    const hide = setTimeout(() => setTip(false), 22000)
    return () => { clearTimeout(show); clearTimeout(hide) }
  }, [])
  const dismissTip = () => {
    setTip(false)
    try { sessionStorage.setItem('sai-tip', '1') } catch { /* storage unavailable */ }
  }

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [msgs, busy, open])
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 400)
  }, [open])

  const submit = async (e) => {
    e.preventDefault()
    const v = text
    setText('')
    await send(v)
  }

  // The full assistant page replaces the floating chat.
  if (pathname === '/assistant') return null

  return (
    <div className="chat">
      <AnimatePresence>
        {tip && !open && (
          <motion.div
            className="chat-tip"
            initial={{ opacity: 0, y: 14, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <button className="chat-tip-body" onClick={() => { dismissTip(); setOpen(true) }}>
              <b>Need assistance?</b>
              <small>Ask us about programs, admissions &amp; placements</small>
            </button>
            <button className="chat-tip-x" onClick={dismissTip} aria-label="Dismiss"><Icon name="close" size={14} /></button>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {open && (
          <motion.section
            className="chat-panel"
            role="dialog"
            aria-label="Chat with SAI Consultancy"
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <header className="chat-head">
              <span className="chat-avatar"><img src="/images/logo-mark.png" alt="" width="18" height="21" /></span>
              <div><b>SAI Assistant</b><small><i /> Online</small></div>
              <Link to="/assistant" className="chat-expand" onClick={() => setOpen(false)} aria-label="Open the full assistant page" title="Open full page"><Icon name="arrow" size={16} /></Link>
              <button onClick={() => setOpen(false)} aria-label="Close chat"><Icon name="close" size={18} /></button>
            </header>

            <div className="chat-body" aria-live="polite">
              <Messages msgs={msgs} busy={busy} />
              {msgs.length === 1 && (
                <div className="chat-chips">
                  {SUGGESTIONS.map((s) => <button key={s} onClick={() => send(s)}>{s}</button>)}
                </div>
              )}
              <div ref={endRef} />
            </div>

            <form className="chat-input" onSubmit={submit}>
              <input ref={inputRef} value={text} onChange={(e) => setText(e.target.value)} placeholder="Type your question…" maxLength={500} aria-label="Message" />
              <button disabled={busy || !text.trim()} aria-label="Send"><Icon name="arrow" size={18} /></button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      <motion.button
        className={`chat-fab ${open ? 'is-open' : ''}`}
        onClick={() => { dismissTip(); setOpen(!open) }}
        aria-label={open ? 'Close chat' : 'Open chat'}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: 'spring', stiffness: 260, damping: 18 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={open ? 'x' : 'c'} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.3, ease: EASE }}>
            {open ? <Icon name="close" size={24} /> : <Illo name="assistant" size={44} />}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
