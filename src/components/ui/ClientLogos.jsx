import { useState } from 'react'
import Marquee from './Marquee.jsx'
import { CLIENTS } from '../../data/programme.js'

function Logo({ name, file }) {
  const [broken, setBroken] = useState(false)
  return (
    <figure className="client-logo" title={name}>
      {broken ? <figcaption className="client-fallback">{name}</figcaption> : <img src={`/images/clients/${file}`} alt={name} loading="lazy" onError={() => setBroken(true)} />}
    </figure>
  )
}

/** Partner institutions as continuously running logo rows. Logo files live in public/images/clients/ (names in CLIENTS). */
export default function ClientLogos() {
  const half = Math.ceil(CLIENTS.length / 2)
  const rows = [CLIENTS.slice(0, half), CLIENTS.slice(half)]
  return (
    <div className="client-rows">
      {rows.map((row, i) => (
        <Marquee key={i} reverse={i === 1} slow>
          {row.map(([name, file]) => <Logo key={file} name={name} file={file} />)}
        </Marquee>
      ))}
    </div>
  )
}
