import { useEffect, useRef, useState } from 'react'
import { useLang } from '../i18n/LanguageContext.jsx'
import { GALLERY, STYLE_BY_ID, CONTACT } from '../lib/data.js'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/motion.js'
import SectionHead from './SectionHead.jsx'

const FILTERS = ['all', 'classic', 'hybrid', 'volume', 'lift']

function BeforeAfter({ item }) {
  const { t } = useLang()
  const [x, setX] = useState(50)
  return (
    <figure className="g-item" style={{ margin: 0 }}>
      <div className="ba" data-cursor="Slide" style={{ '--x': `${x}%` }}>
        <img className="before" src={STYLE_BY_ID.natural.img} alt={`${t.gallery.before}: natural lashes`} draggable="false" />
        <img className="after" src={STYLE_BY_ID[item.id].img} alt={`${t.gallery.after}: ${item.name}`} draggable="false" />
        <span className="divider" />
        <span className="lbl l">{t.gallery.before}</span>
        <span className="lbl r">{t.gallery.after}</span>
        <input type="range" min="0" max="100" value={x} onChange={(e) => setX(+e.target.value)} aria-label={t.gallery.compare(item.name)} />
      </div>
      <figcaption className="ba-cap">
        <span>{item.name}</span>
        <span className="mono">{item.spec}</span>
      </figcaption>
    </figure>
  )
}

export default function Gallery() {
  const { t } = useLang()
  const g = t.gallery
  const [filter, setFilter] = useState('all')
  const ref = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('.g-item', {
        y: 40, opacity: 0.3, duration: 0.9, ease: 'power3.out', stagger: 0.07,
        scrollTrigger: { trigger: '.gallery', start: 'top 85%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  // the grid height changes with the filter; later triggers need new positions
  useEffect(() => { ScrollTrigger.refresh() }, [filter])

  const items = GALLERY.filter((it) => filter === 'all' || it.filter === filter)

  return (
    <section className="section" id="gallery" style={{ paddingTop: 0 }} ref={ref}>
      <div className="wrap">
        <SectionHead eyebrow={g.eyebrow} a={g.titleA} em={g.titleEm} />
        <div className="chips">
          {FILTERS.map((f) => (
            <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)}>
              {g.filters[f]}
            </button>
          ))}
        </div>
        <div className="gallery">
          {items.map((it) => (
            <BeforeAfter key={it.id} item={it} />
          ))}
        </div>
        <div className="gal-foot">
          <a className="btn ghost" href={CONTACT.instagram} target="_blank" rel="noopener noreferrer">{g.instagram}</a>
        </div>
      </div>
    </section>
  )
}
