import { PageHero, Button, Reveal } from '../components/ui/primitives.jsx'

export default function NotFound() {
  return (
    <>
      <PageHero eyebrow="Error 404" title="We couldn't find that page." accent={['page.']} sub="The link may be mistyped or the page may have moved. Head back home or get in touch and we will help." />
      <section className="section tight">
        <div className="container">
          <Reveal><div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Button to="/">Back to home</Button>
            <Button to="/contact" variant="ghost" icon="chevR">Contact us</Button>
          </div></Reveal>
        </div>
      </section>
    </>
  )
}
