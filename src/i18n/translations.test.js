import { describe, expect, it } from 'vitest'
import { LANGS, LOCALES, translations } from './translations.js'

// Describes the shape of a translation: same keys, same kinds of values,
// same list lengths, and functions with the same number of arguments.
function shape(value) {
  if (typeof value === 'function') return `fn(${value.length})`
  if (Array.isArray(value)) return value.map(shape)
  if (value && typeof value === 'object') return Object.fromEntries(Object.keys(value).sort().map((k) => [k, shape(value[k])]))
  return typeof value
}

describe('translations', () => {
  it('offers every language in the switch and has a date format for it', () => {
    expect([...LANGS].sort()).toEqual(Object.keys(translations).sort())
    for (const lang of LANGS) expect(LOCALES[lang], lang).toBeTruthy()
  })

  // a missing or extra key would show up as blank text or "undefined" on the page
  it.each(['fr', 'de'])('%s has exactly the same keys and kinds of text as English', (lang) => {
    expect(shape(translations[lang])).toEqual(shape(translations.en))
  })

  it.each(['fr', 'de'])('%s is really translated, not copied from English', (lang) => {
    const t = translations[lang]
    expect(t.hero.titleEm).not.toBe(translations.en.hero.titleEm)
    expect(t.booking.confirm).not.toBe(translations.en.booking.confirm)
    expect(t.faq.items[0][1]).not.toBe(translations.en.faq.items[0][1])
  })

  it.each(Object.keys(translations))('fills every text function in %s without "undefined"', (lang) => {
    const t = translations[lang]
    const samples = [
      t.services.bookName('X'), t.guide.quiz.book('X'), t.gallery.alt('X'), t.gallery.compare('X'),
      t.about.caption('X'), t.aftercare.early('a', 'b', 3).join(' '), t.aftercare.due('b', 16).join(' '),
      t.aftercare.soon(24).join(' '), t.aftercare.newSet(40).join(' '), t.booking.done.text('a@b.ch'),
      t.booking.done.icsTitle('X'), t.voucher.valid('X'), t.voucher.doneText(150, 'Camille', 'a@b.ch'),
      t.contact.hoursShort('a', 'b'), t.contact.openNow('19:00'), t.contact.closedNow('X', '09:00'),
      t.footer.rights(2026, { tradeName: 'Atelier Cils' }),
      ...t.booking.policies(t.terms).flat(),
    ]
    for (const text of samples) expect(text).not.toMatch(/undefined|NaN/)
  })
})
