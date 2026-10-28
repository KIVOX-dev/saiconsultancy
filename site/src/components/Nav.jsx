import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { NAV, CONTACT } from '../data.js'
import { EASE } from './ui.jsx'
import Icon from './Icon.jsx'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  return (
    <>
      <motion.header
        className={`nav ${scrolled ? 'nav-scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 0.1 }}
      >
        <Link to="/" className="nav-logo" aria-label="Sai Consultancy home">
          <img src="/images/logo-mark.png" alt="" width="28" height="33" />
          <span className="wordmark">SAI <b>CONSULTANCY</b></span>
        </Link>

        <nav className="nav-links" aria-label="Main">
          {NAV.slice(0, -1).map((n) => (
            <NavLink key={n.to} to={n.to} end>
              {({ isActive }) => (
                <span className={`nav-link ${isActive ? 'is-active' : ''}`}>
                  {isActive && <motion.i layoutId="nav-pill" className="nav-pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                  <b>{n.label}</b>
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <Link to="/contact" className="nav-cta">
          <span>Contact</span><i className="btn-ico"><Icon name="arrow" size={14} /></i>
        </Link>

        <button className={`burger ${open ? 'open' : ''}`} onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
          <span /><span />
        </button>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <nav className="menu-links">
              {NAV.map((n, i) => (
                <div className="menu-mask" key={n.to}>
                  <motion.div
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '110%' }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.1 + i * 0.06 }}
                  >
                    <NavLink to={n.to} end className={({ isActive }) => (isActive ? 'active' : '')}>
                      <small>0{i + 1}</small>{n.label}
                    </NavLink>
                  </motion.div>
                </div>
              ))}
            </nav>
            <motion.p className="menu-foot" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.6 } }}>
              {CONTACT.email} · {CONTACT.phoneLabel}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
