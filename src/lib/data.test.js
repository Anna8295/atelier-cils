import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { translations } from '../i18n/translations.js'
import { legalFor } from '../i18n/legal.js'
import { BUSINESS, GALLERY, HUB, SERVICES, STYLE_BY_ID, STYLES } from './data.js'

const en = translations.en
const appSource = readFileSync(resolve(__dirname, '../App.jsx'), 'utf8')

// Catches a service, style or card added in data.js without its text (or the other way round).
describe('content and data stay in sync', () => {
  it('has text for every service', () => {
    for (const s of SERVICES) expect(en.services.items[s.id], s.id).toBeDefined()
  })

  it('has text and an image for every lash style', () => {
    for (const s of STYLES) {
      expect(en.guide.styles[s.id], s.id).toBeDefined()
      expect(s.img, s.id).toBeTruthy()
    }
  })

  it('only shows gallery styles that have an image', () => {
    for (const g of GALLERY) expect(STYLE_BY_ID[g.id], g.id).toBeDefined()
  })

  it('links every Good to know card to a page that exists', () => {
    for (const card of HUB) {
      expect(en.hub.items[card.id], card.id).toBeDefined()
      const path = card.to.split('#')[0]
      expect(appSource, card.to).toContain(`path="${path}"`)
    }
  })

  it('gives every service a unique id', () => {
    const ids = SERVICES.map((s) => s.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})

describe('business details', () => {
  // the concept site has every detail filled in; a [PLACEHOLDER] would show on the page
  it.each(Object.keys(translations))('has no [PLACEHOLDER] left in the business, terms or privacy details (%s)', (lang) => {
    const t = translations[lang]
    const values = [...Object.values(BUSINESS), ...Object.values(t.biz), ...Object.values(t.terms), ...Object.values(t.privacyFacts)]
    expect(values.filter((v) => /\[[A-Z]/.test(v))).toEqual([])
  })

  it('uses an email on a reserved example domain, so no real inbox gets demo mail', () => {
    expect(BUSINESS.email).toMatch(/\.example$/)
  })

  it.each(Object.keys(translations))('builds every legal page with a title and sections (%s)', (lang) => {
    const pages = legalFor(lang, translations[lang])
    expect(Object.keys(pages)).toEqual(['privacy', 'terms', 'imprint'])
    for (const [id, doc] of Object.entries(pages)) {
      expect(doc.title, id).toBeTruthy()
      expect(doc.sections.length, id).toBeGreaterThan(0)
      // no "undefined" from a missing translated detail
      expect(JSON.stringify(doc), id).not.toContain('undefined')
    }
  })
})
