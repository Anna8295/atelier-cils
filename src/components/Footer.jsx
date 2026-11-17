import { useEffect, useRef } from 'react'
import { useLang } from '../i18n/LanguageContext.jsx'
import { CONTACT } from '../lib/data.js'
import { gsap, prefersReducedMotion } from '../lib/motion.js'

export default function Footer() {
  const { t } = useLang()
  const f = t.footer
  const ref = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('.wordmark', { xPercent: -12, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom bottom', scrub: true } })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <>
      <footer className="site" ref={ref}>
        <div className="wrap">
          <div className="wordmark" aria-hidden="true">
            Atelier <em>Cils</em>
          </div>
          <div className="foot-row">
            <span>{f.rights}</span>
            <nav aria-label="Legal">
              <a href="#top">{f.imprint}</a>
              <a href="#top">{f.privacy}</a>
              <a href="#vouchers">{f.vouchers}</a>
              <a href="#contact">{f.contact}</a>
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
