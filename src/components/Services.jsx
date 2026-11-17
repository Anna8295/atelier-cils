import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext.jsx'
import { useBooking } from '../lib/context.js'
import { SERVICES, REFILLS } from '../lib/data.js'
import { gsap, prefersReducedMotion } from '../lib/motion.js'
import SectionHead from './SectionHead.jsx'

// Services as tear-off appointment cards.
export default function Services() {
  const { t } = useLang()
  const { setService } = useBooking()
  const ref = useRef(null)
  const s = t.services

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('.appt', {
        y: 50, opacity: 0.3, rotate: 1.5, duration: 1, ease: 'power3.out', stagger: 0.08,
        scrollTrigger: { trigger: '.cards', start: 'top 85%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section className="section" id="services" ref={ref}>
      <div className="wrap">
        <SectionHead eyebrow={s.eyebrow} a={s.titleA} em={s.titleEm} lede={s.lede} />
        <div className="cards">
          {SERVICES.map((svc) => {
            const txt = s.items[svc.id]
            return (
              <article key={svc.id} className={`appt${svc.featured ? ' featured' : ''}`}>
                <div className="appt-top">
                  <div className="kicker">
                    <span>{txt.kicker}</span>
                    <span>{svc.ratio}</span>
                  </div>
                  <h3>{txt.name}</h3>
                  <p>{txt.desc}</p>
                  <div className="tags">
                    {svc.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="stub">
                  <div className="price">
                    <small>{svc.minutes} {s.min}</small>CHF {svc.price}
                  </div>
                  <a className="btn" href="#book" data-cursor="Book" onClick={() => setService(txt.name)}>
                    {s.book}
                  </a>
                </div>
              </article>
            )
          })}
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
        <Link to="/style" className="text-link">{s.quizLink}</Link>
      </div>
    </section>
  )
}
