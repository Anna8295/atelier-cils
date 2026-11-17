import { useEffect, useRef, useState } from 'react'
import { useLang } from '../i18n/LanguageContext.jsx'
import { useToast } from '../lib/context.js'
import { HOURS, CONTACT } from '../lib/data.js'
import SectionHead from './SectionHead.jsx'

// weekday in Lausanne, whatever the visitor's time zone
function zurichWeekday() {
  const wd = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Zurich', weekday: 'short' }).format(new Date())
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(wd)
}
const pad = (h) => String(h).padStart(2, '0') + ':00'
const ORDER = [1, 2, 3, 4, 5, 6, 0] // Monday first

export default function Contact() {
  const { t } = useLang()
  const c = t.contact
  const toast = useToast()
  const phoneRef = useRef(null)
  const [today, setToday] = useState(zurichWeekday)

  useEffect(() => {
    const id = setInterval(() => setToday(zurichWeekday()), 60000)
    return () => clearInterval(id)
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
    <section className="section" id="contact" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <SectionHead eyebrow={c.eyebrow} a={c.titleA} em={c.titleEm} />
        <div className="contact">
          <div className="map">
            <svg viewBox="0 0 400 300" aria-hidden="true">
              <rect width="400" height="300" fill="var(--surface)" />
              <path d="M0 236 C 80 222, 160 246, 240 232 S 360 222, 400 236 L400 300 L0 300Z" fill="var(--soft)" />
              <g stroke="var(--line)" strokeWidth="10" fill="none" strokeLinecap="round">
                <path d="M-10 120 C 90 110, 180 150, 410 96" />
                <path d="M180 -10 C 190 80, 210 160, 196 240" />
                <path d="M40 -10 L 120 230" />
                <path d="M300 -10 C 290 90, 330 150, 360 230" />
              </g>
              <g stroke="var(--line)" strokeWidth="3" fill="none">
                <path d="M0 60 L400 40" />
                <path d="M0 180 L400 170" />
                <path d="M260 0 L 240 240" />
              </g>
              <text x="22" y="270" fontFamily="DM Mono, monospace" fontSize="10" fill="var(--muted)" letterSpacing="2">{c.lake}</text>
              <circle cx="200" cy="128" r="22" fill="var(--accent)" opacity=".18" />
              <circle cx="200" cy="128" r="8" fill="var(--accent)" />
            </svg>
            <span className="pin-lbl">{c.pin}</span>
            <span className="coords">{CONTACT.coords}</span>
          </div>
          <div className="panel addr">
            <div>
              <h3>{c.street}</h3>
              <p style={{ color: 'var(--muted)' }}>{c.city}</p>
            </div>
            <div className="transit">
              <span><b>{c.metro[0]}</b> {c.metro[1]}</span>
              <span><b>{c.parking[0]}</b> {c.parking[1]}</span>
            </div>
            <table className="hours">
              <tbody>
                {ORDER.map((d) => (
                  <tr key={d} className={d === today ? 'today' : ''}>
                    <td>{c.days[d]}</td>
                    <td>{HOURS[d] ? `${pad(HOURS[d][0])} – ${pad(HOURS[d][1])}` : c.closed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="copyrow">
              <span className="mono" ref={phoneRef}>{CONTACT.phone}</span>
              <button type="button" className="small-btn" onClick={copy}>{c.copy}</button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              <a className="btn accent" href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp ↗</a>
              <a className="btn ghost" href={CONTACT.instagram} target="_blank" rel="noopener noreferrer">Instagram ↗</a>
              <a className="btn ghost" href={CONTACT.maps} target="_blank" rel="noopener noreferrer">{c.directions}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
