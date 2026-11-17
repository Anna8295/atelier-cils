import { useEffect, useRef, useState } from 'react'
import { useLang } from '../i18n/LanguageContext.jsx'
import { VOUCHER_AMOUNTS } from '../lib/data.js'
import { gsap, prefersReducedMotion } from '../lib/motion.js'

export default function Voucher() {
  const { t } = useLang()
  const v = t.voucher
  const [amount, setAmount] = useState(150)
  const [name, setName] = useState('')
  const [msg, setMsg] = useState('')
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

  useEffect(() => {
    if (prefersReducedMotion()) return
    const tw = gsap.from(cardRef.current, { rotate: -12, y: 60, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: cardRef.current, start: 'top 85%' } })
    return () => { tw.scrollTrigger?.kill(); tw.revert() }
  }, [])

  const submit = (e) => {
    e.preventDefault()
    setMsg(v.done(amount))
  }

  return (
    <section className="section" id="vouchers" style={{ paddingTop: 0 }}>
      <div className="wrap voucher">
        <div className="vcard" ref={cardRef}>
          <div className="top">
            <span>{v.card}</span>
            <span>No. 0247</span>
          </div>
          <div className="amt">
            <small>CHF</small>
            <span ref={amtRef}>150</span>
          </div>
          <div className="bot">
            <span>{v.for} <em>{name.trim() || v.someone}</em></span>
            <span className="mono" style={{ fontSize: '.7rem' }}>{v.valid}</span>
          </div>
        </div>
        <form className="vform" onSubmit={submit}>
          <h2 style={{ fontSize: 'clamp(2rem,4vw,3rem)' }}>
            {v.titleA}
            <em>{v.titleEm}</em>
          </h2>
          <div className="amts">
            {VOUCHER_AMOUNTS.map((a) => (
              <button key={a} type="button" className="opt" aria-pressed={amount === a} onClick={() => setAmount(a)}>
                CHF {a} · {v.amounts[a]}
              </button>
            ))}
          </div>
          <label htmlFor="vTo">{v.who}</label>
          <input type="text" id="vTo" placeholder={v.placeholder} maxLength={24} autoComplete="off" value={name} onChange={(e) => setName(e.target.value)} />
          <div>
            <button className="btn accent" type="submit">{v.submit}</button>
          </div>
          <p className="vmsg" role="status">{msg}</p>
        </form>
      </div>
    </section>
  )
}
