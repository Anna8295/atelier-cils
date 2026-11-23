import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext.jsx'
import { legalFor } from '../i18n/legal.js'

// Privacy policy, terms and imprint share this plain, readable layout.
export default function LegalPage({ id }) {
  const { t, lang } = useLang()
  const doc = legalFor(lang, t)[id]

  useEffect(() => {
    const before = document.title
    document.title = `${doc.title} · Atelier Cils`
    return () => { document.title = before }
  }, [doc.title])

  return (
    <div className="page legal">
      <div className="wrap page-top">
        <Link to="/" className="back">{t.page.back}</Link>
      </div>
      <article className="wrap legal-body">
        <h1>{doc.title}</h1>
        {doc.updated && <p className="legal-updated">{doc.updated}</p>}
        {doc.sections.map((s) => (
          <section key={s.h}>
            <h2>{s.h}</h2>
            {s.body.map((b, i) =>
              typeof b === 'string' ? (
                <p key={i}>{b}</p>
              ) : (
                <ul key={i}>{b.list.map((li) => <li key={li}>{li}</li>)}</ul>
              ),
            )}
          </section>
        ))}
      </article>
    </div>
  )
}
