import { useEffect, useRef } from 'react'
import { useLang } from '../i18n/LanguageContext.jsx'
import { gsap, prefersReducedMotion } from '../lib/motion.js'
import SectionHead from './SectionHead.jsx'

// Steps scroll sideways while the section is pinned (wide screens only).
export default function FirstVisit() {
  const { t } = useLang()
  const v = t.visit
  const ref = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const mm = gsap.matchMedia()
    mm.add('(min-width: 900px)', () => {
      const track = trackRef.current
      const dist = () => Math.max(0, track.scrollWidth - window.innerWidth)
      gsap.to(track, {
        x: () => -dist(),
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 1, invalidateOnRefresh: true },
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <section className="visit" id="first-visit" ref={ref}>
      <div className="visit-inner">
        <div className="wrap">
          <SectionHead eyebrow={v.eyebrow} a={v.titleA} em={v.titleEm} lede={v.lede} />
        </div>
        <div className="steps" ref={trackRef}>
          {v.steps.map((s) => (
            <article className="step" key={s.title}>
              <span className="num">{s.num}</span>
              <h3>{s.title}</h3>
              {s.text && <p>{s.text}</p>}
              {s.list && (
                <ul>
                  {s.list.map((li) => <li key={li}>{li}</li>)}
                </ul>
              )}
              <span className="time">{s.time}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
