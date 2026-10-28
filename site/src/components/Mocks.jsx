import { motion } from 'framer-motion'
import Icon from './Icon.jsx'
import { EASE } from './ui.jsx'

/** Illustrative UI mockups. Names and scores are sample data, labelled as such. */
export function ReportMock({ delay = 0 }) {
  const rows = [['Aptitude', 0.78, '78%'], ['Communication', 0.72, '72%'], ['Technical', 0.64, '64%'], ['Interview', 0.81, '81%']]
  return (
    <div className="mock" aria-label="Sample placement readiness report">
      <div className="mock-bar"><i /> Completed · Sample report</div>
      <div className="mock-head">
        <span className="mock-avatar">A</span>
        <div><b>Anitha R. <span className="chip">Ready</span></b><small>Final-year · Mock interview verified</small></div>
      </div>
      <div className="mock-metrics">
        <div className="metric good"><small>Verdict</small><b>Placement ready</b></div>
        <div className="metric"><small>Readiness score</small><b>74%</b></div>
        <div className="metric"><small>Confidence</small><b>High</b></div>
      </div>
      <div className="mock-rows">
        {rows.map(([l, v, t], i) => (
          <div className="mock-row" key={l}>
            <span>{l}</span>
            <div className="bar">
              <motion.i className={i % 2 ? 'g' : ''} initial={{ scaleX: 0 }} whileInView={{ scaleX: v }} viewport={{ once: true }} transition={{ duration: 1.2, ease: EASE, delay: delay + i * 0.12 }} style={{ width: '100%' }} />
            </div>
            <em>{t}</em>
          </div>
        ))}
      </div>
    </div>
  )
}

export function PhoneMock() {
  return (
    <div className="phone" aria-label="Sample AI mock interview">
      <div className="phone-top"><span className="mock-avatar"><img src="/images/logo-mark.png" alt="" width="14" height="17" /></span> AI mock interview</div>
      <div className="phone-body">
        <div className="bubble">Tell me about a project where you worked in a team. What was your role?</div>
        <div className="bubble me">I led the data collection and presented our results to the faculty panel…</div>
        <div className="rec">
          <Icon name="mic" size={16} />
          <svg viewBox="0 0 120 26" preserveAspectRatio="none" aria-hidden="true">
            {Array.from({ length: 30 }).map((_, k) => (
              <motion.rect key={k} x={k * 4} width="2" fill="#1bb961" initial={{ y: 9, height: 8 }}
                animate={{ y: [13 - 3 - (k % 5) * 2, 13 - 9 - (k % 7), 13 - 3 - (k % 5) * 2], height: [6 + (k % 5) * 4, 18 + (k % 7) * 2, 6 + (k % 5) * 4] }}
                transition={{ duration: 1.3 + (k % 4) * 0.2, repeat: Infinity, ease: 'easeInOut', delay: k * 0.03 }} />
            ))}
          </svg>
          <span>00:42</span>
        </div>
      </div>
    </div>
  )
}

export function HexField() {
  return (
    <svg className="hex-field" aria-hidden="true">
      <defs>
        <pattern id="hexp" width="56" height="97" patternUnits="userSpaceOnUse" patternTransform="scale(1.2)">
          <path d="M28 0 56 16V48L28 64 0 48V16Z M28 64 56 80V112 M28 64 0 80V112" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hexp)" />
    </svg>
  )
}

/** Step visuals for the tabbed process. */
export function GapMock() {
  const rows = [['Aptitude', 0.55], ['Communicative English', 0.7], ['Technical', 0.4], ['Interview skills', 0.48]]
  return (
    <div className="mock">
      <div className="mock-bar"><i /> Diagnostic · Skill-gap map · Sample</div>
      <div className="mock-rows" style={{ paddingTop: 12 }}>
        {rows.map(([l, v], i) => (
          <div className="mock-row" key={l} style={{ gridTemplateColumns: '150px 1fr 40px' }}>
            <span>{l}</span>
            <div className="bar"><motion.i initial={{ scaleX: 0 }} animate={{ scaleX: v }} transition={{ duration: 1, ease: EASE, delay: 0.1 + i * 0.1 }} style={{ width: '100%' }} /></div>
            <em>{Math.round(v * 100)}%</em>
          </div>
        ))}
      </div>
    </div>
  )
}

export function TrainMock() {
  const mods = [['Soft skills workshop', true], ['Aptitude practice set', true], ['Communicative English', true], ['Role-play: HR round', false]]
  return (
    <div className="mock">
      <div className="mock-bar"><i /> Training plan · Sample</div>
      <div className="mock-rows" style={{ padding: '10px 16px 16px' }}>
        {mods.map(([l, d], i) => (
          <motion.div key={l} className="data-list" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }} style={{ margin: '6px 0' }}>
            <li style={{ background: d ? '#f0faf4' : '#fff' }}><Icon name={d ? 'check' : 'spark'} size={18} /> {l}<em style={{ marginLeft: 'auto', fontStyle: 'normal', fontSize: 12 }}>{d ? 'Done' : 'In progress'}</em></li>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
