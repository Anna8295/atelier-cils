import { useLang } from '../i18n/LanguageContext.jsx'

// Split-reveal heading + optional lede.
// `key={lang}` remounts the heading on language change, because the char
// splitter in lib/motion.js rewrites its text nodes.
export default function SectionHead({ a, em, b, lede, id, className = '', style }) {
  const { lang } = useLang()
  return (
    <div className={`head ${className}`} style={style}>
      <h2 className="split" id={id} key={lang}>
        {a}
        <em>{em}</em>
        {b}
      </h2>
      {lede && <p className="lede">{lede}</p>}
    </div>
  )
}
