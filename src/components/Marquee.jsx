import { useEffect, useRef } from 'react'
import { useLang } from '../i18n/LanguageContext.jsx'

// Service names on an endless band; it reverses when the visitor scrolls up.
export default function Marquee() {
  const { t } = useLang()
  const ref = useRef(null)

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      if (y !== last) ref.current?.classList.toggle('rev', y < last)
      last = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const items = [...t.marquee, ...t.marquee] // doubled for a seamless loop
  return (
    <div className="marquee" aria-hidden="true" ref={ref}>
      <div className="marquee-track">
        {items.map((name, i) => (
          <span key={i}>{name}</span>
        ))}
      </div>
    </div>
  )
}
