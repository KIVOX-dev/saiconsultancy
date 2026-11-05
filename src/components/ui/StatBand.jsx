import { motion } from 'framer-motion'
import { Counter, stagger, rise } from './primitives.jsx'

/** Big-number stat row with counting animation. stats: [['1,000+', 'label'], ...] */
export default function StatBand({ stats }) {
  return (
    <motion.div className="stats stat-band" style={{ '--n': stats.length }} variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
      {stats.map(([v, l]) => {
        const num = parseInt(v.replace(/[^0-9]/g, ''), 10)
        const suffix = v.replace(/[0-9,]/g, '')
        return (
          <motion.div className="stat" key={l} variants={rise}>
            <strong><Counter to={num} suffix={suffix} /></strong>
            <span>{l}</span>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
