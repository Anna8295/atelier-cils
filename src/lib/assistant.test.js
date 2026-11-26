import { describe, expect, it } from 'vitest'
import { translations } from '../i18n/translations.js'
import { buildReply, normalize, understand } from './assistant.js'

const topic = (q) => understand(q).topic

describe('assistant: understanding questions', () => {
  it('ignores capitals, accents and punctuation', () => {
    expect(normalize('Ça fait MAL ?')).toBe(' ca fait mal ')
    expect(normalize('Öffnungszeiten, bitte!')).toBe(' offnungszeiten bitte ')
  })

  it.each([
    ['Does it hurt?', 'hurt'],
    ['How much is a full set?', 'price'],
    ['What if I am allergic to glue?', 'allergy'],
    ['Can I wear mascara?', 'makeup'],
    ['Is it safe when pregnant?', 'pregnant'],
    ['How long do extensions last?', 'last'],
    ['Can I go swimming after?', 'aftercare'],
    ['When do I need a refill?', 'refill'],
    ['What should I do before my appointment?', 'prepare'],
    ['Do I have to pay a deposit?', 'policy'],
    ['Can I buy a gift card?', 'voucher'],
    ['Are you open on Saturday?', 'hours'],
    ['Where is the studio?', 'location'],
    ['Which lashes would suit me?', 'quiz'],
    ['I want to book', 'book'],
    ['Thanks!', 'thanks'],
    ['Hello', 'greeting'],
  ])('EN "%s" → %s', (q, expected) => expect(topic(q)).toBe(expected))

  it.each([
    ['Est-ce que ça fait mal ?', 'hurt'],
    ['Combien coûte une pose ?', 'price'],
    ['Je suis enceinte, c’est possible ?', 'pregnant'],
    ['Quels sont vos horaires ?', 'hours'],
    ['Je peux annuler mon rendez-vous ?', 'policy'],
    ['Où êtes-vous ?', 'location'],
  ])('FR "%s" → %s', (q, expected) => expect(topic(q)).toBe(expected))

  it.each([
    ['Tut es weh?', 'hurt'],
    ['Was kostet das?', 'price'],
    ['Ich bin allergisch', 'allergy'],
    ['Darf ich in die Sauna?', 'aftercare'],
    ['Habt ihr am Samstag offen?', 'hours'],
    ['Ich möchte einen Gutschein schenken', 'voucher'],
  ])('DE "%s" → %s', (q, expected) => expect(topic(q)).toBe(expected))

  it('notices which service a question is about', () => {
    expect(understand('How much is mega volume?')).toEqual({ topic: 'price', service: 'mega' })
    expect(understand('Combien coûte le volume ?')).toEqual({ topic: 'price', service: 'volume' })
    expect(understand('Tell me about the lash lift')).toEqual({ topic: 'service', service: 'lift' })
  })

  it('admits when it does not know', () => {
    expect(understand('What is the meaning of life?')).toEqual({ topic: 'unknown', service: null })
    // short words only match whole words: "hike" is not "hi"
    expect(topic('hike')).toBe('unknown')
  })
})

describe('assistant: answers', () => {
  const t = translations.en
  const text = (r) => r.blocks.flat().join(' ')

  it('answers with the FAQ text the site shows', () => {
    expect(text(buildReply({ topic: 'hurt' }, t))).toBe(t.faq.items[0][1])
  })

  it('lists every price, or one when a service is named', () => {
    expect(text(buildReply({ topic: 'price' }, t))).toMatch(/Classic · CHF 130 · 120 min.*Brow lamination · CHF 85/)
    const one = buildReply({ topic: 'price', service: 'volume' }, t)
    expect(text(one)).toBe('Volume costs CHF 170 and takes about 150 minutes, consultation included.')
    expect(one.actions[0]).toEqual({ kind: 'book', service: 'volume', label: 'Book Volume' })
  })

  it('lists the opening hours from Monday', () => {
    const [, days] = buildReply({ topic: 'hours' }, t).blocks
    expect(days[0]).toBe('Mon · Closed')
    expect(days[3]).toBe('Thu · 10:00–20:00')
    expect(days[6]).toBe('Sun · Closed')
  })

  it('runs the style quiz and books the result', () => {
    const first = buildReply({ topic: 'quiz', q: 0 }, t)
    expect(first.blocks).toEqual([t.assistant.quizIntro, 'What look do you want?'])
    expect(first.actions.map((x) => x.label)).toEqual(['Barely there', 'Noticeable', 'Full glam'])
    const result = buildReply({ topic: 'quizResult', result: 'hybrid' }, t)
    expect(text(result)).toContain("I'd suggest Hybrid.")
    expect(result.actions[0]).toMatchObject({ kind: 'book', service: 'hybrid' })
  })

  it('offers WhatsApp when it does not know', () => {
    expect(buildReply({ topic: 'unknown' }, t).actions[0]).toMatchObject({ kind: 'ext', href: expect.stringContaining('wa.me') })
  })

  // every topic, every language: no blank text, no "undefined"
  const topics = ['hello', 'greeting', 'thanks', 'price', 'hurt', 'damage', 'makeup', 'last', 'allergy', 'pregnant', 'aftercare',
    'refill', 'prepare', 'policy', 'hours', 'location', 'contact', 'voucher', 'book', 'unknown']
  it.each(Object.keys(translations))('builds every answer in %s', (lang) => {
    const tl = translations[lang]
    const replies = [
      ...topics.map((id) => buildReply({ topic: id }, tl)),
      ...['classic', 'hybrid', 'volume', 'mega', 'lift', 'brows'].map((id) => buildReply({ topic: 'service', service: id }, tl)),
      ...[0, 1, 2].map((q) => buildReply({ topic: 'quiz', q }, tl)),
      ...['lift', 'classic', 'hybrid', 'volume', 'mega'].map((id) => buildReply({ topic: 'quizResult', result: id }, tl)),
    ]
    for (const r of replies) {
      expect(r.blocks.length).toBeGreaterThan(0)
      const all = [...r.blocks.flat(), ...r.actions.map((x) => x.label)]
      for (const s of all) expect(s).toMatch(/\S/)
      expect(all.join(' ')).not.toMatch(/undefined|NaN|\[object/)
    }
  })
})
