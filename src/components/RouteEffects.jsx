import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ScrollTrigger, scrollToHash, scrollToTop, setupHeadingReveals } from '../lib/motion.js'

// Rendered after <Routes>, so its effects run once the page's sections exist.
// - "#id" links scroll smoothly; on a detail page they go to that section on the home page
// - new page → top of the page (or to its #hash)
// - headline reveals + ScrollTrigger positions are rebuilt per page
export default function RouteEffects() {
  const { pathname, hash } = useLocation()
  const navigate = useNavigate()
  // current route, readable inside the click handler (paths are relative to the base)
  const here = useRef(pathname)
  here.current = pathname

  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      e.preventDefault()
      const h = a.getAttribute('href')
      if (here.current !== '/') navigate('/' + h)
      else scrollToHash(h)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [navigate])

  useEffect(() => {
    const cleanHeadings = setupHeadingReveals()
    ScrollTrigger.refresh()
    let t
    if (hash) t = setTimeout(() => scrollToHash(hash, { immediate: true }), 80)
    else scrollToTop()
    return () => {
      clearTimeout(t)
      cleanHeadings()
    }
  }, [pathname, hash])

  return null
}
