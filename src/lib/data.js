// Non-language data: prices, durations, specs, images, contact details.
// Text for these items lives in src/i18n/translations.js under the same ids.

import natural from '../assets/lashes/natural.jpg'
import classic from '../assets/lashes/classic.jpg'
import hybrid from '../assets/lashes/hybrid.jpg'
import volume from '../assets/lashes/volume.jpg'
import mega from '../assets/lashes/mega.jpg'
import lift from '../assets/lashes/lift.jpg'

export const SERVICES = [
  { id: 'classic', ratio: '1 : 1', minutes: 120, price: 130, tags: ['C / CC curl', '0.15 mm', '8–12 mm'] },
  { id: 'hybrid', ratio: '1 : 1–3', minutes: 140, price: 150, tags: ['C / D curl', '0.07–0.15', '8–13 mm'], featured: true },
  { id: 'volume', ratio: '3D – 6D', minutes: 150, price: 170, tags: ['D curl', '0.05–0.07', '9–14 mm'] },
  { id: 'mega', ratio: '8D – 16D', minutes: 180, price: 200, tags: ['D / L curl', '0.03 mm', '10–15 mm'] },
  { id: 'lift', ratio: '6–8 weeks', minutes: 60, price: 95, tags: ['keratin', 'tint included'] },
  { id: 'brows', ratio: '6 weeks', minutes: 50, price: 85, tags: ['shape', 'tint', 'nourish'] },
]

export const REFILLS = [
  { weeks: 2, price: 65, minutes: 60 },
  { weeks: 3, price: 80, minutes: 75 },
]

// style guide: same eye, different lashes
export const STYLES = [
  { id: 'natural', img: natural, per: '—', curl: 'none', thk: 'your own' },
  { id: 'classic', img: classic, per: '1 : 1', curl: 'C', thk: '0.15 mm' },
  { id: 'hybrid', img: hybrid, per: '1 : 1–3', curl: 'C / D', thk: '0.07–0.15' },
  { id: 'volume', img: volume, per: '3D–6D', curl: 'D', thk: '0.05–0.07' },
  { id: 'mega', img: mega, per: '8D–16D', curl: 'D / L', thk: '0.03 mm' },
  { id: 'lift', img: lift, per: 'own lashes', curl: 'lifted', thk: 'your own' },
]
export const STYLE_BY_ID = Object.fromEntries(STYLES.map((s) => [s.id, s]))

// before & after: `filter` groups mega under volume
export const GALLERY = [
  { id: 'classic', filter: 'classic', name: 'Classic', spec: 'C 0.15 · 9–12 mm' },
  { id: 'hybrid', filter: 'hybrid', name: 'Hybrid', spec: 'C/D 0.07 · 8–13 mm' },
  { id: 'volume', filter: 'volume', name: 'Volume 4D', spec: 'D 0.06 · 10–13 mm' },
  { id: 'mega', filter: 'volume', name: 'Mega volume', spec: 'D 0.03 · 11–14 mm' },
  { id: 'lift', filter: 'lift', name: 'Lash lift + tint', spec: 'own lashes' },
]

// opening hours, index = Date#getDay() (0 = Sunday)
export const HOURS = [null, null, [9, 19], [9, 19], [10, 20], [9, 19], [9, 16]]

export const SLOTS = ['Tue 18 · 09:00', 'Tue 18 · 14:30', 'Thu 20 · 11:00', 'Fri 21 · 16:00', 'Sat 22 · 10:00']
export const PAYMENTS = ['TWINT', 'Visa', 'Mastercard', 'Cash CHF']
export const VOUCHER_AMOUNTS = [95, 150, 200]

export const CONTACT = {
  phone: '+41 79 123 45 67',
  whatsapp: 'https://wa.me/41791234567',
  instagram: 'https://www.instagram.com/',
  maps: 'https://maps.google.com/?q=Rue+de+Bourg+12+Lausanne',
  booking: 'https://www.fresha.com/',
  coords: '46.5216° N · 6.6334° E',
}
