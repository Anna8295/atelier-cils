// Non-language data: prices, durations, specs, images, contact details.
// Text for these items lives in src/i18n/translations.js under the same ids.

import natural from '../assets/lashes/natural.jpg'
import classic from '../assets/lashes/classic.jpg'
import hybrid from '../assets/lashes/hybrid.jpg'
import volume from '../assets/lashes/volume.jpg'
import mega from '../assets/lashes/mega.jpg'
import lift from '../assets/lashes/lift.jpg'

// name, description and specs per language: services.items in the language files
export const SERVICES = [
  { id: 'classic', minutes: 120, price: 130 },
  { id: 'hybrid', minutes: 140, price: 150, featured: true },
  { id: 'volume', minutes: 150, price: 170 },
  { id: 'mega', minutes: 180, price: 200 },
  { id: 'lift', minutes: 60, price: 95 },
  { id: 'brows', minutes: 50, price: 85 },
]

export const REFILLS = [
  { id: 'refill2', weeks: 2, price: 65, minutes: 60 },
  { id: 'refill3', weeks: 3, price: 80, minutes: 75 },
]


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

// opening hours, index = Date#getDay() (0 = Sunday)
export const HOURS = [null, null, [9, 19], [9, 19], [10, 20], [9, 19], [9, 16]]

export const VOUCHER_AMOUNTS = [95, 150, 200]

// Business identity, used by the footer, imprint, privacy policy, terms and
// calendar files. Translated details (legal form, directions, booking rules,
// privacy facts) are in `biz`, `terms` and `privacyFacts` in the language files. This is a concept site: the studio and every detail below
// are fictional. The phone number is unassigned in Switzerland and the email
// uses a reserved example domain, so no real person receives messages.
export const BUSINESS = {
  tradeName: 'Atelier Cils',
  legalName: 'Atelier Cils, Léa Morand',
  owner: 'Léa Morand',
  street: 'Rue de Bourg 12',
  city: '1003 Lausanne',
  phone: '+41 21 000 12 34',
  email: 'bonjour@atelier-cils.example',
  whatsappNumber: '41210001234',
  instagramUrl: 'https://www.instagram.com/',
}

export const STUDIO_ADDRESS = `${BUSINESS.street}, ${BUSINESS.city}`

// Outgoing links. They only contact a third party when a visitor clicks them.
export const CONTACT = {
  phone: BUSINESS.phone,
  email: BUSINESS.email,
  whatsapp: `https://wa.me/${BUSINESS.whatsappNumber}`,
  instagram: BUSINESS.instagramUrl,
  maps: `https://maps.google.com/?q=${encodeURIComponent(STUDIO_ADDRESS)}`,
}
