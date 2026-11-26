// The studio's facts without any images: prices, durations, hours, contact.
// Used by the site (through data.js) and by the chat assistant's Cloudflare
// Worker (worker/), which can't bundle images. Text for these items lives in
// the language files under the same ids.

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
