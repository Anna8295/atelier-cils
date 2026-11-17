import { useLang } from '../i18n/LanguageContext.jsx'
import SectionHead from './SectionHead.jsx'
import { CONTACT } from '../lib/data.js'

export default function Faq() {
  const { t } = useLang()
  const f = t.faq
  return (
    <section className="section" id="faq" style={{ paddingTop: 0 }}>
      <div className="wrap faq">
        <div className="faq-head">
          <SectionHead a={f.titleA} em={f.titleEm} b={f.titleB} lede={f.lede} />
          <a className="btn ghost" href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">{f.ask}</a>
        </div>
        <div>
          {f.items.map(([q, answer], i) => (
            <details key={q} open={i === 0}>
              <summary>{q}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
