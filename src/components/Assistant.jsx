import { lazy, Suspense, useCallback, useRef, useState } from 'react'
import { useLang } from '../i18n/LanguageContext.jsx'

// The chat is only downloaded when someone opens it the first time.
const AssistantPanel = lazy(() => import('./AssistantPanel.jsx'))

// Chat bubble, bottom right on every page. On the home page it waits until
// the visitor scrolls past the hero film, like the nav. The panel stays
// mounted after the first open, so the conversation survives closing it and
// changing pages (it is never stored: a reload starts a new chat).
export default function Assistant() {
  const { t } = useLang()
  const a = t.assistant
  const [open, setOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const fab = useRef(null)

  // returnFocus: back to the bubble (Escape, ×), not after following a link
  const close = useCallback((returnFocus) => {
    setOpen(false)
    if (returnFocus) fab.current?.focus()
  }, [])

  const toggle = () => {
    setLoaded(true)
    setOpen((o) => !o)
  }

  return (
    <div className={`ask${open ? ' is-open' : ''}`}>
      <button
        ref={fab}
        type="button"
        className="ask-fab"
        aria-expanded={open}
        aria-controls="ask-panel"
        aria-label={open ? a.close : a.open}
        onClick={toggle}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          {open
            ? <path d="M6 6l12 12M18 6L6 18" />
            : <path d="M4 12c0-4.4 3.6-7.5 8-7.5s8 3.1 8 7.5-3.6 7.5-8 7.5c-1.1 0-2.2-.2-3.2-.6L4.5 20l1-3.6A7.2 7.2 0 0 1 4 12z" />}
        </svg>
        <span className="ask-fab-text" aria-hidden="true">{a.open}</span>
      </button>
      {loaded && (
        <Suspense fallback={null}>
          <AssistantPanel open={open} onClose={close} />
        </Suspense>
      )}
    </div>
  )
}
