// Non-language data: images, style guide, gallery and home cards here; prices,
// hours and contact details in studio.js (re-exported, so import from here).
// Text for these items lives in src/i18n/translations.js under the same ids.

import natural from '../assets/lashes/natural.jpg'
import classic from '../assets/lashes/classic.jpg'
import hybrid from '../assets/lashes/hybrid.jpg'
import volume from '../assets/lashes/volume.jpg'
import mega from '../assets/lashes/mega.jpg'
import lift from '../assets/lashes/lift.jpg'

export * from './studio.js'

// style guide: same eye, different lashes (specs per language: guide.styles)
export const STYLES = [
  { id: 'natural', img: natural },
  { id: 'classic', img: classic },
  { id: 'hybrid', img: hybrid },
  { id: 'volume', img: volume },
  { id: 'mega', img: mega },
  { id: 'lift', img: lift },
]
export const STYLE_BY_ID = Object.fromEntries(STYLES.map((s) => [s.id, s]))

// style comparison: `filter` groups mega under volume (names per language: gallery.items)
export const GALLERY = [
  { id: 'classic', filter: 'classic' },
  { id: 'hybrid', filter: 'hybrid' },
  { id: 'volume', filter: 'volume' },
  { id: 'mega', filter: 'volume' },
  { id: 'lift', filter: 'lift' },
]

// "Good to know" cards on the home page → detail pages (text in translations.hub)
export const HUB = [
  { id: 'style', to: '/style' },
  { id: 'visit', to: '/visit' },
  { id: 'aftercare', to: '/aftercare' },
  { id: 'faq', to: '/visit#faq' },
  { id: 'about', to: '/about' },
  { id: 'gift', to: '/gift' },
]
