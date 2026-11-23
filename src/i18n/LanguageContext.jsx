import { createContext, useContext, useEffect, useState } from 'react'
import { LOCALES, translations } from './translations.js'

const LanguageContext = createContext(null)

// First visit: use the browser's language if we have it (French or German),
// otherwise English. Nothing is stored, so the site stays cookie- and storage-free.
function browserLanguage() {
  const preferred = (navigator.languages ?? [navigator.language ?? 'en']).map((l) => l.slice(0, 2).toLowerCase())
  return preferred.find((l) => translations[l]) ?? 'en'
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(browserLanguage)
  const t = translations[lang] ?? translations.en

  // keep <html lang="…"> in sync for screen readers and search engines
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, locale: LOCALES[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

// usage in a component: const { t } = useLang()  →  t.nav.book
export function useLang() {
  return useContext(LanguageContext)
}
