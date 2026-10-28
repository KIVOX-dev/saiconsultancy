import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, animate } from 'framer-motion'
import Icon from './Icon.jsx'

export const EASE = [0.32, 0.72, 0, 1]

/** Pill button with the trailing arrow nested in its own circle. */
export function Button({ to, href, variant = 'primary', children, icon = 'arrow', ...rest }) {
  const cls = `btn btn-${variant}`
  const inner = (
    <>
      <span>{children}</span>
      <i className="btn-ico"><Icon name={icon} size={16} /></i>
    </>
  )
  if (to) return <Link to={to} className={cls} {...rest}>{inner}</Link>
  if (href) return <a href={href} className={cls} {...rest}>{inner}</a>
  return <button className={cls} {...rest}>{inner}</button>
}

/** Double-bezel: machined outer shell + inner core. */
export function Bezel({ children, className = '', coreClass = '', as: Tag = 'div', ...rest }) {
  return (
    <Tag className={`bezel ${className}`} {...rest}>
      <div className={`bezel-core ${coreClass}`}>{children}</div>
    </Tag>
  )
}

export function Eyebrow({ children, light }) {
  return <span className={`eyebrow ${light ? 'eyebrow-light' : ''}`}>{children}</span>
}

/** Heavy fade-up on scroll entry. */
export function Reveal({ children, delay = 0, y = 40, className, as = 'div', ...rest }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export const stagger = (s = 0.1) => ({ hidden: {}, show: { transition: { staggerChildren: s } } })
export const rise = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: EASE } },
}

/** Masked word-by-word headline reveal. `accent` words render in the brand gradient. */
export function SplitHeading({ text, accent = [], as = 'h1', className = '', delay = 0 }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      variants={stagger(0.06)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      transition={{ delayChildren: delay }}
      aria-label={text}
    >
      {text.split(' ').map((w, i) => (
        <span key={i}>
          <span className="word-mask" aria-hidden="true">
            <motion.span
              className={`word ${accent.includes(w) ? 'accent' : ''}`}
              variants={{ hidden: { y: '110%' }, show: { y: 0, transition: { duration: 0.9, ease: EASE } } }}
            >
              {w}
            </motion.span>
          </span>{' '}
        </span>
      ))}
    </Tag>
  )
}

export function SectionHead({ eyebrow, title, accent, sub, center }) {
  return (
    <div className={`section-head ${center ? 'center' : ''}`}>
      <Reveal><Eyebrow>{eyebrow}</Eyebrow></Reveal>
      <SplitHeading as="h2" text={title} accent={accent} className="h2" />
      {sub && <Reveal delay={0.15}><p className="sub">{sub}</p></Reveal>}
    </div>
  )
}

export function Counter({ to, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 1.8, ease: EASE, onUpdate: (v) => { if (ref.current) ref.current.textContent = Math.round(v) + suffix } })
    return () => c.stop()
  }, [inView, to, suffix])
  return <span ref={ref}>0{suffix}</span>
}

export function PageHero({ eyebrow, title, accent, sub }) {
  return (
    <section className="page-hero">
      <div className="container">
        <Reveal y={20}><Eyebrow>{eyebrow}</Eyebrow></Reveal>
        <SplitHeading text={title} accent={accent} className="h1" />
        {sub && <Reveal delay={0.25}><p className="lede">{sub}</p></Reveal>}
      </div>
      <svg className="hero-lines" viewBox="0 0 600 300" fill="none" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <motion.path
            key={i}
            d={`M0 ${220 - i * 30} C 150 ${120 - i * 20}, 300 ${300 - i * 40}, 600 ${60 + i * 10}`}
            stroke="currentColor" strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 - i * 0.08 }}
            transition={{ duration: 2.2, delay: 0.3 + i * 0.2, ease: EASE }}
          />
        ))}
      </svg>
    </section>
  )
}
