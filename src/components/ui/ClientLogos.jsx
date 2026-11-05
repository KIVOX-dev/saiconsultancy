import { useState } from 'react'
import { motion } from 'framer-motion'
import { stagger, rise } from './primitives.jsx'
import { CLIENTS } from '../../data/programme.js'

function Logo({ name, file }) {
  const [broken, setBroken] = useState(false)
  return (
    <motion.figure className="client-logo" variants={rise} title={name}>
      {broken ? <figcaption className="client-fallback">{name}</figcaption> : <img src={`/images/clients/${file}`} alt={name} loading="lazy" onError={() => setBroken(true)} />}
    </motion.figure>
  )
}

/** Logo wall of partner institutions. Drop logo files into public/images/clients/ (names in CLIENTS). */
export default function ClientLogos() {
  return (
    <motion.div className="client-wall" variants={stagger(0.07)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
      {CLIENTS.map(([name, file]) => <Logo key={file} name={name} file={file} />)}
    </motion.div>
  )
}
