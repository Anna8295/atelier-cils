import { useCallback, useRef, useState } from 'react'
import { ToastContext } from '../lib/context.js'

export default function ToastProvider({ children }) {
  const [msg, setMsg] = useState('')
  const [show, setShow] = useState(false)
  const timer = useRef(null)

  const toast = useCallback((text) => {
    setMsg(text)
    setShow(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setShow(false), 2800)
  }, [])

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className={`toast${show ? ' show' : ''}`} role="status" aria-live="polite">{msg}</div>
    </ToastContext.Provider>
  )
}
