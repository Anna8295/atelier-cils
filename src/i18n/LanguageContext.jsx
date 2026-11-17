import { createContext, useContext, useEffect, useState } from 'react'
import { translations } from './translations.js'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en')
  // languages without a translation yet fall back to English
  const t = translations[lang] ?? translations.en

  // keep <html lang="…"> in sync for screen readers and search engines
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, has: (l) => Boolean(translations[l]) }}>
      {children}
    </LanguageContext.Provider>
  )
}

// usage in a component: const { t } = useLang()  →  t.nav.book
export function useLang() {
  return useContext(LanguageContext)
}
