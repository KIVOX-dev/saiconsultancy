import Outreach from '../components/sections/Outreach.jsx'
import { PageHero } from '../components/ui/primitives.jsx'

export default function CampusOutreach() {
  return (
    <>
      <PageHero eyebrow="Campus outreach" title="Campus outreach & admissions, handled end to end." accent={['outreach', 'admissions,']} sub="We take your college to prospective students through school visits, counselling and application support, so the right students find you, choose you and enrol." />
      <Outreach standalone />
    </>
  )
}
