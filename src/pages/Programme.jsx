import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Illo from '../components/ui/Illo.jsx'
import { PageHero, SectionHead, Reveal, Bezel, Button, EASE, stagger, rise } from '../components/ui/primitives.jsx'
import { CONTACT } from '../data/site.js'
import * as P from '../data/programme.js'

const Grid = ({ cls = 'c3', children }) => (
  <motion.div className={`cells ${cls}`} variants={stagger(0.06)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
    {children}
  </motion.div>
)
const Cell = ({ no, title, children }) => (
  <motion.div className="cell hover" variants={rise}>
    {no && <span className="no">{no}</span>}
    <h4>{title}</h4>
    <p>{children}</p>
  </motion.div>
)

function ModuleTable({ head, rows, extra }) {
  return (
    <Reveal>
      <div className="mod-wrap">
        <table className="mod-table">
          <thead><tr><th>#</th><th>Module</th><th>What students learn</th>{extra && <th>{extra}</th>}</tr></thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r[0]}>
                <td>{i + 1}</td><td><b>{r[0]}</b></td><td>{r[1]}</td>{extra && <td>{r[2]}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>
  )
}


/** Live roadmap: the line fills as you scroll and each stage lights up when reached. */
function LiveRoadmap({ items, label = 'STAGE' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 })
  return (
    <div className="evo" ref={ref}>
      <div className="evo-track" aria-hidden="true"><motion.i className="evo-fill" style={{ scaleY: fill }} /></div>
      {items.map(([t, d, out], i) => {
        const last = i === items.length - 1
        return (
          <motion.div
            key={t}
            className={`evo-item ${i % 2 ? 'right' : 'left'}`}
            initial={{ opacity: 0, x: i % 2 ? 48 : -48, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: false, margin: '-35% 0px -35% 0px' }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <span className={`evo-dot ${last ? 'goal' : ''}`}><b>{i + 1}</b></span>
            <div className="evo-card">
              <span className="no">{label} {i + 1}</span>
              <h4>{t}</h4>
              <p>{d}</p>
              {out && <p className="evo-out">Output: {out}</p>}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

export default function Programme() {
  return (
    <>
      <PageHero eyebrow="Training & Placement Programme · 2026-27" title="A three-year campus-to-corporate programme for your institution." accent={['campus-to-corporate', 'programme']} sub="For colleges, universities and educational institutions. Two decades of campus training, trainers who work in industry today, our own learning platforms and a network of 1,000+ HRs and 100+ CHROs & CXOs." />

      {/* About / evolution */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="About Sai Consultancy · 20+ years" title="From classroom training to a complete campus-to-corporate ecosystem." accent={['campus-to-corporate']} sub="What began as classroom training in communication and aptitude has grown into trainers from industry, our own learning platforms, placement support and a forum of HR leaders who tell us what employers expect." />
          <Grid cls="c5">
            {P.STATS.map(([n, l]) => <Cell key={l} title={n}>{l}</Cell>)}
          </Grid>
          <span className="band-label">How we have evolved</span>
          <LiveRoadmap items={P.STAGES} />
          <Reveal className="center narrow"><p className="sub">Every trainer and every HR who comes to your campus is a working professional. Students learn from people who hire, manage and work in the roles they are preparing for.</p></Reveal>
        </div>
      </section>

      {/* Three-year pathway */}
      <section className="section band">
        <div className="container">
          <SectionHead eyebrow="Why communication, then aptitude, then soft skills" title="Each year prepares the ground for the next." accent={['ground']} center />
          <Grid cls="c3">
            {P.YEARS.map(([y, t, d]) => <Cell key={y} no={y.toUpperCase()} title={t}>{d}</Cell>)}
          </Grid>
        </div>
      </section>

      {/* Vision, mission, values, gap */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Vision, mission & framework" title="What drives us, why it matters, how we work." accent={['drives']} />
          <div className="grid-3">
            <Reveal><Bezel className="info-card"><Illo name="compass" /><h4>Vision</h4><p>{P.VISION}</p></Bezel></Reveal>
            <Reveal delay={0.1}><Bezel className="info-card"><Illo name="target" /><h4>Mission</h4><p>{P.MISSION}</p></Bezel></Reveal>
            <Reveal delay={0.2}>
              <Bezel className="info-card dark" coreClass="core-navy">
                <h4>The employability gap · {P.GAP.stat}</h4>
                <p>{P.GAP.text}</p>
              </Bezel>
            </Reveal>
          </div>
          <span className="band-label">Our values</span>
          <Grid cls="c4">
            {P.VALUES.map(([t, d]) => <Cell key={t} title={t}>{d}</Cell>)}
          </Grid>
          <span className="band-label">Our 9-step integrated employability framework</span>
          <LiveRoadmap items={P.FRAMEWORK} label="STEP" />
        </div>
      </section>

      {/* Modules */}
      <section className="section band" id="modules">
        <div className="container">
          <SectionHead eyebrow="Year I · Communicative English with Verbal Aptitude" title="Built on listening, speaking, reading and writing." accent={['listening,']} sub="The four-skills framework (LSRW), with a dedicated verbal aptitude track." />
          <span className="band-label">Part A · Communicative English (LSRW) · 7 modules</span>
          <ModuleTable rows={P.YEAR1_A} />
          <span className="band-label">Part B · Verbal Aptitude · 4 modules</span>
          <ModuleTable rows={P.YEAR1_B} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Year II · Aptitude training · 8 modules" title="The speed and accuracy recruiter rounds screen for." accent={['speed']} />
          <ModuleTable rows={P.YEAR2} />
        </div>
      </section>

      <section className="section band">
        <div className="container">
          <SectionHead eyebrow="Year III · Soft skills & placement readiness · 8 modules" title="Working HRs lead interview practice, shaped by department, cluster and company." accent={['interview', 'practice,']} />
          <ModuleTable rows={P.YEAR3} extra="Department / cluster-specific focus" />
          <Reveal><p className="sub">Note: all modules in this proposal can be discussed and reframed according to the college's needs.</p></Reveal>
        </div>
      </section>

      {/* Clusters */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Department-specific · 6 clusters" title="Industry-integrated programmes for every stream." accent={['stream.']} sub="Alongside the common track, each stream gets modules linked to the roles its students apply for, taught by professionals from that field." />
          <Reveal>
            <div className="mod-wrap">
              <table className="mod-table">
                <thead><tr><th>Cluster</th><th>Typical programmes</th><th>Industry-integrated modules</th></tr></thead>
                <tbody>{P.CLUSTERS.map(([c, p, m]) => <tr key={c}><td><b>{c}</b></td><td>{p}</td><td>{m}</td></tr>)}</tbody>
              </table>
            </div>
          </Reveal>
          <span className="band-label">Value-added engagements</span>
          <p className="sub">Through our HR and industry network, planned around the college's preferences and calendar:</p>
          <Grid cls="c3">
            {P.VALUE_ADDED.map(([t, d]) => <Cell key={t} title={t}>{d}</Cell>)}
          </Grid>
        </div>
      </section>

      {/* Delivery, assessment, reporting */}
      <section className="section band">
        <div className="container">
          <SectionHead eyebrow="Delivery, assessment & reporting" title="Blended delivery, measured and reported." accent={['measured']} sub="Trainers on campus, practice on our platforms between sessions, and industry exposure through HR and leadership interactions." />
          <span className="band-label">Delivery model</span>
          <Grid cls="c4">
            {P.DELIVERY.map(([t, d]) => <Cell key={t} title={t}>{d}</Cell>)}
          </Grid>
          <span className="band-label">Assessment framework · 7 assessment types</span>
          <Grid cls="c4">
            {P.ASSESSMENTS.map(([t, d], i) => <Cell key={t} no={String(i + 1).padStart(2, '0')} title={t}>{d}</Cell>)}
          </Grid>
          <span className="band-label">Readiness bands</span>
          <Grid cls="c3">
            {P.BANDS.map(([t, d]) => <Cell key={t} title={t}>{d}</Cell>)}
          </Grid>
          <span className="band-label">Reporting to the institution</span>
          <Reveal><Bezel className="info-card"><ul className="ticks cols">{P.REPORTING.map((r) => <li key={r}>{r}</li>)}</ul></Bezel></Reveal>
        </div>
      </section>

      {/* Platforms */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Our platforms" title="TalentSnaps and GoodFreshers." accent={['TalentSnaps', 'GoodFreshers.']} />
          <div className="grid-3" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <Reveal>
              <Bezel className="info-card">
                <img className="plat-logo ts" src="/images/platforms/talentsnaps.png" alt="TalentSnaps: skill meets opportunities" loading="lazy" />
                <h4>TalentSnaps · Aptitude training & placement-management ERP</h4>
                <p>{P.TALENTSNAPS.intro}</p>
                <p><b>Placement workflow:</b> {P.TALENTSNAPS.workflow.join(' → ')}</p>
                <ul className="ticks">{P.TALENTSNAPS.features.map((f) => <li key={f}>{f}</li>)}</ul>
              </Bezel>
            </Reveal>
            <Reveal delay={0.1}>
              <Bezel className="info-card">
                <img className="plat-logo" src="/images/platforms/goodfreshers.png" alt="GoodFreshers" loading="lazy" />
                <h4>GoodFreshers · Communication, soft skills & hiring</h4>
                <p>{P.GOODFRESHERS.intro}</p>
                <ul className="ticks">{P.GOODFRESHERS.features.map((f) => <li key={f}>{f}</li>)}</ul>
              </Bezel>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Placement & engagement */}
      <section className="section band">
        <div className="container">
          <SectionHead eyebrow="Placement & engagement models" title="How we connect students to employers." accent={['employers.']} sub="Training leads to placement only when students meet the right employers. Our placement support brings those employers to campus and keeps every step on record." />
          <Reveal><Bezel className="info-card"><ul className="ticks cols">{P.PLACEMENT_SUPPORT.map((r) => <li key={r}>{r}</li>)}</ul></Bezel></Reveal>
          <span className="band-label">Engagement models · three further ways to partner</span>
          <div className="grid-3">
            {P.ENGAGEMENT.map(([t, pts], i) => (
              <Reveal key={t} delay={i * 0.1}><Bezel className="info-card"><h4>{t}</h4><ul className="ticks">{pts.map((p) => <li key={p}>{p}</li>)}</ul></Bezel></Reveal>
            ))}
          </div>
          <span className="band-label">How we partner with an institution</span>
          <Grid cls="c5">
            {P.PARTNER_STEPS.map(([t, d], i) => <Cell key={t} no={`${i + 1}`} title={t}>{d}</Cell>)}
          </Grid>
        </div>
      </section>

      {/* Value */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="The value we bring to your institution" title="From strong basics to placement-ready graduates." accent={['placement-ready']} sub="Trained by working professionals, aligned with 1,000+ HRs and 100+ CHROs & CXOs, supported by our own platforms." />
          <Grid cls="c4">
            {P.VALUE.map(([t, d], i) => <Cell key={t} no={String(i + 1).padStart(2, '0')} title={t}>{d}</Cell>)}
          </Grid>
        </div>
      </section>

      {/* HR network, workplace, clientele */}
      <section className="section band">
        <div className="container">
          <SectionHead eyebrow="Our HR network & yearly HR Conclave" title="Training that stays in step with what HRs look for." accent={['HRs']} sub={P.HR_NETWORK.text} />
          <Reveal><Bezel className="info-card"><ul className="ticks cols">{P.HR_NETWORK.points.map((r) => <li key={r}>{r}</li>)}</ul></Bezel></Reveal>
          <span className="band-label">Workplace excellence recognition</span>
          <Reveal><Bezel className="info-card"><p>{P.WORKPLACE.text}</p><ul className="ticks cols">{P.WORKPLACE.points.map((r) => <li key={r}>{r}</li>)}</ul></Bezel></Reveal>
          <span className="band-label">Our clientele</span>
          <p className="sub">A few of the institutions that trust Sai Consultancy with their students' training and placement, and many more:</p>
          <div className="pill-row">{P.CLIENTELE.map((c) => <span className="pill" key={c}>{c}</span>)}</div>
        </div>
      </section>

      {/* Contact */}
      <section className="section">
        <div className="container">
          <Reveal>
            <Bezel className="info-card dark" coreClass="core-navy">
              <h4>Start a partnership with Sai Consultancy</h4>
              <p>{P.OFFICE.head} · <a href={`tel:${P.OFFICE.phone}`}>{P.OFFICE.phoneLabel}</a></p>
              <p>{P.OFFICE.emails.map((e, i) => <span key={e}>{i > 0 && ' · '}<a href={`mailto:${e}`}>{e}</a></span>)} · <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></p>
              <p>{P.OFFICE.address} · {P.OFFICE.web}</p>
              <Button to="/contact">Request a proposal</Button>
            </Bezel>
          </Reveal>
        </div>
      </section>
    </>
  )
}
