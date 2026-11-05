import { motion } from 'framer-motion'
import Icon from '../ui/Icon.jsx'
import { EASE } from '../ui/primitives.jsx'

const COLORS = ['#1a7f9c', '#1bb961', '#6cc04a', '#e04b4b', '#e8873a', '#1a7f9c']
const ICONS = ['users', 'briefcase', 'mic', 'laptop', 'building', 'award']

// Per-row geometry: where the line leaves the text (a, % of height) and which way it bends into the node.
const ROW_A = [14, 50, 86]

/**
 * Hub roadmap: a centre circle with three stages either side. When scrolled into view,
 * the hub appears first, then each stage appears one by one (node, connector, text).
 * items: [title, description]. Items 0-2 sit left (top to bottom), 3-5 right.
 */
export default function HubRoadmap({ items, hub = ['20+', 'Years of campus-to-corporate'] }) {
  const step = 0.7
  const item = (i) => {
    const right = i >= 3
    const row = i % 3
    const [t, d] = items[i]
    const c = COLORS[i % COLORS.length]
    const delay = 0.5 + i * step
    return (
      <motion.div
        key={t}
        className={`hub-item ${right ? 'right' : 'left'} row${row}`}
        style={{ gridColumn: right ? 3 : 1, gridRow: row + 1, '--c': c, '--a': `${ROW_A[row]}%` }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-15% 0px' }}
      >
        <motion.span
          className="hub-node"
          variants={{ hidden: { scale: 0, opacity: 0 }, show: { scale: 1, opacity: 1, transition: { delay, duration: 0.6, ease: EASE } } }}
        >
          <Icon name={ICONS[i % ICONS.length]} size={28} />
        </motion.span>
        <span className="hub-conn">
          <motion.span
            className="hub-dot"
            variants={{ hidden: { scale: 0 }, show: { scale: 1, transition: { delay: delay + 0.2, duration: 0.4, ease: EASE } } }}
          />
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <motion.path
              d={`M${right ? 100 : 0} ${ROW_A[row]} H${right ? 30 : 70} L${right ? 0 : 100} 50`}
              fill="none" stroke={c} strokeWidth="2" vectorEffect="non-scaling-stroke"
              variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { delay: delay + 0.25, duration: 0.7, ease: EASE } } }}
            />
          </svg>
        </span>
        <motion.div
          className="hub-text"
          variants={{ hidden: { opacity: 0, x: right ? 40 : -40, filter: 'blur(6px)' }, show: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { delay: delay + 0.45, duration: 0.8, ease: EASE } } }}
        >
          <b className="hub-num" style={{ color: c }}>{i + 1}</b>
          <h4>{t}</h4>
          <p>{d}</p>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <div className="hub">
      <motion.div
        className="hub-core"
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-15% 0px' }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <strong>{hub[0]}</strong>
        <span>{hub[1]}</span>
      </motion.div>
      {items.map((_, i) => item(i))}
    </div>
  )
}
