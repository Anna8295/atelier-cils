import { useState } from 'react'
import { addDays, dayStatus, MAX_DAYS, toISO } from '../../lib/availability.js'

const SELECTABLE = ['open', 'few']

// Month grid, Monday first. Days show if they're closed, full or nearly full.
export default function Calendar({ month, setMonth, selected, onSelect, minutes, locale, b }) {
  const [now] = useState(() => new Date())
  const first = new Date(month.getFullYear(), month.getMonth(), 1)
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  const lead = (first.getDay() + 6) % 7 // Monday = 0

  const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const last = addDays(now, MAX_DAYS)
  const lastMonth = new Date(last.getFullYear(), last.getMonth(), 1)
  const canPrev = first > thisMonth
  const canNext = first < lastMonth
  const shift = (n) => setMonth(new Date(first.getFullYear(), first.getMonth() + n, 1))

  const cells = []
  for (let i = 0; i < lead; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(first.getFullYear(), first.getMonth(), d))

  const todayIso = toISO(now)

  return (
    <div className="cal">
      <div className="cal-head">
        <button type="button" className="cal-nav" onClick={() => shift(-1)} disabled={!canPrev} aria-label={b.prevMonth}>←</button>
        <span className="cal-month">{first.toLocaleDateString(locale, { month: 'long', year: 'numeric' })}</span>
        <button type="button" className="cal-nav" onClick={() => shift(1)} disabled={!canNext} aria-label={b.nextMonth}>→</button>
      </div>
      <div className="cal-grid" role="grid">
        {b.weekdays.map((w) => (
          <span key={w} className="cal-wd" aria-hidden="true">{w}</span>
        ))}
        {cells.map((d, i) => {
          if (!d) return <span key={`x${i}`} />
          const iso = toISO(d)
          const status = dayStatus(iso, minutes, now)
          const ok = SELECTABLE.includes(status)
          const label = d.toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long' })
          return (
            <button
              key={iso}
              type="button"
              className={`cal-day ${status}${iso === selected ? ' on' : ''}${iso === todayIso ? ' today' : ''}`}
              disabled={!ok}
              aria-pressed={iso === selected}
              aria-label={b.status[status] ? `${label}, ${b.status[status]}` : label}
              onClick={() => onSelect(iso)}
            >
              {d.getDate()}
            </button>
          )
        })}
      </div>
      <p className="cal-legend"><i aria-hidden="true" /> {b.legendFew}</p>
    </div>
  )
}
