// The chat assistant's brain, for now without AI: it finds the topic of a
// question from keywords, then builds the answer from the text the site
// already shows (FAQ, aftercare, booking rules, prices, hours…), so the
// assistant never says anything the site doesn't.
//
// Messages are stored as ids ({ topic, service }), not as text, and are turned
// into text when shown. Switching the language re-translates the whole chat.

import { BUSINESS, CONTACT, HOURS, REFILLS, SERVICES, STUDIO_ADDRESS, VOUCHER_AMOUNTS } from './studio.js'
import { KEYWORDS, SERVICE_WORDS } from './assistantKeywords.js'

// lower case, no accents, only letters and digits, padded with spaces
export function normalize(text) {
  const plain = text
    .toLowerCase()
    .replace(/ß/g, 'ss')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
  return ` ${plain} `
}

// does the (normalized) question contain a word starting with `word`?
function has(question, word) {
  const w = normalize(word).trim()
  return question.includes(` ${w}${w.length <= 3 ? ' ' : ''}`)
}

const TOPICS = Object.keys(KEYWORDS)

/** Question text → { topic, service }. The service is set when one is named. */
export function understand(text) {
  const q = normalize(text)
  const service = Object.keys(SERVICE_WORDS).find((id) => SERVICE_WORDS[id].some((w) => has(q, w))) ?? null

  let topic = null
  let best = 0
  for (const id of TOPICS) {
    // a match on "how much" counts more than a match on "cost"
    const score = KEYWORDS[id].reduce((sum, w) => sum + (has(q, w) ? w.split(' ').length : 0), 0)
    if (score > best) {
      topic = id
      best = score
    }
  }
  return { topic: topic ?? (service ? 'service' : 'unknown'), service }
}

// the chips under the first message and under "I'm not sure"
export const SUGGESTED = ['price', 'quiz', 'allergy', 'hours']

// FAQ answers, by their place in t.faq.items
const FAQ = { hurt: 0, last: 1, damage: 2, allergy: 3, makeup: 4, pregnant: 5 }

// AI text → blocks: paragraphs split at blank lines, "- " lines as a list
export function textBlocks(text) {
  const blocks = []
  for (const chunk of text.split(/\n\s*\n/)) {
    const rows = chunk.split('\n').map((l) => l.trim()).filter(Boolean)
    let para = []
    for (const row of rows) {
      const item = row.match(/^(?:[-•*]|\d+[.)])\s+(.*)/)
      if (item) {
        if (para.length) blocks.push(para.join(' '))
        para = []
        const last = blocks.at(-1)
        if (Array.isArray(last)) last.push(item[1])
        else blocks.push([item[1]])
      }
      else para.push(row)
    }
    if (para.length) blocks.push(para.join(' '))
  }
  return blocks
}

// Monday first; HOURS uses Date#getDay() (0 = Sunday)
const WEEK = [1, 2, 3, 4, 5, 6, 0]
const clock = (h) => `${String(h).padStart(2, '0')}:00`

/**
 * A bot message → what to show:
 *   blocks:  a string is a paragraph, an array of strings is a list
 *   actions: buttons and links under the answer
 *     { kind: 'book', service, label }   → opens booking (with that service)
 *     { kind: 'page', to, label }        → a page of the site
 *     { kind: 'ext', href, label }       → WhatsApp, maps (new tab)
 *     { kind: 'ask', topic, label }      → a suggested question
 *     { kind: 'pick', q, v, label }      → an answer to quiz question q
 */
export function buildReply({ topic, service, q, result, ai, book: aiBook }, t) {
  const a = t.assistant
  const name = (id) => t.services.items[id]?.name ?? t.booking[id]
  const book = (id) => ({ kind: 'book', service: id ?? null, label: id ? t.services.bookName(name(id)) : t.nav.book })

  // an answer written by the AI: plain text, "- " lines become a list
  if (ai) return { blocks: textBlocks(ai), actions: aiBook ? [book(aiBook)] : [] }

  const page = (to, key) => ({ kind: 'page', to, label: a.links[key] })
  const whatsapp = { kind: 'ext', href: CONTACT.whatsapp, label: a.links.whatsapp }
  const asks = SUGGESTED.map((id) => ({ kind: 'ask', topic: id, label: a.suggestions[id] }))
  const [refill2, refill3] = REFILLS.map((r) => r.price)

  switch (topic) {
    case 'hello':
      return { blocks: [a.hello], actions: asks }

    case 'greeting':
      return { blocks: [a.greeting], actions: asks }

    case 'thanks':
      return { blocks: [a.thanks], actions: [] }

    case 'price':
    case 'service': {
      const svc = SERVICES.find((s) => s.id === service)
      if (svc) {
        const blocks = [a.priceOne(name(svc.id), svc.price, svc.minutes)]
        if (topic === 'service') blocks.unshift(t.services.items[svc.id].desc)
        const actions = [book(svc.id)]
        if (t.guide.styles[svc.id]) actions.push(page('/style', 'style'))
        return { blocks, actions }
      }
      return {
        blocks: [a.priceIntro, SERVICES.map((s) => `${name(s.id)} · CHF ${s.price} · ${s.minutes} min`), a.refills(refill2, refill3)],
        actions: [book()],
      }
    }

    case 'hurt':
    case 'damage':
    case 'makeup':
      return { blocks: [t.faq.items[FAQ[topic]][1]], actions: [] }

    case 'last':
      return { blocks: [t.faq.items[FAQ.last][1]], actions: [page('/aftercare', 'aftercare')] }

    case 'allergy':
      return { blocks: [t.faq.items[FAQ.allergy][1], t.visit.steps[0].text], actions: [page('/visit', 'visit'), whatsapp] }

    case 'pregnant':
      return { blocks: [t.faq.items[FAQ.pregnant][1]], actions: [whatsapp] }

    case 'aftercare':
      return {
        blocks: [a.aftercareIntro, t.aftercare.timeline.map(([, title, text]) => `${title}: ${text}`)],
        actions: [page('/aftercare', 'aftercare')],
      }

    case 'refill':
      return {
        blocks: [a.refills(refill2, refill3), `${t.terms.refill}.`, t.aftercare.timeline[4][2]],
        actions: [{ kind: 'book', service: 'refill2', label: t.aftercare.book }, page('/aftercare', 'calculator')],
      }

    case 'prepare':
      return { blocks: [a.prepareIntro, t.visit.steps[1].list, t.visit.steps[0].text], actions: [page('/visit', 'visit')] }

    case 'policy':
      return {
        blocks: [a.policyIntro, t.booking.policies(t.terms).map(([label, text]) => `${label}: ${text}`)],
        actions: [page('/terms', 'terms')],
      }

    case 'hours':
      return {
        blocks: [a.hoursIntro, WEEK.map((d) => `${t.contact.daysShort[d]} · ${HOURS[d] ? `${clock(HOURS[d][0])}–${clock(HOURS[d][1])}` : t.contact.closed}`)],
        actions: [book()],
      }

    case 'location':
      return { blocks: [a.location(STUDIO_ADDRESS), t.biz.directions], actions: [{ kind: 'ext', href: CONTACT.maps, label: a.links.maps }] }

    case 'contact':
      return { blocks: [a.contact, [BUSINESS.phone, BUSINESS.email]], actions: [whatsapp] }

    case 'voucher':
      return {
        blocks: [a.voucherIntro(t.terms.voucherValidity), VOUCHER_AMOUNTS.map((n) => `CHF ${n} · ${t.voucher.amounts[n]}`)],
        actions: [page('/gift', 'gift')],
      }

    case 'book':
      return { blocks: [a.bookIntro], actions: [book(service)] }

    case 'quiz': {
      const question = t.guide.quiz.questions[q]
      return {
        blocks: q === 0 ? [a.quizIntro, question.q] : [question.q],
        actions: question.a.map((label, v) => ({ kind: 'pick', q, v, label })),
      }
    }

    case 'quizResult':
      return { blocks: [a.quizResult(name(result)), t.guide.quiz.why[result]], actions: [book(result), page('/style', 'style')] }

    default:
      return { blocks: [a.unknown], actions: [whatsapp, ...asks] }
  }
}
