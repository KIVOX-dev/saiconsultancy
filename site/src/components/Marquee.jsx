export default function Marquee({ children, reverse, slow }) {
  return (
    <div className={`marquee ${reverse ? 'rev' : ''} ${slow ? 'slow' : ''}`}>
      <div className="marquee-track">
        <div className="marquee-group">{children}</div>
        <div className="marquee-group" aria-hidden="true">{children}</div>
      </div>
    </div>
  )
}
