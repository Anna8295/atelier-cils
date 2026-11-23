import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

afterEach(() => cleanup())

// jsdom doesn't implement these browser APIs, so give the components simple stand-ins.

// Report "reduced motion" so components skip their GSAP animations:
// component tests check behaviour, the animations are covered end-to-end.
window.matchMedia = (query) => ({
  matches: query.includes('prefers-reduced-motion'),
  media: query,
  onchange: null,
  addEventListener: () => {},
  removeEventListener: () => {},
  addListener: () => {},
  removeListener: () => {},
  dispatchEvent: () => false,
})

class NoopIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
}
window.IntersectionObserver = NoopIntersectionObserver

Element.prototype.scrollIntoView = vi.fn()
window.scrollTo = vi.fn()

// calendar files and reminders are offered as blob: download links
URL.createObjectURL = vi.fn(() => 'blob:test')
URL.revokeObjectURL = vi.fn()
