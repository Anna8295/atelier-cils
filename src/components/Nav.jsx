import { useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext.jsx'
import { LANGS } from '../i18n/translations.js'

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
  const { t, lang, setLang } = useLang()
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => document.body.classList.toggle('nav-on', !isHome || window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

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
          <div className="lang" role="group" aria-label={t.nav.language}>
            {LANGS.map((code) => (
              <button key={code} type="button" aria-pressed={lang === code} onClick={() => setLang(code)}>
                {code.toUpperCase()}
              </button>
            ))}
          </div>
          <a className="btn accent" href="#book" data-cursor={t.cursor.book}>
            {t.nav.book}
          </a>
        </div>
      </div>
    </header>
  )
}
