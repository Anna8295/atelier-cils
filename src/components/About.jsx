import { useEffect, useRef } from 'react'
import { useLang } from '../i18n/LanguageContext.jsx'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/motion.js'

export default function About() {
  const { t } = useLang()
  const a = t.about
  const ref = useRef(null)
  const fillRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      // words fill with ink as you read
      const words = [...fillRef.current.querySelectorAll('.w')]
      ScrollTrigger.create({
        trigger: fillRef.current, start: 'top 80%', end: 'bottom 45%', scrub: true,
        onUpdate: (st) => {
          const n = Math.round(st.progress * words.length)
          words.forEach((w, i) => { w.style.color = i < n ? 'var(--ink)' : '' })
        },
      })
      gsap.from('.portrait', {
        clipPath: 'inset(30% 20% 30% 20% round 200px)', duration: 1.4, ease: 'expo.out',
        scrollTrigger: { trigger: '.portrait', start: 'top 85%' },
      })
      gsap.to('.portrait .mark', { yPercent: -25, ease: 'none', scrollTrigger: { trigger: '.portrait', scrub: true } })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section className="section" id="about" style={{ paddingTop: 0 }} ref={ref}>
      <div className="wrap about">
        <div className="portrait">
          <span className="mark">L</span>
          <span className="mono">{a.portrait}</span>
        </div>
        <div>
          <span className="eyebrow" style={{ marginBottom: 22 }}>{a.eyebrow}</span>
          <p className="fill-text" ref={fillRef}>
            {a.story.split(' ').map((w, i) => (
              <span className="w" key={i}>{w} </span>
            ))}
          </p>
          <div className="facts">
            {a.facts.map((f) => (
              <div key={f.label}>
                <div className="n">{f.n}</div>
                <p>{f.label}</p>
              </div>
            ))}
          </div>
          <ul className="certs">
            {a.certs.map(([name, meta]) => (
              <li key={name}>
                <span>{name}</span>
                <span>{meta}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
