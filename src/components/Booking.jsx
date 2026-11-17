import { useState } from 'react'
import { useLang } from '../i18n/LanguageContext.jsx'
import { useBooking, useToast } from '../lib/context.js'
import { SLOTS, PAYMENTS, CONTACT } from '../lib/data.js'

// Preview of the booking widget. On the live site the slots come from
// Fresha (or Salonkee / Planity); nothing is booked here.
export default function Booking() {
  const { t } = useLang()
  const { service } = useBooking()
  const toast = useToast()
  const b = t.booking
  const [slot, setSlot] = useState(null)

  const pick = (s) => {
    setSlot(s)
    toast(b.slotPicked(s))
  }

  return (
    <section className="section" id="book" style={{ paddingTop: 0 }}>
      <div className="wrap book">
        <div className="book-main">
          <div style={{ display: 'grid', gap: 16 }}>
            <span className="eyebrow" style={{ color: 'inherit', opacity: 0.8 }}>{b.eyebrow}</span>
            <h2>
              {b.titleA}
              <em>{b.titleEm}</em>
            </h2>
            <p>{service ? b.introFor(service) : b.intro}</p>
          </div>
          <div className="widget" aria-label={b.widget}>
            <span>{b.widget}</span>
            <div className="slots">
              {SLOTS.map((s) => (
                <button key={s} type="button" aria-pressed={slot === s} onClick={() => pick(s)}>{s}</button>
              ))}
            </div>
          </div>
          <div>
            <a className="btn" href={CONTACT.booking} target="_blank" rel="noopener noreferrer" data-cursor="Book">{b.calendar}</a>
          </div>
        </div>
        <div className="panel">
          <ul className="policy">
            {b.policies.map(([k, v], i) => (
              <li key={k}>
                <span className="k">{k}</span>
                <span>
                  {v}
                  {i === b.policies.length - 1 && (
                    <span className="pay">
                      {PAYMENTS.map((p) => <span key={p}>{p}</span>)}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
