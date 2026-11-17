import { useEffect, useRef } from 'react'
import { useLang } from '../i18n/LanguageContext.jsx'
import SectionHead from './SectionHead.jsx'

// Horizontal review strip: mouse drag to scroll, native swipe on touch.
export default function Reviews() {
  const { t } = useLang()
  const r = t.reviews
  const trackRef = useRef(null)

  useEffect(() => {
    const el = trackRef.current
    let down = false
    let startX = 0
    let startScroll = 0
    const onDown = (e) => {
      if (e.pointerType !== 'mouse') return
      down = true
      startX = e.clientX
      startScroll = el.scrollLeft
      el.classList.add('dragging')
    }
    const onMove = (e) => {
      if (down) el.scrollLeft = startScroll - (e.clientX - startX)
    }
    const onUp = () => {
      down = false
      el.classList.remove('dragging')
    }
    el.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      el.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [])

  return (
    <section className="section" style={{ paddingTop: 0 }} aria-labelledby="revH">
      <div className="wrap">
        <SectionHead eyebrow={r.eyebrow} a={r.titleA} em={r.titleEm} id="revH" style={{ marginBottom: 28 }} />
      </div>
      <div className="reviews" ref={trackRef} data-cursor="Drag">
        {r.items.map(([quote, name]) => (
          <article className="review" key={name}>
            <blockquote>“{quote}”</blockquote>
            <footer>
              <span>{name}</span>
              <span className="stars" aria-label="5 out of 5 stars">★★★★★</span>
            </footer>
          </article>
        ))}
      </div>
      <div className="wrap rev-meta">
        <div className="rating">
          <span className="big">4.9</span>
          <span className="mono" style={{ color: 'var(--muted)', fontSize: '.8rem' }}>{r.rating}</span>
        </div>
      </div>
    </section>
  )
}
