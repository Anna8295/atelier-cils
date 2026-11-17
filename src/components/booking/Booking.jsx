import { useEffect, useMemo, useState } from 'react'
import { useLang } from '../../i18n/LanguageContext.jsx'
import { useBooking } from '../../lib/context.js'
import { STUDIO_ADDRESS } from '../../lib/data.js'
import { fromISO, icsFile, slotsFor } from '../../lib/availability.js'
import SectionHead from '../SectionHead.jsx'
import useBookable from './useBookable.js'
import Calendar from './Calendar.jsx'
import TimeSlots from './TimeSlots.jsx'
import DetailsForm from './DetailsForm.jsx'
import { EMPTY_FORM, validate } from './form.js'
import Summary from './Summary.jsx'

const STEPS = ['service', 'date', 'details']

/*
  Booking flow: service → date & time → details → done.
  UI only for now: free times come from lib/availability.js (example
  bookings), and "Confirm" just shows the done screen. Later the confirm
  step posts to the backend and availability reads real bookings.
*/
export default function Booking() {
  const { t, lang } = useLang()
  const b = t.booking
  const locale = lang === 'en' ? 'en-GB' : lang
  const { service, setService } = useBooking()
  const bookable = useBookable()

  // a service picked elsewhere on the site (price list, quiz…) skips step 1
  const [stepState, setStep] = useState(null)
  const step = stepState ?? (service ? 'date' : 'service')
  const [date, setDate] = useState(null)
  const [time, setTime] = useState(null)
  const [month, setMonth] = useState(() => new Date())
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})

  const svc = bookable.find((x) => x.id === service) ?? null
  const slots = useMemo(() => (svc && date ? slotsFor(date, svc.minutes) : []), [svc, date])
  const chosenTime = slots.includes(time) ? time : null // a new service may not fit the old time

  const pickService = (id) => {
    setService(id)
    setStep('date')
  }
  const pickDate = (iso) => {
    setDate(iso)
    setTime(null)
  }
  // while typing, a field's error disappears as soon as it's fixed
  const updateForm = (next) => {
    setForm(next)
    if (Object.keys(errors).length === 0) return
    const now = validate(next, b.form)
    setErrors(Object.fromEntries(Object.keys(errors).filter((k) => now[k]).map((k) => [k, now[k]])))
  }
  const confirm = (e) => {
    e.preventDefault()
    const errs = validate(form, b.form)
    setErrors(errs)
    if (Object.keys(errs).length === 0) setStep('done')
  }
  const reset = () => {
    setService(null)
    setDate(null)
    setTime(null)
    setForm(EMPTY_FORM)
    setErrors({})
    setStep(null)
  }

  // "Add to calendar" file for the done screen
  const ics = useMemo(() => {
    if (step !== 'done' || !svc || !date || chosenTime == null) return null
    const text = icsFile({ title: b.done.icsTitle(svc.name), iso: date, start: chosenTime, minutes: svc.minutes, location: STUDIO_ADDRESS })
    return URL.createObjectURL(new Blob([text], { type: 'text/calendar' }))
  }, [step, svc, date, chosenTime, b])
  useEffect(() => () => { if (ics) URL.revokeObjectURL(ics) }, [ics])

  const stepIndex = STEPS.indexOf(step)
  const canOpen = (s) => (s === 'service') || (s === 'date' && svc) || (s === 'details' && svc && chosenTime != null)

  return (
    <section className="section" id="book" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <SectionHead a={b.titleA} em={b.titleEm} />

        <div className="bkx">
          <Summary svc={svc} date={date} time={chosenTime} locale={locale} b={b} goTo={setStep} locked={step === 'done'} />

          <div className="bk-main">
            {step !== 'done' && (
              <ol className="bk-steps">
                {STEPS.map((s, i) => (
                  <li key={s} className={i === stepIndex ? 'now' : i < stepIndex ? 'past' : ''}>
                    <button type="button" disabled={!canOpen(s) || i === stepIndex} onClick={() => setStep(s)}>
                      <span className="n">{i + 1}</span> {b.steps[s]}
                    </button>
                  </li>
                ))}
              </ol>
            )}

            <div className="bk-stage" key={step}>
              {step === 'service' && (
                <>
                  <h3 className="bk-h">{b.chooseService}</h3>
                  <div className="svc-grid">
                    {bookable.map((x) => (
                      <button key={x.id} type="button" className="svc-opt" aria-pressed={service === x.id} onClick={() => pickService(x.id)}>
                        <span className="svc-name">{x.name}</span>
                        <span className="svc-meta">{x.minutes} min · CHF {x.price}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {step === 'date' && svc && (
                <>
                  <div className="date-grid">
                    <div>
                      <h3 className="bk-h">{b.pickDay}</h3>
                      <Calendar month={month} setMonth={setMonth} selected={date} onSelect={pickDate} minutes={svc.minutes} locale={locale} b={b} />
                    </div>
                    <div>
                      <h3 className="bk-h">{b.pickTime}</h3>
                      {date ? (
                        <>
                          <p className="bk-dayname">{fromISO(date).toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                          <TimeSlots slots={slots} selected={chosenTime} onSelect={setTime} b={b} />
                        </>
                      ) : (
                        <p className="bk-hint">{b.noDay}</p>
                      )}
                    </div>
                  </div>
                  <div className="bk-actions">
                    <button type="button" className="bk-back" onClick={() => setStep('service')}>{b.back}</button>
                    <button type="button" className="btn accent" disabled={chosenTime == null} onClick={() => setStep('details')}>{b.continue}</button>
                  </div>
                </>
              )}

              {step === 'details' && (
                <form onSubmit={confirm} noValidate>
                  <DetailsForm form={form} setForm={updateForm} errors={errors} f={b.form} />
                  <div className="bk-actions">
                    <button type="button" className="bk-back" onClick={() => setStep('date')}>{b.back}</button>
                    <button type="submit" className="btn accent">{b.confirm}</button>
                  </div>
                </form>
              )}

              {step === 'done' && (
                <div className="bk-done">
                  <svg className="done-check" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M24 4a20 20 0 1 1 0 40a20 20 0 1 1 0-40" pathLength="1" />
                    <path d="M15 24.5l6 6 12-13" pathLength="1" />
                  </svg>
                  <h3>{b.done.title}</h3>
                  <p>{b.done.text(form.email.trim())}</p>
                  <div className="bk-actions start">
                    {ics && <a className="btn" href={ics} download="atelier-cils.ics">{b.done.ics}</a>}
                    <button type="button" className="btn ghost" onClick={reset}>{b.done.again}</button>
                  </div>
                </div>
              )}
            </div>
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
