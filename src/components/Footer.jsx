import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext.jsx'
import { useToast } from '../lib/context.js'
import { BUSINESS, CONTACT, HOURS } from '../lib/data.js'
import { gsap, prefersReducedMotion } from '../lib/motion.js'
import HubIcon from './HubIcon.jsx'

const ORDER = [1, 2, 3, 4, 5, 6, 0] // Monday first
const YEAR = new Date().getFullYear()
const pad = (h) => String(h).padStart(2, '0') + ':00'

// weekday and minutes in Lausanne, whatever the visitor's time zone
function zurichNow() {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Zurich', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date())
  const get = (type) => parts.find((p) => p.type === type).value
  return { wd: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday')), mins: +get('hour') * 60 + +get('minute') }
}

// "Open now · until 19:00" or "Closed · opens tomorrow 09:00"
function openStatus({ wd, mins }, c) {
  const today = HOURS[wd]
  if (today && mins >= today[0] * 60 && mins < today[1] * 60) return { open: true, text: c.openNow(pad(today[1])) }
  if (today && mins < today[0] * 60) return { open: false, text: c.closedNow(c.today, pad(today[0])) }
  for (let i = 1; i <= 7; i++) {
    const d = (wd + i) % 7
    if (HOURS[d]) return { open: false, text: c.closedNow(i === 1 ? c.tomorrow : c.daysShort[d], pad(HOURS[d][0])) }
  }
  return { open: false, text: '' }
}

// "Tue – Wed 09:00–19:00": consecutive days with the same hours share a line
function groupHours(c, wd) {
  const groups = []
  ORDER.forEach((d) => {
    const key = JSON.stringify(HOURS[d])
    const last = groups[groups.length - 1]
    if (last && last.key === key) last.to = d
    else groups.push({ key, from: d, to: d, hours: HOURS[d] })
  })
  return groups.map((g) => ({
    today: ORDER.indexOf(wd) >= ORDER.indexOf(g.from) && ORDER.indexOf(wd) <= ORDER.indexOf(g.to),
    days: g.from === g.to ? c.daysShort[g.from] : `${c.daysShort[g.from]} – ${c.daysShort[g.to]}`,
    time: g.hours ? `${pad(g.hours[0])}–${pad(g.hours[1])}` : c.closed,
  }))
}

// Footer on every page: the wordmark, then studio, opening hours, contact,
// booking, and the legal links.
export default function Footer() {
  const { t } = useLang()
  const f = t.footer
  const c = t.contact
  const toast = useToast()
  const ref = useRef(null)
  const phoneRef = useRef(null)
  const [now, setNow] = useState(zurichNow)
  const status = openStatus(now, c)

  useEffect(() => {
    const id = setInterval(() => setNow(zurichNow()), 60000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('.wordmark', { xPercent: -12, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom bottom', scrub: true } })
      // column icons draw themselves, like the Good to know cards
      gsap.fromTo('.foot-icon path', { strokeDashoffset: 1 }, {
        strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut', stagger: 0.15,
        scrollTrigger: { trigger: '.foot-grid', start: 'top 90%' },
      })
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
          <div className="wordmark" aria-hidden="true">
            Atelier <em>Cils</em>
          </div>
          <div className="foot-grid">
            <div className="foot-col">
              <span className="foot-k"><HubIcon id="pin" className="foot-icon" />{c.studio}</span>
              <p>{BUSINESS.street}</p>
              <p>{BUSINESS.city}</p>
              <p className="foot-muted">{BUSINESS.directions}</p>
              <a className="foot-link" href={CONTACT.maps} target="_blank" rel="noopener noreferrer">{c.directions}</a>
            </div>

            <div className="foot-col">
              <span className="foot-k"><HubIcon id="clock" className="foot-icon" />{c.hours}</span>
              <ul className="foot-hours">
                {groupHours(c, now.wd).map((g) => (
                  <li key={g.days} className={g.today ? 'today' : ''}>
                    <span>{g.days}</span>
                    <span>{g.time}</span>
                  </li>
                ))}
              </ul>
              <p className={`foot-status${status.open ? ' open' : ''}`}>
                <i aria-hidden="true" />
                {status.text}
              </p>
            </div>

            <div className="foot-col">
              <span className="foot-k"><HubIcon id="chat" className="foot-icon" />{c.contact}</span>
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

          <div className="foot-row">
            <span>{f.rights(YEAR, BUSINESS)}</span>
            <nav aria-label="Legal">
              <Link to="/imprint">{f.imprint}</Link>
              <Link to="/privacy">{f.privacy}</Link>
              <Link to="/terms">{f.terms}</Link>
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
