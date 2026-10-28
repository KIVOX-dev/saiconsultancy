import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Nav from './components/layout/Nav.jsx'
import Footer from './components/layout/Footer.jsx'
import ChatWidget from './components/chat/ChatWidget.jsx'
import { EASE } from './components/ui/primitives.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import WhatWeDo from './pages/WhatWeDo.jsx'
import CampusOutreach from './pages/CampusOutreach.jsx'
import Gallery from './pages/Gallery.jsx'
import JobSeekers from './pages/JobSeekers.jsx'
import Contact from './pages/Contact.jsx'
import Assistant from './pages/Assistant.jsx'

export default function App() {
  const location = useLocation()
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0)
      return
    }
    // Let the new page mount, then jump to the anchored section.
    const t = setTimeout(() => document.querySelector(location.hash)?.scrollIntoView({ behavior: 'smooth' }), 450)
    return () => clearTimeout(t)
  }, [location.pathname, location.hash])

  return (
    <>
      <Nav />
      <ChatWidget />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <div className="frame">
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/what-we-do" element={<WhatWeDo />} />
              <Route path="/campus-outreach" element={<CampusOutreach />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/job-seekers" element={<JobSeekers />} />
              <Route path="/assistant" element={<Assistant />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Home />} />
            </Routes>
            <Footer />
          </div>
        </motion.main>
      </AnimatePresence>
    </>
  )
}
