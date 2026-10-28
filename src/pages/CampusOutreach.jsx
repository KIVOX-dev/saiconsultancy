import Outreach from '../components/sections/Outreach.jsx'
import { PageHero } from '../components/ui/primitives.jsx'

export default function CampusOutreach() {
  return (
    <>
      <PageHero eyebrow="Campus outreach" title="Campus outreach & admissions, handled end to end." accent={['outreach', 'admissions,']} sub="We take our industry trainers and placement programs to your campus, so students see a clear path from classroom to career." />
      <Outreach standalone />
    </>
  )
}
