import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Icon from '../components/Icon.jsx'
import Illo from '../components/Illo.jsx'
import { Messages, useChat } from '../components/chat.jsx'
import { PageHero, Reveal, Bezel, EASE, stagger, rise } from '../components/ui.jsx'
import { CONTACT } from '../data.js'

const TOPICS = [
  ['target', 'Training programs', 'What programs do you offer?'],
  ['building', 'Campus outreach & admissions', 'Tell me about campus outreach and admission support.'],
  ['briefcase', 'Industry trainers', 'Do you provide industry trainers from MNC companies?'],
  ['award', 'Placements & job fairs', 'How do you help with placements and job fairs?'],
  ['users', 'For job seekers', 'How do you help job seekers and students get placement-ready?'],
  ['phone', 'Contact & next steps', 'How can I contact you and get started?'],
]

export default function Assistant() {
  const { msgs, busy, send, reset } = useChat()
  const [text, setText] = useState('')
  const bodyRef = useRef(null)
  const inputRef = useRef(null)

  // Scroll only the chat window, never the whole page.
  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [msgs, busy])

  const submit = async (e) => {
    e.preventDefault()
    const v = text
    setText('')
    await send(v)
    inputRef.current?.focus()
  }

  return (
    <div className="assist-page">
      <PageHero eyebrow="AI assistant" title="Ask anything about SAI Consultancy." accent={['Ask']} sub="Programs, campus outreach and admissions, industry trainers, placements. Get an instant answer, any time." />

      <section className="section tight">
        <div className="container assist-grid">
          <aside className="assist-side">
            <Reveal>
              <h3 className="assist-h">Popular topics</h3>
              <motion.div className="topics" variants={stagger(0.06)} initial="hidden" animate="show">
                {TOPICS.map(([ic, label, q]) => (
                  <motion.button key={label} className="topic" variants={rise} onClick={() => send(q)} disabled={busy}>
                    <Illo name={ic} className="sm" />
                    <span>{label}</span>
                    <Icon name="chevR" size={18} className="topic-go" />
                  </motion.button>
                ))}
              </motion.div>
            </Reveal>
            <Reveal delay={0.15}>
              <Bezel className="info-card assist-contact">
                <Illo name="phone" />
                <h4>Prefer to talk to a person?</h4>
                <p>Call <a className="link" href={`tel:${CONTACT.phone}`}>{CONTACT.phoneLabel}</a><br />or email <a className="link" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></p>
              </Bezel>
            </Reveal>
          </aside>

          <motion.div className="assist-chat" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}>
            <header className="chat-head">
              <span className="chat-avatar"><img src="/images/logo-mark.png" alt="" width="18" height="21" /></span>
              <div><b>SAI Assistant</b><small><i /> Online</small></div>
              <button onClick={reset} disabled={busy || msgs.length === 1} aria-label="Start a new chat" title="New chat">New chat</button>
            </header>

            <div className="chat-body" ref={bodyRef} aria-live="polite">
              <Messages msgs={msgs} busy={busy} />
            </div>

            <form className="chat-input" onSubmit={submit}>
              <input ref={inputRef} value={text} onChange={(e) => setText(e.target.value)} placeholder="Type your question…" maxLength={500} aria-label="Message" />
              <button disabled={busy || !text.trim()} aria-label="Send"><Icon name="arrow" size={18} /></button>
            </form>
            <p className="assist-note">I only answer questions about SAI Consultancy. For fees, dates and specific batches, please contact us.</p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
