import Icon from '../components/Icon.jsx'
import Illo from '../components/Illo.jsx'
import Roadmap from '../components/Roadmap.jsx'
import { PageHero, SectionHead, Reveal, Bezel, Button } from '../components/ui.jsx'

const BUILD = ['Aptitude, logical reasoning, and problem solving', 'Communicative English and workplace communication', 'Resume structuring and professional positioning', 'Interview skills for HR and technical rounds', 'Professional behavior and workplace etiquette', 'Digital workplace and productivity skills']
const PREPARE = ['Mock interviews with personalised feedback', 'Progressive assessments and practice (Test Your Metrics)', 'Role-play scenarios and group discussions', 'Skill-gap mapping and personalized guidance', 'Mentor interaction and continuous improvement tracking', 'Career awareness and role-based training']

export default function JobSeekers() {
  return (
    <>
      <PageHero eyebrow="Job seekers" title="Get placement-ready with confidence." accent={['placement-ready']} sub="Structured training, AI-supported practice, and career guidance for students and early-career professionals." />

      <section className="section tight">
        <div className="container grid-2">
          <Reveal>
            <Bezel className="info-card"><Illo name="layers" /><h4>What we help you build</h4><ul className="ticks">{BUILD.map((x) => <li key={x}>{x}</li>)}</ul></Bezel>
          </Reveal>
          <Reveal delay={0.12}>
            <Bezel className="info-card dark" coreClass="core-navy"><Illo name="mic" className="on-dark" /><h4>How we prepare you</h4><ul className="ticks">{PREPARE.map((x) => <li key={x}>{x}</li>)}</ul></Bezel>
          </Reveal>
        </div>
      </section>

      <section className="section band">
        <div className="container">
          <SectionHead eyebrow="Roadmap" title="Your career readiness roadmap." accent={['roadmap.', 'readiness']} center />
          <Roadmap />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <Bezel className="cta-card" coreClass="core-navy">
              <h2 className="h2 light">Placement &amp; <span className="accent">job fairs</span></h2>
              <p>We connect industry-ready students with recruiters through structured placement support and job fairs. Our corporate network aligns training outcomes with real hiring needs.</p>
              <Button to="/contact" variant="accent">Get guidance</Button>
            </Bezel>
          </Reveal>
        </div>
      </section>
    </>
  )
}
