import { useEffect, useRef } from 'react'
import { useLang } from '../i18n/LanguageContext.jsx'
import { BUSINESS, STYLE_BY_ID } from '../lib/data.js'
import { gsap, prefersReducedMotion } from '../lib/motion.js'
import SectionHead from './SectionHead.jsx'
import HubIcon from './HubIcon.jsx'

// "3 800+" → 3800 and "+", so the number can count up and keep its format
function parseFact(n) {
  const num = Number(n.replace(/[^\d]/g, ''))
  const suffix = n.replace(/[\d\s]/g, '')
  return { num, suffix }
}
const fmt = (v) => Math.round(v).toLocaleString('en-US').replace(/,/g, ' ')

// Portrait placeholder: a close-up of her work until the real portrait is in.
const PORTRAIT = STYLE_BY_ID.volume.img

export default function About() {
  const { t } = useLang()
  const a = t.about
  const ref = useRef(null)
  const storyRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      // story: words rise in one after another, then all stay the same colour
      gsap.from(storyRef.current.querySelectorAll('.w'), {
        opacity: 0.12, y: 10, duration: 0.6, ease: 'power2.out', stagger: 0.025,
        scrollTrigger: { trigger: storyRef.current, start: 'top 85%' },
      })
      gsap.from('.portrait', {
        clipPath: 'inset(30% 20% 30% 20% round 200px)', duration: 1.4, ease: 'expo.out',
        scrollTrigger: { trigger: '.portrait', start: 'top 90%' },
      })
      gsap.to('.portrait img', { yPercent: 6, ease: 'none', scrollTrigger: { trigger: '.portrait', scrub: true } })
      // numbers count up
      ref.current.querySelectorAll('.facts .n').forEach((el) => {
        const { num, suffix } = parseFact(el.dataset.n)
        const o = { v: 0 }
        gsap.to(o, {
          v: num, duration: 1.6, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
          onUpdate: () => { el.textContent = fmt(o.v) + suffix },
        })
      })
      // group icons draw themselves
      gsap.fromTo('.cert-icon path', { strokeDashoffset: 1 }, {
        strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut', stagger: 0.2,
        scrollTrigger: { trigger: '.cert-groups', start: 'top 85%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section className="section" id="about" style={{ paddingTop: 0 }} ref={ref}>
      <div className="wrap">
        <SectionHead a={a.titleA} em={a.titleEm} />
        <div className="about">
          <figure className="portrait-wrap">
            <div className="portrait">
              <img src={PORTRAIT} alt="" />
            </div>
            <figcaption>{a.caption(BUSINESS.owner)}</figcaption>
          </figure>

          <div>
            <p className="story" ref={storyRef}>
              {a.story.split(' ').map((w, i) => (
                <span className="w" key={i}>{w} </span>
              ))}
            </p>

            <div className="facts">
              {a.facts.map((f) => (
                <div key={f.label}>
                  <div className="n" data-n={f.n}>{f.n}</div>
                  <p>{f.label}</p>
                </div>
              ))}
            </div>

            <div className="cert-groups">
              {a.groups.map((g) => (
                <div className="cert-group" key={g.title}>
                  <h3>
                    <HubIcon id={g.icon} className="cert-icon" />
                    {g.title}
                  </h3>
                  <ul className="certs">
                    {g.items.map(([name, meta]) => (
                      <li key={name}>
                        <span>{name}</span>
                        <span>{meta}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
