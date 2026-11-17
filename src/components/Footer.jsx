import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext.jsx'
import { useToast } from '../lib/context.js'
import { CONTACT, HOURS } from '../lib/data.js'
import { gsap, prefersReducedMotion } from '../lib/motion.js'

const ORDER = [1, 2, 3, 4, 5, 6, 0] // Monday first
const pad = (h) => String(h).padStart(2, '0') + ':00'

// "Tue – Wed 09:00–19:00": consecutive days with the same hours share a line
function groupHours(c) {
  const groups = []
  ORDER.forEach((d) => {
    const key = JSON.stringify(HOURS[d])
    const last = groups[groups.length - 1]
    if (last && last.key === key) last.to = d
    else groups.push({ key, from: d, to: d, hours: HOURS[d] })
  })
  return groups.map((g) => ({
    days: g.from === g.to ? c.daysShort[g.from] : `${c.daysShort[g.from]} – ${c.daysShort[g.to]}`,
    time: g.hours ? `${pad(g.hours[0])}–${pad(g.hours[1])}` : c.closed,
  }))
}

// Footer on every page: studio, opening hours, contact, booking,
// then the wordmark and the legal links.
export default function Footer() {
  const { t } = useLang()
  const f = t.footer
  const c = t.contact
  const toast = useToast()
  const ref = useRef(null)
  const phoneRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('.wordmark', { xPercent: -12, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom bottom', scrub: true } })
    }, ref)
    return () => ctx.revert()
  }, [])

  const copy = () => {
    navigator.clipboard?.writeText(CONTACT.phone).then(
      () => toast(c.copied),
      () => {
        window.getSelection().selectAllChildren(phoneRef.current)
        toast(c.selected)
      },
    )
  }

  return (
    <>
      <footer className="site" id="contact" ref={ref}>
        <div className="wrap">
          <div className="foot-grid">
            <div className="foot-col">
              <span className="foot-k">{c.studio}</span>
              <p>{c.street}</p>
              <p>{c.city}</p>
              <p className="foot-muted">{c.metro}</p>
              <a className="foot-link" href={CONTACT.maps} target="_blank" rel="noopener noreferrer">{c.directions}</a>
            </div>

            <div className="foot-col">
              <span className="foot-k">{c.hours}</span>
              <ul className="foot-hours">
                {groupHours(c).map((g) => (
                  <li key={g.days}>
                    <span>{g.days}</span>
                    <span>{g.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="foot-col">
              <span className="foot-k">{c.contact}</span>
              <p className="foot-phone">
                <span ref={phoneRef}>{CONTACT.phone}</span>
                <button type="button" className="foot-copy" onClick={copy}>{c.copy}</button>
              </p>
              <a className="foot-link" href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp ↗</a>
              <a className="foot-link" href={CONTACT.instagram} target="_blank" rel="noopener noreferrer">Instagram ↗</a>
            </div>

            <div className="foot-col foot-cta">
              <a className="btn accent" href="#book" data-cursor="Book">{t.nav.book}</a>
              <Link className="foot-link" to="/gift">{f.vouchers}</Link>
              <Link className="foot-link" to="/visit#faq">{f.faq}</Link>
            </div>
          </div>

          <div className="wordmark" aria-hidden="true">
            Atelier <em>Cils</em>
          </div>
          <div className="foot-row">
            <span>{f.rights}</span>
            <nav aria-label="Legal">
              <a href="#top">{f.imprint}</a>
              <a href="#top">{f.privacy}</a>
            </nav>
          </div>
        </div>
      </footer>
      {/* sticky booking bar on phones */}
      <div className="mbar">
        <a className="btn accent" href="#book">{t.nav.book}</a>
        <a className="btn ghost" href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>
      </div>
    </>
  )
}
