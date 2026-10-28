import { motion } from 'framer-motion'
import Icon from '../ui/Icon.jsx'
import Illo from '../ui/Illo.jsx'
import { Button, Eyebrow, Reveal, SplitHeading, EASE, stagger, rise } from '../ui/primitives.jsx'

const OFFERINGS = [
  ['building', 'School & junior-college visits', 'On-site sessions that introduce your institution, courses and career outcomes to prospective students.'],
  ['chat', 'Admission counselling', 'One-to-one and group counselling that helps students and parents choose the right course with confidence.'],
  ['layers', 'Application support', 'Guidance on forms, documents and deadlines, so no interested student drops out of the process.'],
  ['users', 'Campus open days & fairs', 'Planning and running open days, education fairs and campus tours that put your college in front of families.'],
  ['spark', 'Parent & student orientation', 'Clear information on programs, placement support and life on campus, delivered in the local language.'],
  ['target', 'Enquiry follow-up', 'Structured follow-up on every enquiry through calls and digital outreach until a decision is made.'],
]

const FLOW = [['building', 'Reach', 'Visit schools and communities to introduce your institution and courses.'], ['chat', 'Counsel', 'Guide students and parents to the right course, in their own language.'], ['award', 'Admit', 'Support applications and documents through to enrolment.'], ['check', 'Enrolled', 'The right students join your college, ready to learn.']]

/** Campus outreach & admission support: a core SAI service. */
export default function Outreach({ standalone = false }) {
  return (
    <section className="section outreach" id="outreach">
      <div className="container">
        <div className="outreach-top">
          <div>
            <Reveal y={16}><Eyebrow>Core service · Campus outreach</Eyebrow></Reveal>
            <SplitHeading as="h2" text="Admission support that fills seats with students who belong." accent={['belong.']} className="h2" />
            <Reveal delay={0.2}>
              <p className="sub">We take your college to the students: school visits, counselling and application support, so more of the right students find you, choose you and enrol.</p>
            </Reveal>
            <Reveal delay={0.3} className="outreach-cta">
              <Button to="/contact">Plan an outreach drive</Button>
              {!standalone && <Button to="/what-we-do#outreach" variant="ghost" icon="chevR">How it works</Button>}
            </Reveal>
          </div>

          <motion.div className="outreach-photos" variants={stagger(0.12)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
            <motion.figure variants={rise} className="op-a"><img src="/images/gallery/session/gallery-017.jpeg" alt="SAI Consultancy session with students in a classroom" loading="lazy" /></motion.figure>
            <motion.figure variants={rise} className="op-b"><img src="/images/gallery/collabration/gallery-018.jpeg" alt="SAI Consultancy group photo outside a college campus building" loading="lazy" /></motion.figure>
            <motion.figure variants={rise} className="op-c"><img src="/images/gallery/collabration/gallery-005.jpeg" alt="Large group of students and staff at a SAI Consultancy campus program" loading="lazy" /></motion.figure>
          </motion.div>
        </div>

        <div className="flow-band">
          <span className="band-label">How it works</span>
        <div className="flow" aria-label="Outreach flow">
          {FLOW.map(([ic, t, d], i) => (
            <motion.div key={t} className="flow-card" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.8, ease: EASE, delay: i * 0.18 }}>
              <span className={`flow-dot ${i === FLOW.length - 1 ? 'goal' : ''}`}>{i === FLOW.length - 1 ? <Icon name="check" size={24} strokeWidth={2.2} /> : i + 1}</span>
              <h4>{t}</h4>
              <p>{d}</p>
              {i < FLOW.length - 1 && (
                <motion.span
                  className="flow-conn"
                  initial={{ opacity: 0, scaleX: 0.15 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.5 + i * 0.3 }}
                  aria-hidden="true"
                >
                  <i className="conn-line" />
                  <svg className="conn-head" viewBox="0 0 10 14" fill="none"><path d="M1.5 1.5 8 7l-6.5 5.5" /></svg>
                </motion.span>
              )}
            </motion.div>
          ))}
        </div>
        </div>

        <span className="band-label dark-label">What is included</span>
        <motion.div className="cells c3" variants={stagger(0.07)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
          {OFFERINGS.map(([ic, t, d]) => (
            <motion.div key={t} className="cell hover" variants={rise}>
              <Illo name={ic} />
              <h4>{t}</h4>
              <p>{d}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
