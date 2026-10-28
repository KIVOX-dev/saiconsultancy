import { motion } from 'framer-motion'
import Icon from './Icon.jsx'
import Illo from './Illo.jsx'
import { Bezel, EASE, stagger, rise } from './ui.jsx'

const STEPS = [
  { icon: 'target', t: 'Assess', d: 'Identify strengths and gaps with diagnostic assessments.' },
  { icon: 'layers', t: 'Train', d: 'Build core skills through structured modules and practice.' },
  { icon: 'award', t: 'Showcase', d: 'Validate skills via mock interviews and job fairs.' },
]

/** Three-step roadmap joined by an SVG line that draws itself on scroll. */
export default function Roadmap() {
  return (
    <div className="roadmap">
      <svg className="road-line" viewBox="0 0 1000 40" preserveAspectRatio="none" aria-hidden="true">
        <motion.path
          d="M0 20 C 160 -10, 340 50, 500 20 S 840 -10, 1000 20"
          stroke="url(#rg)" strokeWidth="2" strokeDasharray="2 8" strokeLinecap="round" fill="none"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 2, ease: EASE }}
        />
        <defs>
          <linearGradient id="rg"><stop offset="0" stopColor="#1b4a86" /><stop offset="1" stopColor="#19bb60" /></linearGradient>
        </defs>
      </svg>
      <motion.div className="road-steps" variants={stagger(0.2)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
        {STEPS.map((s, i) => (
          <motion.div key={s.t} variants={rise}>
            <Bezel className="road-card">
              <span className="road-num">0{i + 1}</span>
              <Illo name={s.icon} />
              <h4>{s.t}</h4>
              <p>{s.d}</p>
            </Bezel>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
