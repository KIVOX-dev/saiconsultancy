import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Icon from '../components/ui/Icon.jsx'
import Illo from '../components/ui/Illo.jsx'
import { PageHero, Reveal, Bezel, Button } from '../components/ui/primitives.jsx'
import { CONTACT } from '../data/site.js'

export default function Contact() {
  const [params] = useSearchParams()
  const phone = params.get('phone')
  const [f, setF] = useState({ name: '', email: '', message: phone ? `Please call me on ${phone}.` : '' })
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })

  const [state, setState] = useState('idle') // idle | sending | sent | error
  const [err, setErr] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setState('sending')
    try {
      const r = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(f) })
      const d = await r.json().catch(() => ({}))
      if (!r.ok) throw new Error(d.error || 'Something went wrong.')
      setState('sent')
      setF({ name: '', email: '', message: '' })
    } catch (x) {
      setErr(x.message)
      setState('error')
    }
  }

  return (
    <>
      <PageHero eyebrow="Contact" title="Let's start a conversation." accent={['conversation.']} sub="Complete the form and our consultants will be in touch shortly." />
      <section className="section tight">
        <div className="container contact-grid">
          <div className="contact-side">
            <Reveal>
              <Bezel className="info-card"><Illo name="phone" /><h4>Our consultant</h4><a className="big-link" href={`tel:${CONTACT.phone}`}>{CONTACT.phoneLabel}</a></Bezel>
            </Reveal>
            <Reveal delay={0.1}>
              <Bezel className="info-card"><Illo name="mail" /><h4>Contact us by e-mail</h4><a className="big-link" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></Bezel>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Bezel className="form-card">
              <form className="form" onSubmit={submit}>
                <label>Your name<input required value={f.name} onChange={set('name')} /></label>
                <label>Your email<input required type="email" value={f.email} onChange={set('email')} /></label>
                <label>Message<textarea required rows="5" value={f.message} onChange={set('message')} /></label>
                <input type="text" name="website" tabIndex="-1" autoComplete="off" value={f.website || ''} onChange={set('website')} style={{ display: 'none' }} aria-hidden="true" />
                <Button>{state === 'sending' ? 'Sending...' : 'Send message'}</Button>
                {state === 'sent' && <p role="status">Thank you! Your message has been sent. We will be in touch shortly.</p>}
                {state === 'error' && <p role="alert">{err} You can also email {CONTACT.email}.</p>}
              </form>
            </Bezel>
          </Reveal>
        </div>
      </section>
    </>
  )
}
