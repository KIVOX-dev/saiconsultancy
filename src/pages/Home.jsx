import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion'
import Icon from '../components/ui/Icon.jsx'
import Illo from '../components/ui/Illo.jsx'
import Marquee from '../components/ui/Marquee.jsx'
import Outreach from '../components/sections/Outreach.jsx'
import { ReportMock, HexField, GapMock, TrainMock } from '../components/sections/Mocks.jsx'
import { Button, Eyebrow, Reveal, SplitHeading, SectionHead, Counter, EASE, stagger, rise } from '../components/ui/primitives.jsx'
import { PARTNERS, SERVICES, WHAT_WE_DO, PROGRAM_ICONS, GALLERY } from '../data/site.js'

const GALLERY_IMGS = GALLERY.flatMap((g) => g.images)
const MOSAIC = [GALLERY_IMGS[0], GALLERY_IMGS[7], GALLERY_IMGS[10], GALLERY_IMGS[14], GALLERY_IMGS[19], GALLERY_IMGS[4], GALLERY_IMGS[12]]

/* ---------------------------------------------------------------- hero */
function Hero() {
  const [phone, setPhone] = useState('')
  const go = useNavigate()
  return (
    <section className="hero">
      <div className="container">
        <Reveal y={16}><Eyebrow>College-focused training &amp; employability</Eyebrow></Reveal>
        <SplitHeading text="Turn every student into a hiring-ready professional" accent={['hiring-ready']} className="display" delay={0.1} />
        <Reveal delay={0.4}><p className="hero-sub">From classroom to career, without the pressure.</p></Reveal>
        <Reveal delay={0.5}>
          <p className="lede">Structured training, AI-supported mock interviews and real placement exposure, so your students meet recruiters <em>prepared, not pressured.</em></p>
        </Reveal>
        <Reveal delay={0.6}>
          <form className="phone-cta" onSubmit={(e) => { e.preventDefault(); go(`/contact${phone ? `?phone=${encodeURIComponent(phone)}` : ''}`) }}>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Your phone number" aria-label="Phone number" />
            <button className="btn btn-primary"><span>Request a call</span><i className="btn-ico"><Icon name="arrow" size={16} /></i></button>
          </form>
        </Reveal>
        <Reveal delay={0.7} className="hero-points">
          <span><Icon name="mic" size={18} /> Aptitude &amp; interview training</span>
          <span><Icon name="users" size={18} /> Industry trainers from MNCs</span>
          <span><Icon name="building" size={18} /> Job fairs &amp; placement support</span>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- industry trainers */
const TRAINER_POINTS = [
  ['briefcase', 'Real corporate experience', 'Trainers who have worked inside MNC teams teach what the job is actually like.'],
  ['users', 'Workplace behaviour', 'Communication, etiquette and teamwork as practised in large organisations.'],
  ['mic', 'Interview insight', 'Mock interviews and feedback from people who have sat on hiring panels.'],
  ['compass', 'Industry-aligned guidance', 'Domain and career advice that reflects current industry expectations.'],
]

function Trainers() {
  return (
    <section className="section">
      <div className="container">
        <div className="trainers">
          <Reveal x={0}>
            <div className="trainer-photo">
              <img src="/images/gallery/session/gallery-017.jpeg" alt="A trainer-led session with students at a SAI Consultancy campus program" loading="lazy" />
              <span className="photo-chip"><Icon name="users" size={18} /> Trainer-led campus session</span>
            </div>
          </Reveal>
          <div>
            <Reveal y={16}><Eyebrow>Industry trainers</Eyebrow></Reveal>
            <SplitHeading as="h2" text="Learn from trainers who have worked in MNC companies." accent={['MNC', 'companies.']} className="h2" />
            <Reveal delay={0.2}>
              <p className="sub">We bring industry trainers from MNC companies into your campus, so students hear from people who have done the job, not only studied it.</p>
            </Reveal>
            <motion.div className="cells c2" style={{ marginTop: 32 }} variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
              {TRAINER_POINTS.map(([ic, t, d]) => (
                <motion.div key={t} className="cell hover" variants={rise}>
                  <Illo name={ic} className="sm" />
                  <h4 style={{ fontSize: 17 }}>{t}</h4>
                  <p style={{ fontSize: 14.5 }}>{d}</p>
                </motion.div>
              ))}
            </motion.div>
            <Reveal delay={0.3} className="outreach-cta"><Button to="/contact">Book an industry trainer</Button></Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

function Partners() {
  return (
    <section className="partners">
      <p className="partners-label">Programs delivered under recognized national &amp; state skill initiatives</p>
      <Marquee slow>
        {PARTNERS.map(([f, alt]) => <span className="partner" key={f}><img src={`/images/partners/${f}.png`} alt={alt} /></span>)}
      </Marquee>
    </section>
  )
}

/* ---------------------------------------------------------------- problem */
const PAIN = [
  ['target', 'Aptitude anxiety', 'Students freeze on timed reasoning tests they have never practised under pressure.'],
  ['mic', 'Interview nerves', 'Little real practice means first interviews happen with actual recruiters.'],
  ['building', 'No workplace exposure', 'Classrooms rarely show how people behave and communicate at work.'],
  ['compass', 'Generic guidance', 'Advice is one-size-fits-all instead of mapped to each student’s skill gaps.'],
]

function Problem() {
  return (
    <section className="section soft">
      <div className="container">
        <SectionHead eyebrow="The gap" title="Academics move one way. Hiring moves another." accent={['Hiring']} sub="Colleges teach well. But employers hire on skills, behaviour and confidence that classrooms rarely get time to build." />
        <div className="problem">
          <Reveal>
            <div className="solid" style={{ height: '100%' }}>
              <ul>
                <li><span>01</span> Training stops at theory</li>
                <li><span>02</span> Placement prep starts too late</li>
              </ul>
              <p>SAI Consultancy closes the gap, from the first assessment to the final interview.</p>
            </div>
          </Reveal>
          <motion.div className="cells c2" variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
            {PAIN.map(([ic, t, d]) => (
              <motion.div key={t} className="cell hover" variants={rise}>
                <Illo name={ic} />
                <h4>{t}</h4>
                <p>{d}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- solution */
const LEAVES = [['target', 'Aptitude & reasoning'], ['chat', 'Communicative English'], ['code', 'Technical & domain'], ['mic', 'Interview readiness']]

function Solution() {
  return (
    <section className="section">
      <div className="container">
        <SectionHead eyebrow="The solution" title="Leave the training design to us. Watch your placement numbers grow." accent={['placement']} />
        <div className="panels">
          <Reveal>
            <div className="panel">
              <span className="tag">Your college in</span>
              <span className="big-no">01</span>
              <h3>Tell us your departments and your hiring goals</h3>
              <ul className="data-list">
                {['Department & specialisation mapped to roles', 'Industry expectations and target recruiters', 'Student baseline from diagnostic assessments', 'Calendar that fits your academic schedule'].map((x) => (
                  <li key={x}><Icon name="check" size={18} /> {x}</li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="panel dk">
              <span className="tag">Placement-ready out</span>
              <span className="big-no">02</span>
              <h3>Run role-based training and skill validation</h3>
              <div className="skill-tree">
                <div className="src"><small>Every student</small>Skill-mapped programs with continuous practice and measurable progress.</div>
                {LEAVES.map(([ic, l], i) => (
                  <motion.div key={l} className="leaf" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE, delay: 0.2 + i * 0.1 }}>
                    <Icon name={ic} size={18} /> {l}
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- process */
const STEPS = [
  { k: 'Assess', hint: 'Diagnostic assessments and skill-gap mapping', tag: 'Step 1 · Diagnostic', t: 'Find the gaps before they cost a placement', d: 'Diagnostic assessments map each student’s strengths and gaps across aptitude, English, technical and interview skills.', v: <GapMock /> },
  { k: 'Train', hint: 'Workshops, role-plays and continuous practice', tag: 'Step 2 · Structured modules', t: 'Build skills through guided, continuous practice', d: 'Trainer-led workshops, role-plays and progressive assessments on Test Your Metrics, tracked so progress is measurable.', v: <TrainMock /> },
  { k: 'Showcase', hint: 'Placement drives and job fairs', tag: 'Step 3 · Real exposure', t: 'Prove it at placement drives and job fairs', d: 'Campus placement drives and job fairs connect job-ready students directly with recruiters, giving them real interview exposure.', v: 'photo' },
]

// Desktop: the steps pin to the screen while scrolling and advance with scroll progress.
// Mobile: no pinning, so the tabs are click-only.
const PINNED = () => window.matchMedia('(min-width: 961px)').matches

function Process() {
  const [i, setI] = useState(0)
  const track = useRef(null)
  const s = STEPS[i]
  const { scrollYProgress } = useScroll({ target: track, offset: ['start start', 'end end'] })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (!PINNED()) return
    setI(Math.min(STEPS.length - 1, Math.max(0, Math.floor(v * STEPS.length))))
  })

  const pick = (n) => {
    setI(n)
    if (!PINNED() || !track.current) return
    // Scroll to the middle of that step's slice so the scroll handler agrees with the click.
    const top = track.current.getBoundingClientRect().top + window.scrollY
    const span = track.current.offsetHeight - window.innerHeight
    window.scrollTo({ top: top + (span * (n + 0.5)) / STEPS.length, behavior: 'smooth' })
  }

  return (
    <section className="section dark process">
      <div className="container">
        <SectionHead eyebrow="How it works" title="Assess. Train. Showcase." accent={['Showcase.']} sub="A three-step roadmap that takes students from diagnostic to job-fair floor." />
        <div className="process-track" ref={track}>
        <div className="steps">
          <div className="step-tabs" role="tablist">
            {STEPS.map((x, n) => (
              <button key={x.k} role="tab" aria-selected={i === n} className={`step-tab ${i === n ? 'on' : ''}`} onClick={() => pick(n)}>
                <i /><span><b>{x.k}</b><small>{x.hint}</small></span>
              </button>
            ))}
          </div>
          <div className="step-card">
            <AnimatePresence mode="wait">
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5, ease: EASE }}>
                <div className="step-copy"><small>{s.tag}</small><h3>{s.t}</h3><p>{s.d}</p></div>
                <div className="step-visual">
                  {s.v === 'photo' ? (
                    <>
                      <img className="photo" src="/images/gallery/collabration/gallery-016.jpeg" alt="SAI Consultancy group photo with students and staff at a college program" />
                      <span className="photo-chip"><Icon name="building" size={18} /> Working with college partners</span>
                    </>
                  ) : s.v}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- programs */
function Programs() {
  return (
    <section className="section">
      <div className="container">
        <div className="head-row">
          <SectionHead eyebrow="What we deliver" title="Ten NEP-aligned programs, one placement outcome." accent={['placement']} />
          <Reveal><Button to="/what-we-do">View all programs</Button></Reveal>
        </div>
        <motion.div className="cells c5" variants={stagger(0.05)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
          {WHAT_WE_DO.map(([title], n) => (
            <motion.div key={title} variants={rise}>
              <Link to="/what-we-do" className="cell" style={{ height: '100%' }}>
                <span className="no">{String(n + 1).padStart(2, '0')}</span>
                <Illo name={PROGRAM_ICONS[n]} className="sm" />
                <h4 style={{ fontSize: 17 }}>{title}</h4>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- outputs */
const OUTPUTS = [
  ['A clear readiness verdict', 'Every student gets a placement-readiness view, with no guesswork for your placement cell.'],
  ['A skill-gap map', 'See exactly which skills to strengthen, per student and per department.'],
  ['Mock interview recordings', 'AI-supported practice with personalised feedback and improvement plans.'],
  ['College-level reports', 'Placement readiness reporting you can share with management and recruiters.'],
]

function Outputs() {
  return (
    <section className="section soft">
      <div className="container">
        <SectionHead eyebrow="What your college gets" title="Every student, assessed before the first campus drive." accent={['assessed']} sub="Each program comes with the evidence behind it, so your placement team knows who is ready and why." />
        <div className="outputs">
          <ul className="out-list">
            {OUTPUTS.map(([t, d], n) => (
              <motion.li key={t} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.7, ease: EASE, delay: n * 0.08 }}>
                <span className="no">0{n + 1}</span>
                <h4>{t}</h4>
                <p>{d}</p>
              </motion.li>
            ))}
          </ul>
          <div className="out-visual"><ReportMock /></div>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- compare */
const ROWS = [
  ['Curriculum', 'Generic, one-size-fits-all sessions', 'Skill-mapped to department and industry roles'],
  ['Practice', 'One-off workshops', 'Continuous access with measurable progress'],
  ['Interview prep', 'Occasional group mock sessions', 'AI-supported mock interviews with personal feedback'],
  ['Industry link', 'Depends on the college’s contacts', 'Corporate network, HR conclaves and job fairs'],
  ['Reporting', 'Attendance sheets', 'College-level placement readiness reports'],
]

function Compare() {
  return (
    <section className="section">
      <div className="container">
        <SectionHead eyebrow="Why SAI" title="Not another campus workshop." accent={['workshop.']} />
        <Reveal>
          <div style={{ overflowX: 'auto' }}>
            <table className="compare">
              <thead><tr><th></th><th>Typical campus training</th><th className="us">SAI Consultancy</th></tr></thead>
              <tbody>{ROWS.map(([a, b, c]) => <tr key={a}><td>{a}</td><td>{b}</td><td className="us">{c}</td></tr>)}</tbody>
            </table>
          </div>
        </Reveal>
        <motion.div className="stats" style={{ marginTop: 56 }} variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
          {[[200, '+', 'Trainers, mentors & industry contributors'], [10, '', 'NEP-aligned training programs'], [6, '', 'National & state skill initiatives'], [16, '', 'Services for colleges & students']].map(([n, s, l]) => (
            <motion.div className="stat" key={l} variants={rise}><strong><Counter to={n} suffix={s} /></strong><span>{l}</span></motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- services + gallery */
function Services() {
  return (
    <section className="section soft">
      <div className="container">
        <SectionHead eyebrow="More from SAI" title="Talent, training and design under one roof." accent={['Talent,']} />
        <motion.div className="cells c3" variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
          {SERVICES.map((s) => (
            <motion.div key={s.title} variants={rise}>
              <Link to="/what-we-do" className="svc cell" style={{ padding: 0, display: 'block', height: '100%' }}>
                <div className="svc-img"><img src={s.img} alt={s.title} loading="lazy" /></div>
                <div className="svc-body">
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                  <span className="more">Learn more <Icon name="arrow" size={16} /></span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function GalleryStrip() {
  return (
    <section className="section">
      <div className="container">
        <div className="head-row">
          <SectionHead eyebrow="Gallery" title="Moments from the field." accent={['field.']} />
          <Reveal><Button to="/gallery">View full gallery</Button></Reveal>
        </div>
        <motion.div className="mosaic" variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
          {MOSAIC.map((src, i) => (
            <motion.figure key={src} variants={rise} className={`m${i}`}>
              <div className="bezel"><div className="bezel-core"><img src={src} alt="" loading="lazy" /></div></div>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- faq */
const FAQS = [
  ['Who are your programs for?', 'Colleges and their students, plus early-career job seekers. Programs are mapped to department, specialisation and the industry roles your students are aiming for.'],
  ['How are the programs aligned to NEP?', 'Each of our ten programs is tied to NEP goals such as critical thinking, communication, experiential learning, vocational education and outcome-based evaluation.'],
  ['Do you help with placements?', 'Yes. We provide placement assistance for students we train and organise job fairs for partner colleges, inviting companies matched to student skill profiles.'],
  ['How do we get started?', 'Call +91 90876 74688 or email saiconsultancy0009@gmail.com. We will understand your departments and goals, then propose a program plan.'],
]

function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section className="section soft">
      <div className="container">
        <SectionHead eyebrow="FAQ" title="Questions colleges ask us." accent={['colleges']} center />
        <Reveal>
          <div className="faq">
            {FAQS.map(([q, a], n) => (
              <div className="faq-item" key={q}>
                <button className="faq-q" onClick={() => setOpen(open === n ? -1 : n)} aria-expanded={open === n}>
                  {q}
                  <motion.i animate={{ rotate: open === n ? 0 : 45 }} transition={{ duration: 0.4, ease: EASE }}><Icon name="close" size={16} /></motion.i>
                </button>
                <AnimatePresence initial={false}>
                  {open === n && (
                    <motion.div className="faq-a" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease: EASE }}>
                      <p>{a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- cta */
function Cta() {
  return (
    <section className="section dark cta">
      <HexField />
      <div className="container" style={{ position: 'relative' }}>
        <Reveal><Eyebrow light>Let's dream big</Eyebrow></Reveal>
        <SplitHeading as="h2" text="Your students are ready to be hired. Are your campuses?" accent={['hired.']} className="h2" />
        <Reveal delay={0.2} className="checks">
          <span><Icon name="check" size={18} /> NEP-aligned programs</span>
          <span><Icon name="check" size={18} /> AI-supported practice</span>
          <span><Icon name="check" size={18} /> Job fairs &amp; placement support</span>
        </Reveal>
        <Reveal delay={0.3} className="acts">
          <Button to="/contact" variant="accent">Talk to our team</Button>
          <Button to="/what-we-do" variant="ghost" icon="chevR">Explore programs</Button>
        </Reveal>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Partners />
      <Trainers />
      <Problem />
      <Solution />
      <Process />
      <Outreach />
      <Programs />
      <Outputs />
      <Compare />
      <Services />
      <GalleryStrip />
      <Faq />
      <Cta />
    </>
  )
}
