import { Link } from 'react-router-dom'
import { CONTACT, NAV } from '../../data/site.js'
import Icon from '../ui/Icon.jsx'

const PROGRAMS = ['Campus Outreach & Admissions', 'Soft Skills', 'Aptitude Training', 'Communicative English', 'Interview Readiness', 'Job-Oriented Training', 'Career Guidance']

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <img src="/images/logo-mark.png" alt="" width="34" height="40" />
              <span className="wordmark">SAI <b>CONSULTANCY</b></span>
            </div>
            <p className="tagline">Let's Dream Big</p>
            <p>College-focused training and employability development. Workplace-aligned, skill-mapped, and hiring-ready.</p>
          </div>
          <div>
            <h6>Programs</h6>
            <ul>{PROGRAMS.map((p) => <li key={p}><Link to={p.startsWith('Campus') ? '/campus-outreach' : '/what-we-do'}>{p}</Link></li>)}</ul>
          </div>
          <div>
            <h6>Company</h6>
            <ul>{NAV.map((n) => <li key={n.to}><Link to={n.to}>{n.label}</Link></li>)}</ul>
          </div>
          <div>
            <h6>Contact</h6>
            <ul>
              <li><a href={`mailto:${CONTACT.email}`}><Icon name="mail" size={16} /> {CONTACT.email}</a></li>
              <li><a href={`tel:${CONTACT.phone}`}><Icon name="phone" size={16} /> {CONTACT.phoneLabel}</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Sai Consultancy. All rights reserved.</span>
          <span>From classroom to career.</span>
        </div>
      </div>
    </footer>
  )
}
