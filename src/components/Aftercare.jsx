import { useState } from 'react'
import { useLang } from '../i18n/LanguageContext.jsx'
import { useBooking } from '../lib/context.js'
import SectionHead from './SectionHead.jsx'

const DAY = 864e5

function isoDaysAgo(n) {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toISOString().slice(0, 10)
}

// refill window: ideal 14–21 days after the last appointment, new set after 28
function refillStatus(value, a, locale) {
  if (!value) return { msg: [a.empty, ''], pct: 0 }
  const last = new Date(value + 'T12:00:00')
  const days = Math.floor((Date.now() - last) / DAY)
  const fmt = (d) => d.toLocaleDateString(locale, { weekday: 'short', day: 'numeric', month: 'short' })
  const from = fmt(new Date(last.getTime() + 14 * DAY))
  const to = fmt(new Date(last.getTime() + 21 * DAY))
  const pct = Math.max(4, Math.min(100, (days / 28) * 100))
  if (days < 0) return { msg: a.future, pct: 4 }
  if (days < 14) return { msg: a.early(from, to, days), pct }
  if (days <= 21) return { msg: a.due(to, days), pct }
  if (days <= 28) return { msg: a.soon(days), pct }
  return { msg: a.newSet(days), pct }
}

export default function Aftercare() {
  const { t, lang } = useLang()
  const { setService } = useBooking()
  const a = t.aftercare
  const [date, setDate] = useState(() => isoDaysAgo(12))
  const { msg, pct } = refillStatus(date, a, lang === 'en' ? 'en-GB' : lang)

  return (
    <section className="section" id="aftercare">
      <div className="wrap">
        <SectionHead eyebrow={a.eyebrow} a={a.titleA} em={a.titleEm} />
        <div className="care">
          <ol className="timeline">
            {a.timeline.map(([when, title, text]) => (
              <li key={title}>
                <span className="when">{when}</span>
                <div>
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
            <div className="meter" aria-hidden="true">
              <i style={{ width: `${pct}%` }} />
            </div>
            <div className="meter-l">
              {a.meter.map((m) => <span key={m}>{m}</span>)}
            </div>
            <p className="calc-out" aria-live="polite">
              <b>{msg[0]}</b>
              {msg[1]}
            </p>
            <a className="btn accent" href="#book" data-cursor="Book" onClick={() => setService('Refill')}>
              {a.book}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
