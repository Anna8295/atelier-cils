import { useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext.jsx'
import { LANGS } from '../i18n/translations.js'
import { useToast } from '../lib/context.js'

// "#…" = section on the home page, "/…" = detail page
const LINKS = [
  ['#services', 'prices'],
  ['#gallery', 'results'],
  ['/style', 'guide'],
  ['/visit', 'visit'],
  ['/about', 'about'],
]

// On the home page the nav hides over the hero film and slides in once the
// visitor scrolls. On detail pages it is always shown.
export default function Nav() {
  const { t, lang, setLang, has } = useLang()
  const toast = useToast()
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => document.body.classList.toggle('nav-on', !isHome || window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  const pickLang = (code) => {
    setLang(code)
    if (!has(code)) toast(t.nav.langSoon(code.toUpperCase()))
  }

  return (
    <header className="nav">
      <div className="wrap">
        <Link className="logo" to="/">
          Atelier <em>Cils</em>
        </Link>
        <ul>
          {LINKS.map(([href, key]) => (
            <li key={href}>
              {href.startsWith('#') ? <a href={href}>{t.nav[key]}</a> : <NavLink to={href}>{t.nav[key]}</NavLink>}
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
