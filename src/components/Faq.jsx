import { useLang } from '../i18n/LanguageContext.jsx'
import SectionHead from './SectionHead.jsx'

export default function Faq() {
  const { t } = useLang()
  const f = t.faq
  return (
    <section className="section" id="faq" style={{ paddingTop: 0 }}>
      <div className="wrap faq">
        <SectionHead eyebrow={f.eyebrow} a={f.titleA} em={f.titleEm} b={f.titleB} lede={f.lede} />
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
