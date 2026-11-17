import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext.jsx'
import { HUB } from '../lib/data.js'
import { gsap, prefersReducedMotion } from '../lib/motion.js'
import SectionHead from './SectionHead.jsx'
import HubIcon from './HubIcon.jsx'

// Home page hub: the supporting info lives on its own pages,
// so the home page stays short and focused on results and booking.
export default function GoodToKnow() {
  const { t } = useLang()
  const h = t.hub
  const ref = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('.hub-card', {
        y: 40, opacity: 0.3, duration: 0.9, ease: 'power3.out', stagger: 0.06,
        scrollTrigger: { trigger: '.hub', start: 'top 85%' },
      })
      // icons draw themselves, card by card, line by line
      gsap.utils.toArray('.hub-card').forEach((card, i) => {
        gsap.fromTo(card.querySelectorAll('.hub-icon path'), { strokeDashoffset: 1 }, {
          strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut', stagger: 0.18, delay: 0.25 + i * 0.12,
          scrollTrigger: { trigger: '.hub', start: 'top 80%' },
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section className="section" id="good-to-know" style={{ paddingTop: 0 }} ref={ref}>
      <div className="wrap">
        <SectionHead eyebrow={h.eyebrow} a={h.titleA} em={h.titleEm} />
        <div className="hub">
          {HUB.map(({ id, to }) => {
            const it = h.items[id]
            return (
              <Link key={id} to={to} className="hub-card" data-cursor="Open">
                <HubIcon id={id} />
                <span className="meta">{it.meta}</span>
                <h3>{it.title}</h3>
                <p>{it.text}</p>
                <span className="go" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
