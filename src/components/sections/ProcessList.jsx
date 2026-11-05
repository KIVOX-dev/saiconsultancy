import { motion } from 'framer-motion'
import { Eyebrow, Reveal, SplitHeading, EASE } from '../ui/primitives.jsx'

/**
 * Dark two-column list: sticky heading on the left, numbered points on the right
 * that appear one by one as you scroll. items: [title, description].
 */
export default function ProcessList({ eyebrow, title, accent, sub, items }) {
  return (
    <section className="proc">
      <div className="container proc-grid">
        <div className="proc-head">
          <Reveal y={16}><Eyebrow light>{eyebrow}</Eyebrow></Reveal>
          <SplitHeading as="h2" text={title} accent={accent} className="h2" />
          {sub && <Reveal delay={0.2}><p className="proc-sub">{sub}</p></Reveal>}
        </div>
        <ol className="proc-list">
          {items.map(([t, d], i) => (
            <motion.li
              key={t}
              className="proc-item"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            >
              <motion.div className="proc-meta" variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}>
                <span className="proc-no">{String(i + 1).padStart(2, '0')}</span>
                <motion.i className="proc-dot" variants={{ hidden: { scale: 0 }, show: { scale: 1, transition: { delay: 0.15, duration: 0.5, ease: EASE } } }} />
              </motion.div>
              <motion.h3 variants={{ hidden: { opacity: 0, y: 30, filter: 'blur(8px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { delay: 0.1, duration: 0.8, ease: EASE } } }}>{t}</motion.h3>
              <motion.p variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { delay: 0.25, duration: 0.8, ease: EASE } } }}>{d}</motion.p>
              <motion.hr variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { delay: 0.4, duration: 1, ease: EASE } } }} />
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
