// Motion helpers: Lenis smooth scroll wired into GSAP's ticker + ScrollTrigger,
// a tiny char splitter for headline reveals, and a reduced-motion check.

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

let lenis = null

export function setupSmoothScroll() {
  if (prefersReducedMotion()) return () => {}
  lenis = new Lenis({ lerp: 0.09, smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)
  const raf = (time) => lenis.raf(time * 1000)
  gsap.ticker.add(raf)
  gsap.ticker.lagSmoothing(0)
  return () => {
    gsap.ticker.remove(raf)
    lenis.destroy()
    lenis = null
  }
}

export function getLenis() {
  return lenis
}

// smooth-scroll to "#id" (or the top), leaving room for the fixed nav
export function scrollToHash(hash, { immediate = false } = {}) {
  const target = hash === '#top' ? 0 : document.querySelector(hash)
  if (target === null) return
  if (lenis) {
    lenis.resize() // the page may have just changed height (new route)
    lenis.scrollTo(target, { offset: -70, duration: 1.4, immediate })
  }
  else if (target === 0) window.scrollTo({ top: 0 })
  else {
    const y = target.getBoundingClientRect().top + window.scrollY - 70
    window.scrollTo({ top: y, behavior: immediate || prefersReducedMotion() ? 'auto' : 'smooth' })
  }
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true })
  else window.scrollTo(0, 0)
}

// Wraps each character in <span class="ch"> (words kept together in .wd).
// Screen readers get the original text through aria-label.
export function splitChars(el) {
  if (!el || el.dataset.split) return el ? [...el.querySelectorAll('.ch')] : []
  el.dataset.split = '1'
  el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim())
  const walk = (node) => {
    ;[...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment()
        n.textContent.split(/(\s+)/).forEach((w) => {
          if (!w) return
          if (/^\s+$/.test(w)) return frag.append(' ')
          const wd = document.createElement('span')
          wd.className = 'wd'
          wd.setAttribute('aria-hidden', 'true')
          ;[...w].forEach((c) => {
            const s = document.createElement('span')
            s.className = 'ch'
            s.textContent = c
            wd.append(s)
          })
          frag.append(wd)
        })
        n.replaceWith(frag)
      } else if (n.nodeType === 1) walk(n)
    })
  }
  walk(el)
  return [...el.querySelectorAll('.ch')]
}

// Section headings (h2.split) reveal char by char from a faint resting state.
export function setupHeadingReveals(root = document) {
  if (prefersReducedMotion()) return () => {}
  const ctx = gsap.context(() => {
    root.querySelectorAll('h2.split').forEach((h) => {
      gsap.from(splitChars(h), {
        yPercent: 50, opacity: 0.15, duration: 0.9, ease: 'power3.out', stagger: 0.012,
        scrollTrigger: { trigger: h, start: 'top 88%' },
      })
    })
  })
  return () => ctx.revert()
}
