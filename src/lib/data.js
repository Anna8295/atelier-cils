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
  { id: 'refill2', weeks: 2, price: 65, minutes: 60 },
  { id: 'refill3', weeks: 3, price: 80, minutes: 75 },
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
// calendar files. This is a concept site: the studio and every detail below
// are fictional. The phone number is unassigned in Switzerland and the email
// uses a reserved example domain, so no real person receives messages.
export const BUSINESS = {
  tradeName: 'Atelier Cils',
  legalName: 'Atelier Cils, Léa Morand',
  owner: 'Léa Morand',
  legalForm: 'Sole proprietorship',
  uid: 'Not registered (below the commercial register threshold)',
  street: 'Rue de Bourg 12',
  city: '1003 Lausanne',
  directions: '2nd floor, buzzer “Cils” · Metro M2, Flon or Bessières',
  phone: '+41 21 000 12 34',
  email: 'bonjour@atelier-cils.example',
  whatsappNumber: '41210001234',
  instagramUrl: 'https://www.instagram.com/',
}

export const STUDIO_ADDRESS = `${BUSINESS.street}, ${BUSINESS.city}`

// Booking and voucher terms shown on the site and in the Terms page.
// Placeholders until the owner decides the real rules.
export const TERMS = {
  confirmation: 'by email, straight after you book',
  deposit: 'CHF 30 for full sets, paid by TWINT when you book. It comes off the final price. Refills, lifts and brows need no deposit',
  cancelNotice: '24 hours',
  lateCancel: 'Later cancellations and no-shows keep the deposit',
  late: 'more than 15 minutes late and the treatment may be shortened or moved to another day',
  refill: 'A refill needs at least 40 % of your set left and has to be within 3 weeks. Otherwise it is booked as a new full set',
  payment: 'TWINT, Visa, Mastercard or cash, at the end of your visit',
  vat: 'The studio is not subject to VAT, so prices are final',
  complaints: 'Tell us within 72 hours and we fix lifted or missing lashes free of charge',
  voucherValidity: '12 months',
  voucherRefund: 'Vouchers can be used for any treatment and in several visits. They cannot be exchanged for cash',
  jurisdiction: 'Lausanne',
}

// Privacy facts that depend on how the site is hosted and run (fictional set-up).
export const PRIVACY = {
  hosting: 'GitHub Pages (GitHub, Inc., USA)',
  logRetention: 'as long as GitHub needs them for security, as described in the GitHub Privacy Statement',
  processor: 'Supabase (booking database, servers in Frankfurt, Germany) and Resend (email delivery, USA)',
  bookingRetention: '24 months after your last visit, then it is deleted',
  voucherRetention: '10 years, because vouchers are accounting records',
  consultationNotes: 'they are written on a paper card kept locked at the studio and destroyed 24 months after your last visit',
  lastUpdated: '23 November 2026',
}

// Outgoing links. They only contact a third party when a visitor clicks them.
export const CONTACT = {
  phone: BUSINESS.phone,
  email: BUSINESS.email,
  whatsapp: `https://wa.me/${BUSINESS.whatsappNumber}`,
  instagram: BUSINESS.instagramUrl,
  maps: `https://maps.google.com/?q=${encodeURIComponent(STUDIO_ADDRESS)}`,
}
