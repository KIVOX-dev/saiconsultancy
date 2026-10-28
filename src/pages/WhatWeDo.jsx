import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from '../components/ui/Icon.jsx'
import Illo from '../components/ui/Illo.jsx'
import Marquee from '../components/ui/Marquee.jsx'
import Outreach from '../components/sections/Outreach.jsx'
import { PageHero, SectionHead, Reveal, Bezel, Button, EASE } from '../components/ui/primitives.jsx'
import { WHAT_WE_DO, PROGRAM_ICONS, OUR_SERVICES } from '../data/site.js'

function Program({ n, data, open, onToggle }) {
  const [title, desc, pts] = data
  return (
    <Reveal>
      <Bezel className={`prog ${open ? 'open' : ''}`}>
        <button className="prog-head" onClick={onToggle} aria-expanded={open}>
          <span className="prog-num">{String(n + 1).padStart(2, '0')}</span>
          <Illo name={PROGRAM_ICONS[n]} />
          <span className="prog-title"><b>{title}</b><small>{desc}</small></span>
          <motion.i className="prog-toggle" animate={{ rotate: open ? 0 : 45 }} transition={{ duration: 0.5, ease: EASE }}><Icon name="close" size={18} /></motion.i>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              className="prog-panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <ul className="ticks cols">{pts.map((p) => <li key={p}>{p}</li>)}</ul>
            </motion.div>
          )}
        </AnimatePresence>
      </Bezel>
    </Reveal>
  )
}

export default function WhatWeDo() {
  const [open, setOpen] = useState(0)
  return (
    <>
      <PageHero eyebrow="What we do" title="NEP-aligned programs for placement readiness." accent={['placement', 'readiness.']} sub="We deliver structured training that builds employability, confidence, and workplace readiness. Start with our campus outreach service, then explore the ten programs." />

      <Outreach standalone />

      <section className="section tight">
        <div className="container narrow-wide">
          <div className="prog-list">
            {WHAT_WE_DO.map((d, n) => <Program key={d[0]} n={n} data={d} open={open === n} onToggle={() => setOpen(open === n ? -1 : n)} />)}
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="container">
          <SectionHead eyebrow="Our services" title="Programs and initiatives for colleges, students and partners." accent={['colleges,']} center />
        </div>
        <div className="chip-rows">
          <Marquee>{OUR_SERVICES.slice(0, 8).map((s) => <span className="pill" key={s}>{s}</span>)}</Marquee>
          <Marquee reverse>{OUR_SERVICES.slice(8).map((s) => <span className="pill" key={s}>{s}</span>)}</Marquee>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="split-copy">
            <SectionHead eyebrow="Placement support" title="Job fairs & placement assistance." accent={['placement', 'assistance.']} />
            <Reveal><p>We provide placement assistance to students trained through our programs, ensuring learning outcomes translate into real employment. We also organize job fairs for partner colleges, connecting industry-ready students directly with recruiters for interviews, evaluations, and on-the-spot hiring.</p></Reveal>
            <Reveal delay={0.1}><Button to="/contact">Plan a job fair</Button></Reveal>
          </div>
          <Reveal delay={0.1}>
            <Bezel className="info-card dark" coreClass="core-navy">
              <h4>Our corporate network lets us</h4>
              <ul className="ticks">
                <li>Invite relevant companies based on student skill profiles</li>
                <li>Align job fair roles with training completed by students</li>
                <li>Support colleges with end-to-end coordination and execution</li>
                <li>Ensure students receive real interview exposure and hiring opportunities</li>
              </ul>
            </Bezel>
          </Reveal>
        </div>
      </section>
    </>
  )
}
