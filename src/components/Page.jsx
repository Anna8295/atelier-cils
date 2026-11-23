import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext.jsx'
import { CONTACT } from '../lib/data.js'

// Shell for the detail pages: back link on top, booking band at the end,
// so a visitor reading the details is always one tap from booking.
export default function Page({ id, children }) {
  const { t } = useLang()
  const p = t.page

  useEffect(() => {
    const before = document.title
    document.title = p.titles[id] ?? before
    return () => { document.title = before }
  }, [id, p])

  return (
    <div className="page">
      <div className="wrap page-top">
        <Link to="/" className="back">{p.back}</Link>
      </div>
      {children}
      <section className="section book-band-wrap">
        <div className="wrap">
          <div className="book-band">
            <h2>
              {p.bandA}
              <em>{p.bandEm}</em>
            </h2>
            <p>{p.bandText}</p>
            <div className="book-band-ctas">
              <a className="btn accent" href="#book" data-cursor={t.cursor.book}>{t.nav.book}</a>
              <a className="btn ghost" href="#services">{p.bandPrices}</a>
              <a className="btn ghost" href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp ↗</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
