import { useEffect, useMemo, useRef, useState } from 'react'
import { useLang } from '../i18n/LanguageContext.jsx'
import { useBooking } from '../lib/context.js'
import SectionHead from './SectionHead.jsx'
import HubIcon from './HubIcon.jsx'
import { icsFile } from '../lib/availability.js'
import { STUDIO_ADDRESS } from '../lib/data.js'
import { gsap, prefersReducedMotion } from '../lib/motion.js'

// icon per aftercare tip, in timeline order
const ICONS = ['dry', 'aftercare', 'oil', 'moon', 'visit']

const DAY = 864e5

function isoDaysAgo(n) {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toISOString().slice(0, 10)
}

// refill window: ideal 14–21 days after the last appointment, new set after 28
function refillStatus(value, a, locale) {
  if (!value) return { msg: [a.empty, ''], pct: 0, windowIso: null }
  const last = new Date(value + 'T12:00:00')
  const days = Math.floor((Date.now() - last) / DAY)
  const fmt = (d) => d.toLocaleDateString(locale, { weekday: 'short', day: 'numeric', month: 'short' })
  const from = fmt(new Date(last.getTime() + 14 * DAY))
  const to = fmt(new Date(last.getTime() + 21 * DAY))
  const pct = Math.max(0, Math.min(100, (days / 28) * 100))
  const open = new Date(last.getTime() + 14 * DAY)
  const windowIso = days < 14 ? open.toISOString().slice(0, 10) : null // reminder only makes sense ahead of time
  if (days < 0) return { msg: a.future, pct: 0, windowIso: null }
  if (days < 14) return { msg: a.early(from, to, days), pct, windowIso }
  if (days <= 21) return { msg: a.due(to, days), pct, windowIso }
  if (days <= 28) return { msg: a.soon(days), pct, windowIso }
  return { msg: a.newSet(days), pct, windowIso }
}

export default function Aftercare() {
  const { t, lang } = useLang()
  const { setService } = useBooking()
  const a = t.aftercare
  const [date, setDate] = useState(() => isoDaysAgo(12))
  const listRef = useRef(null)

  // timeline icons draw themselves one after another
  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      listRef.current.querySelectorAll('.tl-svg').forEach((svg, i) => {
        gsap.fromTo(svg.querySelectorAll('path'), { strokeDashoffset: 1 }, {
          strokeDashoffset: 0, duration: 1, ease: 'power2.inOut', stagger: 0.15, delay: i * 0.15,
          scrollTrigger: { trigger: listRef.current, start: 'top 80%' },
        })
      })
    }, listRef)
    return () => ctx.revert()
  }, [])
  const { msg, pct, windowIso } = refillStatus(date, a, lang === 'en' ? 'en-GB' : lang)

  // "Add a reminder": a 10:00 calendar event on the day the refill window opens
  const reminder = useMemo(() => {
    if (!windowIso) return null
    const text = icsFile({ title: a.remindTitle, iso: windowIso, start: 10 * 60, minutes: 15, location: STUDIO_ADDRESS })
    return URL.createObjectURL(new Blob([text], { type: 'text/calendar' }))
  }, [windowIso, a.remindTitle])
  useEffect(() => () => { if (reminder) URL.revokeObjectURL(reminder) }, [reminder])

  return (
    <section className="section" id="aftercare">
      <div className="wrap">
        <SectionHead a={a.titleA} em={a.titleEm} lede={a.lede} />
        <div className="care">
          <ol className="timeline" ref={listRef}>
            {a.timeline.map(([when, title, text], i) => (
              <li key={title}>
                <span className="tl-icon"><HubIcon id={ICONS[i]} className="tl-svg" /></span>
                <div>
                  <span className="when">{when}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="panel calc">
            <h3>{a.calcTitle}</h3>
            <label htmlFor="lastSet">{a.calcLabel}</label>
            <input type="date" id="lastSet" value={date} onChange={(e) => setDate(e.target.value)} />
            <div className="zones" aria-hidden="true">
              <div className="zone-bar">
                <span className="z z-fresh" />
                <span className="z z-window" />
                <span className="z z-late" />
                {date && <span className="z-today" style={{ left: `${pct}%` }}><b>{a.zones.today}</b></span>}
              </div>
              <div className="zone-l">
                <span>{a.zones.fresh}</span>
                <span className="w">{a.zones.window}</span>
                <span>{a.zones.newSet}</span>
              </div>
            </div>
            <p className="calc-out" aria-live="polite">
              <b>{msg[0]}</b>
              {msg[1]}
            </p>
            <div className="calc-ctas">
              <a className="btn accent" href="#book" data-cursor="Book" onClick={() => setService('refill2')}>
                {a.book}
              </a>
              {reminder && <a className="btn ghost" href={reminder} download="lash-refill-reminder.ics">{a.remind}</a>}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
