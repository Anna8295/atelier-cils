import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext.jsx'
import { useBooking } from '../lib/context.js'
import { SERVICES, REFILLS, STYLE_BY_ID } from '../lib/data.js'
import { gsap, prefersReducedMotion } from '../lib/motion.js'
import SectionHead from './SectionHead.jsx'

const imgFor = (id) => STYLE_BY_ID[id]?.img // brows have no lash photo

const TOUCH = '(hover: none), (pointer: coarse)'

// true on phones and tablets, where there is no hover
function useTouch() {
  const [touch, setTouch] = useState(() => window.matchMedia(TOUCH).matches)
  useEffect(() => {
    const mq = window.matchMedia(TOUCH)
    const onChange = () => setTouch(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return touch
}

/*
  Price list, like a salon menu.
  Mouse: hovering a row shows its lash photo next to the cursor (one
  floating frame that follows with a little lag and tilt); clicking books.
  Touch: there is no hover, so tapping a row opens it in place with a large
  photo and a Book button; tapping again (or another row) closes it.
*/
export default function Services() {
  const { t } = useLang()
  const { setService } = useBooking()
  const s = t.services
  const ref = useRef(null)
  const floatRef = useRef(null)
  const [active, setActive] = useState(null)
  const touch = useTouch()
  const [open, setOpen] = useState(null) // touch: the row that is opened

  // touch: once a row has opened, scroll just enough to show its photo and Book button
  useEffect(() => {
    if (!open) return
    const id = setTimeout(() => {
      document.getElementById(`peek-${open}`)?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'nearest' })
    }, 380)
    return () => clearTimeout(id)
  }, [open])

  // rows rise in
  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('.menu-row', {
        y: 36, opacity: 0.25, duration: 0.9, ease: 'power3.out', stagger: 0.06,
        scrollTrigger: { trigger: '.menu', start: 'top 85%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  // floating photo follows the cursor
  useEffect(() => {
    const el = floatRef.current
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const still = prefersReducedMotion()
    let x = 0, y = 0, cx = 0, cy = 0, raf
    const onMove = (e) => {
      x = e.clientX
      y = e.clientY
      if (still || !raf) { cx = x; cy = y }
    }
    const loop = () => {
      const dx = x - cx
      cx += dx * 0.14
      cy += (y - cy) * 0.14
      const tilt = still ? 0 : Math.max(-10, Math.min(10, dx * 0.08))
      el.style.transform = `translate(${cx + 28}px, ${cy - 150}px) rotate(${tilt}deg)`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('pointermove', onMove)
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <section className="section" id="services" ref={ref}>
      <div className="wrap">
        <SectionHead a={s.titleA} em={s.titleEm} lede={s.lede} />

        <ul className="menu" onMouseLeave={() => setActive(null)}>
          {SERVICES.map((svc) => {
            const txt = s.items[svc.id]
            const img = imgFor(svc.id)
            const isOpen = touch && open === svc.id
            const rowProps = touch
              ? {
                  as: 'button',
                  type: 'button',
                  'aria-expanded': isOpen,
                  'aria-controls': `peek-${svc.id}`,
                  onClick: () => setOpen(isOpen ? null : svc.id),
                }
              : {
                  as: 'a',
                  href: '#book',
                  'data-cursor': img ? undefined : 'Book',
                  onMouseEnter: () => setActive(svc.id),
                  onClick: () => setService(svc.id),
                }
            const { as: Row, ...props } = rowProps
            return (
              <li key={svc.id}>
                <Row className="menu-row" {...props}>
                  <span className="menu-thumb" aria-hidden="true">
                    {img ? (
                      <img src={img} alt="" loading="lazy" />
                    ) : (
                      <svg viewBox="0 0 64 80"><path d="M14 44c8-12 28-14 38-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>
                    )}
                  </span>
                  {!touch && <span className="sr-only">{s.book} </span>}
                  <span className="menu-name">
                    {txt.name}
                    {svc.featured && <span className="pill">{s.popular}</span>}
                  </span>
                  <span className="menu-desc">
                    <span className="d">{txt.desc}</span>
                    <span className="spec">
                      <span className="m-only">{svc.minutes} min · </span>
                      {svc.ratio} · {svc.tags.join(' · ')}
                    </span>
                  </span>
                  <span className="menu-time">{svc.minutes} min</span>
                  <span className="menu-price">CHF {svc.price}</span>
                  <span className="menu-go" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </span>
                </Row>
                {touch && (
                  <div className={`menu-peek${isOpen ? ' open' : ''}`} id={`peek-${svc.id}`} inert={!isOpen}>
                    <div className="menu-peek-inner">
                      <div className="peek">
                        {img && (
                          <div className="peek-img">
                            <img src={img} alt={t.guide.styles[svc.id]?.alt ?? ''} loading="lazy" />
                          </div>
                        )}
                        <div className="peek-foot">
                          <span className="peek-meta">{svc.minutes} min · CHF {svc.price}</span>
                          <a className="btn accent" href="#book" data-cursor="Book" onClick={() => setService(svc.id)}>
                            {s.bookName(txt.name)}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            )
          })}
        </ul>

        <div className={`menu-float${active && imgFor(active) ? ' on' : ''}`} ref={floatRef} aria-hidden="true">
          {SERVICES.filter((svc) => imgFor(svc.id)).map((svc) => (
            <img key={svc.id} src={imgFor(svc.id)} alt="" className={active === svc.id ? 'on' : ''} />
          ))}
        </div>

        <div className="refill-note">
          <span><b>{s.refillsLabel}</b> {s.refillsFor}</span>
          {REFILLS.map((r, i) => (
            <span key={r.weeks}>
              {i === 0 ? s.refill2 : s.refill3} <span className="mono">CHF {r.price} · {r.minutes} min</span>
            </span>
          ))}
          <span>{s.refillNew}</span>
        </div>
        <div className="section-foot">
          <Link to="/style" className="btn ghost">
            <span className="long-text">{s.quizLink}</span>
            <span className="short-text">{s.quizLinkShort}</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
