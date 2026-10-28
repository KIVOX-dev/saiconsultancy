import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from '../components/Icon.jsx'
import { PageHero, EASE } from '../components/ui.jsx'
import { GALLERY } from '../data.js'

const ALL = { key: 'all', label: 'All', images: GALLERY.flatMap((g) => g.images) }
const TABS = [ALL, ...GALLERY]

export default function Gallery() {
  const [tab, setTab] = useState('all')
  const [sel, setSel] = useState(null)
  const images = TABS.find((t) => t.key === tab).images

  useEffect(() => {
    if (sel === null) return
    const step = (d) => setSel((v) => (v + d + images.length) % images.length)
    const onKey = (e) => {
      if (e.key === 'Escape') setSel(null)
      if (e.key === 'ArrowLeft') step(-1)
      if (e.key === 'ArrowRight') step(1)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [sel, images.length])

  const step = (d) => setSel((v) => (v + d + images.length) % images.length)

  return (
    <>
      <PageHero eyebrow="Gallery" title="A glimpse of our sessions and collaborations." accent={['sessions']} sub="Training sessions, placement drives, news features and campus collaborations." />
      <section className="section tight">
        <div className="container">
          <div className="tabs" role="tablist">
            {TABS.map((t) => (
              <button key={t.key} role="tab" aria-selected={tab === t.key} className={tab === t.key ? 'active' : ''} onClick={() => setTab(t.key)}>
                {tab === t.key && <motion.i layoutId="tab-pill" className="tab-pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                <span>{t.label} <small>{t.images.length}</small></span>
              </button>
            ))}
          </div>

          <div className="masonry">
            <AnimatePresence mode="popLayout">
              {images.map((src, i) => (
                <motion.button
                  layout
                  key={src}
                  className="tile"
                  initial={{ opacity: 0, y: 30, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.6, ease: EASE, delay: Math.min(i, 8) * 0.04 }}
                  onClick={() => setSel(i)}
                  aria-label={`Open image ${i + 1}`}
                >
                  <span className="bezel"><span className="bezel-core"><img src={src} alt="" loading="lazy" /></span></span>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {sel !== null && (
          <motion.div className="lightbox" role="dialog" aria-modal="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: EASE }} onClick={() => setSel(null)}>
            <button className="lb-btn lb-close" aria-label="Close"><Icon name="close" /></button>
            <button className="lb-btn lb-prev" onClick={(e) => { e.stopPropagation(); step(-1) }} aria-label="Previous"><Icon name="chevL" /></button>
            <AnimatePresence mode="wait">
              <motion.img
                key={images[sel]}
                src={images[sel]}
                alt=""
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: EASE }}
                onClick={(e) => e.stopPropagation()}
              />
            </AnimatePresence>
            <button className="lb-btn lb-next" onClick={(e) => { e.stopPropagation(); step(1) }} aria-label="Next"><Icon name="chevR" /></button>
            <span className="lb-count">{sel + 1} / {images.length}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
