import { useEffect } from 'react'
import { useLang } from '../i18n/LanguageContext.jsx'
import { LANGS } from '../i18n/translations.js'
import { useToast } from '../lib/context.js'

const LINKS = [
  ['#services', 'services'],
  ['#guide', 'guide'],
  ['#gallery', 'gallery'],
  ['#about', 'about'],
  ['#first-visit', 'firstVisit'],
  ['#faq', 'faq'],
]

// Hidden over the hero film; slides in as soon as the visitor scrolls.
export default function Nav() {
  const { t, lang, setLang, has } = useLang()
  const toast = useToast()

  useEffect(() => {
    const onScroll = () => document.body.classList.toggle('nav-on', window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const pickLang = (code) => {
    setLang(code)
    if (!has(code)) toast(t.nav.langSoon(code.toUpperCase()))
  }

  return (
    <header className="nav">
      <div className="wrap">
        <a className="logo" href="#top">
          Atelier <em>Cils</em>
        </a>
        <ul>
          {LINKS.map(([href, key]) => (
            <li key={href}>
              <a href={href}>{t.nav[key]}</a>
            </li>
          ))}
        </ul>
        <div className="nav-r">
          <div className="lang" role="group" aria-label="Language">
            {LANGS.map((code) => (
              <button key={code} type="button" aria-pressed={lang === code} onClick={() => pickLang(code)}>
                {code.toUpperCase()}
              </button>
            ))}
          </div>
          <a className="btn accent" href="#book" data-cursor="Book">
            {t.nav.book}
          </a>
        </div>
      </div>
    </header>
  )
}
