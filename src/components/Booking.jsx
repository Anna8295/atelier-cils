import { useState } from 'react'
import { useLang } from '../i18n/LanguageContext.jsx'
import { useBooking } from '../lib/context.js'
import { SERVICES, REFILLS, SLOTS, CONTACT } from '../lib/data.js'
import SectionHead from './SectionHead.jsx'

/*
  Two taps: a service, then a time. The summary bar shows the choice and
  hands over to the real booking system (Fresha) to confirm.
  `service` is shared through BookingContext, so "Book" links elsewhere
  (price list, quiz, refill calculator) arrive here preselected.
*/
export default function Booking() {
  const { t } = useLang()
  const { service, setService } = useBooking()
  const b = t.booking
  const [slot, setSlot] = useState(null)

  const options = [
    ...SERVICES.map((svc) => ({ name: t.services.items[svc.id].name, price: `CHF ${svc.price}` })),
    { name: b.refill, price: `${b.from} CHF ${REFILLS[0].price}` },
  ]
  const chosen = options.find((o) => o.name === service)
  const summary = [chosen?.name, slot, chosen?.price].filter(Boolean).join(' · ')

  return (
    <section className="section" id="book" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <SectionHead eyebrow={b.eyebrow} a={b.titleA} em={b.titleEm} />

        <div className="bk">
          <div className="bk-row">
            <span className="bk-label">{b.service}</span>
            <div className="bk-chips">
              {options.map((o) => (
                <button key={o.name} type="button" className="chip" aria-pressed={service === o.name} onClick={() => setService(o.name)}>
                  {o.name}
                </button>
              ))}
            </div>
          </div>

          <div className="bk-row">
            <span className="bk-label">{b.time}</span>
            <div className="bk-chips">
              {SLOTS.map((s) => (
                <button key={s} type="button" className="chip mono-chip" aria-pressed={slot === s} onClick={() => setSlot(s)}>
                  {s}
                </button>
              ))}
              <a className="chip ghost-chip" href={CONTACT.booking} target="_blank" rel="noopener noreferrer">{b.more}</a>
            </div>
          </div>

          <div className="bk-foot">
            <p className={`bk-sum${summary ? '' : ' empty'}`} aria-live="polite">{summary || b.pick}</p>
            <a className="btn" href={CONTACT.booking} target="_blank" rel="noopener noreferrer" data-cursor="Book">{b.continue}</a>
          </div>
        </div>

        <details className="bk-policy">
          <summary>
            <span>{b.policySummary}</span>
            <span className="bk-policy-toggle">{b.policyToggle}</span>
          </summary>
          <ul>
            {b.policies.map(([k, v]) => (
              <li key={k}>
                <span className="k">{k}</span>
                <span>{v}</span>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </section>
  )
}
