// All site text, one file per language. Every language has exactly the
// same keys as en.js (checked by src/i18n/translations.test.js).
// Lists (services, styles, steps…) are matched by `id` with the
// non-language data in src/lib/data.js (prices, durations, images).

import en from './en.js'
import fr from './fr.js'
import de from './de.js'

// order of the FR / DE / EN switch in the nav
export const LANGS = ['fr', 'de', 'en']

export const translations = { en, fr, de }

// date and number formats per language (Swiss variants)
export const LOCALES = { en: 'en-GB', fr: 'fr-CH', de: 'de-CH' }
