import { motion } from 'framer-motion'
import { EASE } from '../ui/primitives.jsx'

/**
 * Step cards joined by arrows, in the style of the proposal diagrams: white cards with a green top edge,
 * the last one in solid navy. Cards and arrows appear one by one.
 * items: [title, description]
 */
export default function StepFlow({ items, label = 'STEP' }) {
  const n = items.length
  return (
    <div className="sf" style={{ '--n': n }}>
      {items.map(([t, d], i) => {
        const last = i === n - 1
        return (
          <motion.div
            key={t}
            className={`sf-card ${last ? 'goal' : ''}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: EASE, delay: i * 0.16 }}
          >
            <span className="sf-no">{label} {String(i + 1).padStart(2, '0')}</span>
            <h4>{t}</h4>
            <p>{d}</p>
            {!last && (
              <motion.i
                className="sf-arrow"
                aria-hidden="true"
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.16 + 0.55 }}
              />
            )}
          </motion.div>
        )
      })}
    </div>
  )
}
