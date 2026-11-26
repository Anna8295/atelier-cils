import { describe, expect, it } from 'vitest'
import { translations } from '../i18n/translations.js'
import { parseReply, systemPrompt } from './knowledge.js'
import { textBlocks } from './assistant.js'

describe('AI instructions', () => {
  it.each(Object.keys(translations))('include every fact the site shows, in %s', (lang) => {
    const t = translations[lang]
    const prompt = systemPrompt(t, lang)
    expect(prompt).toContain('CHF 170')
    expect(prompt).toContain(t.faq.items[3][1]) // allergies
    expect(prompt).toContain(t.aftercare.timeline[0][2])
    expect(prompt).toContain('Rue de Bourg 12')
    expect(prompt).toContain('10:00–20:00')
    expect(prompt).not.toMatch(/undefined|NaN|\[object/)
  })

  it('asks for the right language', () => {
    expect(systemPrompt(translations.fr, 'fr')).toContain('Always answer in French. Address the visitor as "vous"')
    expect(systemPrompt(translations.de, 'de')).toContain('Swiss spelling')
  })
})

describe('AI answers', () => {
  it('takes out the booking tag and keeps only known services', () => {
    expect(parseReply('Hybrid suits you.\n[book:hybrid]')).toEqual({ reply: 'Hybrid suits you.', book: 'hybrid' })
    expect(parseReply('Sure! [book: Refill2]')).toEqual({ reply: 'Sure!', book: 'refill2' })
    expect(parseReply('Here. [book:botox]')).toEqual({ reply: 'Here.', book: null })
    expect(parseReply('**Volume** is fluffy.')).toEqual({ reply: 'Volume is fluffy.', book: null })
  })

  it('turns text into paragraphs and lists for the chat', () => {
    expect(textBlocks('Two options:\n- Classic\n- Hybrid\n\nBoth last 4–6 weeks.')).toEqual([
      'Two options:', ['Classic', 'Hybrid'], 'Both last 4–6 weeks.',
    ])
    expect(textBlocks('One line\nwraps here.')).toEqual(['One line wraps here.'])
  })
})
