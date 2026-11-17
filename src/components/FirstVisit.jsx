import { useEffect, useRef } from 'react'
import { useLang } from '../i18n/LanguageContext.jsx'
import { gsap, prefersReducedMotion } from '../lib/motion.js'
import SectionHead from './SectionHead.jsx'
import HubIcon from './HubIcon.jsx'

const ICONS = ['patch', 'ready', 'consult', 'apply', 'mirror']

// Steps scroll sideways while the section is pinned (wide screens only).
export default function FirstVisit() {
  const { t } = useLang()
  const v = t.visit
  const ref = useRef(null)
  const trackRef = useRef(null)
  const barRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const mm = gsap.matchMedia()
    // icons draw themselves as the cards come in
    const ctx = gsap.context(() => {
      gsap.fromTo('.step-icon path', { strokeDashoffset: 1 }, {
        strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut', stagger: 0.12,
        scrollTrigger: { trigger: trackRef.current, start: 'top 85%' },
      })
    }, ref)
    mm.add('(min-width: 900px)', () => {
      const track = trackRef.current
      const dist = () => Math.max(0, track.scrollWidth - window.innerWidth)
      gsap.to(track, {
        x: () => -dist(),
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current, start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 1, invalidateOnRefresh: true,
          onUpdate: (st) => { barRef.current.style.transform = `scaleX(${st.progress})` },
        },
      })
    })
    return () => { mm.revert(); ctx.revert() }
  }, [])

  return (
    <section className="visit" id="first-visit" ref={ref}>
      <div className="visit-inner">
        <div className="wrap">
          <SectionHead a={v.titleA} em={v.titleEm} lede={v.lede} />
        </div>
        <div className="steps" ref={trackRef}>
          {v.steps.map((s, i) => (
            <article className="step" key={s.title}>
              <div className="step-top">
                <span className="step-n">{String(i + 1).padStart(2, '0')}</span>
                <HubIcon id={ICONS[i]} className="step-icon" />
              </div>
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
        <div className="wrap">
          <div className="steps-progress" aria-hidden="true"><i ref={barRef} /></div>
        </div>
      </div>
    </section>
  )
}
