import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext.jsx'
import { TERMS, VOUCHER_AMOUNTS } from '../lib/data.js'
import { gsap, prefersReducedMotion } from '../lib/motion.js'
import SectionHead from './SectionHead.jsx'
import HubIcon from './HubIcon.jsx'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const EMPTY = { to: '', from: '', message: '', email: '' }

/*
  Gift voucher: the card on the left fills in live and tilts with the
  mouse; the form sends a request (UI only for now, the real flow would
  email a TWINT/card payment link and then the voucher).
*/
export default function Voucher() {
  const { t } = useLang()
  const v = t.voucher
  const [amount, setAmount] = useState(150)
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [done, setDone] = useState(false)
  const ref = useRef(null)
  const amtRef = useRef(null)
  const cardRef = useRef(null)

  // amount counts up/down to the new value
  useEffect(() => {
    const el = amtRef.current
    if (prefersReducedMotion()) { el.textContent = amount; return }
    const o = { v: +el.textContent || amount }
    const tw = gsap.to(o, { v: amount, duration: 0.6, ease: 'power2.out', onUpdate: () => { el.textContent = Math.round(o.v) } })
    return () => tw.kill()
  }, [amount])

  // card arrives, icons draw
  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('.vcard-tilt', { y: 50, rotate: -6, opacity: 0, duration: 1.2, ease: 'expo.out', delay: 0.15 })
      gsap.fromTo('.vcard-eye path', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut', stagger: 0.25, delay: 0.5 })
      gsap.fromTo('.how-icon path', { strokeDashoffset: 1 }, {
        strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut', stagger: 0.15,
        scrollTrigger: { trigger: '.how', start: 'top 90%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  // 3D tilt following the pointer (fine pointers only)
  const tilt = (e) => {
    if (prefersReducedMotion() || e.pointerType !== 'mouse') return
    const r = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    cardRef.current.style.setProperty('--rx', `${(-y * 12).toFixed(2)}deg`)
    cardRef.current.style.setProperty('--ry', `${(x * 14).toFixed(2)}deg`)
    cardRef.current.style.setProperty('--gx', `${(x + 0.5) * 100}%`)
    cardRef.current.style.setProperty('--gy', `${(y + 0.5) * 100}%`)
  }
  const untilt = () => {
    cardRef.current.style.setProperty('--rx', '0deg')
    cardRef.current.style.setProperty('--ry', '0deg')
  }

  const validate = (f) => {
    const errs = {}
    if (!f.to.trim()) errs.to = v.required
    if (!f.email.trim()) errs.email = v.required
    else if (!EMAIL.test(f.email.trim())) errs.email = v.badEmail
    return errs
  }
  const set = (key) => (e) => {
    const next = { ...form, [key]: e.target.value }
    setForm(next)
    if (errors[key]) { const now = validate(next); setErrors({ ...errors, [key]: now[key] }) }
  }
  const submit = (e) => {
    e.preventDefault()
    const errs = validate(form)
    setErrors(errs)
    if (Object.keys(errs).length === 0) setDone(true)
  }
  const reset = () => { setForm(EMPTY); setErrors({}); setDone(false) }
  const aria = (key) => (errors[key] ? { 'aria-invalid': true, 'aria-describedby': `v-${key}-err` } : {})

  return (
    <section className="section" id="vouchers" style={{ paddingTop: 0 }} ref={ref}>
      <div className="wrap">
        <SectionHead a={v.titleA} em={v.titleEm} lede={v.lede} />

        <div className="voucher">
          <div className="vcard-stage">
            <div className="vcard-tilt">
              <div className="vcard" ref={cardRef} onPointerMove={tilt} onPointerLeave={untilt}>
                <HubIcon id="style" className="vcard-eye" />
                <div className="top">
                  <span>{v.card}</span>
                  <span>Atelier Cils</span>
                </div>
                <div className="amt">
                  <small>CHF</small>
                  <span ref={amtRef}>150</span>
                </div>
                <div className="bot">
                  <div className="who">
                    <span>{v.for} <em>{form.to.trim() || v.someone}</em></span>
                    {form.from.trim() && <span className="from">{v.from} {form.from.trim()}</span>}
                    {form.message.trim() && <span className="note">“{form.message.trim()}”</span>}
                  </div>
                  <span className="valid">{v.valid(TERMS.voucherValidity)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="panel vform-panel">
            {done ? (
              <div className="vdone">
                <svg className="done-check" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M24 4a20 20 0 1 1 0 40a20 20 0 1 1 0-40" pathLength="1" />
                  <path d="M15 24.5l6 6 12-13" pathLength="1" />
                </svg>
                <h3>{v.doneTitle}</h3>
                <p>{v.doneText(amount, form.to.trim(), form.email.trim())}</p>
                <button type="button" className="btn ghost" onClick={reset}>{v.again}</button>
              </div>
            ) : (
              <form className="vform" onSubmit={submit} noValidate>
                <fieldset className="v-amounts">
                  <legend>{v.chooseAmount}</legend>
                  <div className="v-tiles">
                    {VOUCHER_AMOUNTS.map((a) => (
                      <button key={a} type="button" className="v-tile" aria-pressed={amount === a} onClick={() => setAmount(a)}>
                        <span className="v-price">CHF {a}</span>
                        <span className="v-what">{v.amounts[a]}</span>
                      </button>
                    ))}
                  </div>
                </fieldset>
                <div className="field-row">
                  <div className={`field${errors.to ? ' has-error' : ''}`}>
                    <label htmlFor="v-to">{v.to}</label>
                    <input id="v-to" type="text" maxLength={24} autoComplete="off" placeholder={v.toPlaceholder} value={form.to} onChange={set('to')} {...aria('to')} />
                    {errors.to && <span className="field-error" id="v-to-err">{errors.to}</span>}
                  </div>
                  <div className="field">
                    <label htmlFor="v-from">{v.fromLabel}</label>
                    <input id="v-from" type="text" maxLength={24} autoComplete="given-name" placeholder={v.fromPlaceholder} value={form.from} onChange={set('from')} />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="v-msg">{v.message} ({v.optional})</label>
                  <input id="v-msg" type="text" maxLength={60} autoComplete="off" placeholder={v.messagePlaceholder} value={form.message} onChange={set('message')} />
                </div>
                <div className={`field${errors.email ? ' has-error' : ''}`}>
                  <label htmlFor="v-email">{v.email}</label>
                  <input id="v-email" type="email" autoComplete="email" value={form.email} onChange={set('email')} {...aria('email')} />
                  {errors.email && <span className="field-error" id="v-email-err">{errors.email}</span>}
                </div>
                <div>
                  <button className="btn accent" type="submit">{v.submit} · CHF {amount}</button>
                  <p className="form-purpose">{v.purpose} <Link to="/privacy">{v.privacy}</Link></p>
                </div>
              </form>
            )}
          </div>
        </div>

        <div className="how">
          <h3 className="how-title">{v.howTitle}</h3>
          <ol className="how-steps">
            {v.how.map(([icon, title, text], i) => (
              <li key={title}>
                <HubIcon id={icon} className="how-icon" />
                <span className="how-n">{i + 1}</span>
                <strong>{title}</strong>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
