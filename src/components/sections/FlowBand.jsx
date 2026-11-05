import { motion } from 'framer-motion'
import Icon from '../ui/Icon.jsx'
import { EASE } from '../ui/primitives.jsx'

/** Dark numbered flow with drawn arrows; the last step is the green goal. steps: [title, description]. */
export default function FlowBand({ label, steps }) {
  return (
    <div className="flow-band flow-band-n" style={{ '--n': steps.length }}>
      <span className="band-label">{label}</span>
      <div className="flow" aria-label={label}>
        {steps.map(([t, d], i) => (
          <motion.div key={t} className="flow-card" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.8, ease: EASE, delay: i * 0.18 }}>
            <span className={`flow-dot ${i === steps.length - 1 ? 'goal' : ''}`}>{i === steps.length - 1 ? <Icon name="check" size={24} strokeWidth={2.2} /> : i + 1}</span>
            <h4>{t}</h4>
            <p>{d}</p>
            {i < steps.length - 1 && (
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
  )
}
