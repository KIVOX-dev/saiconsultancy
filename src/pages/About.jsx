import { motion } from 'framer-motion'
import Icon from '../components/ui/Icon.jsx'
import Illo from '../components/ui/Illo.jsx'
import { PageHero, SectionHead, Reveal, Bezel, EASE, stagger, rise } from '../components/ui/primitives.jsx'

const PILLARS = [
  ['target', 'Structured aptitude and employability training'],
  ['mic', 'AI-driven assessments and mock interviews'],
  ['layers', 'Continuous learning and improvement platforms'],
  ['building', 'Placement readiness frameworks supported by HR ecosystems'],
]

export default function About() {
  return (
    <>
      <PageHero eyebrow="Who we are" title="Preparing students for the future, without fear." accent={['future,']} sub="College-focused training and employability development, built by 200+ working professionals, trainers, mentors and industry contributors." />

      <section className="section tight">
        <div className="container split">
          <Reveal>
            <Bezel className="photo-bezel"><img src="/images/gallery/session/gallery-014.jpeg" alt="SAI Consultancy training" /></Bezel>
          </Reveal>
          <div className="split-copy">
            <Reveal><p>SAI Consultancy is built on a strong belief that students must be prepared for the future without fear, confusion, or pressure. We come together with one shared purpose: to add real value to students by bridging the gap between academics and industry expectations.</p></Reveal>
            <Reveal delay={0.1}><p>Today's world is moving towards AI-driven systems, intelligent platforms, and skill-based hiring. While this transformation is inevitable, students should not feel intimidated by technology. They should be guided, supported, and gradually equipped to adapt confidently.</p></Reveal>
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="container">
          <SectionHead eyebrow="How we elevate learning" title="Alignment with industry, one step further." accent={['industry,']} center />
          <motion.div className="grid-4" variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
            {PILLARS.map(([ic, t]) => (
              <motion.div key={t} variants={rise}>
                <Bezel className="info-card"><Illo name={ic} /><h4>{t}</h4></Bezel>
              </motion.div>
            ))}
          </motion.div>
          <Reveal className="center narrow"><p className="sub">Our role is to act as a bridge, enabler, and support system, helping colleges transition smoothly into industry-aligned training while ensuring students grow with confidence, clarity, and competence.</p></Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container grid-3">
          {[
            ['Our Promise', 'award', 'From classroom to career: our programs are workplace-aligned, skill-mapped, and hiring-ready.'],
            ['Our Mission', 'target', 'To equip young students with industry-relevant skills and confidence, using structured training, AI-supported assessment platforms, and continuous learning systems, without creating fear around technology. We support colleges in delivering measurable, placement-oriented, future-ready education.'],
            ['Our Vision', 'compass', 'To become a trusted training and placement readiness partner for colleges across India, building an ecosystem where academics and industry work in alignment and technology enhances learning, not intimidates it.'],
          ].map(([t, ic, d], i) => (
            <Reveal key={t} delay={i * 0.12}>
              <Bezel className="info-card"><Illo name={ic} /><h4>{t}</h4><p>{d}</p></Bezel>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section tight">
        <div className="container">
          <Reveal>
            <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.6, ease: EASE }}>
              <Bezel className="photo-bezel wide"><img src="/images/gallery/collabration/gallery-023.jpeg" alt="SAI Consultancy team and partners together in a meeting room" loading="lazy" /></Bezel>
            </motion.div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

