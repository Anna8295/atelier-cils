import { translations } from '../../src/i18n/translations.js'
import { parseReply, systemPrompt } from '../../src/lib/knowledge.js'

// Free on the Workers Free plan (10,000 Neurons a day, about 30 per question).
// When the day's allowance is used up, Workers AI refuses with error 3036
// (nothing is billed) and the site falls back to its keyword answers.
const MODEL = '@cf/google/gemma-4-26b-a4b-it'

// only the live site and local development may use the assistant
const SITE = 'https://anna8295.github.io'
const allowed = (origin) => origin === SITE || /^http:\/\/localhost:\d+$/.test(origin)

const MAX_MESSAGES = 8 // earlier messages the AI sees, for follow-up questions
const MAX_CHARS = 500 // per message

const json = (body, status, headers) => Response.json(body, { status, headers })

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') ?? ''
    if (!allowed(origin)) return json({ error: 'origin' }, 403)
    const cors = {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
      Vary: 'Origin',
    }
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors })
    if (request.method !== 'POST' || new URL(request.url).pathname !== '/chat') return json({ error: 'not found' }, 404, cors)

    const ip = request.headers.get('CF-Connecting-IP') ?? 'unknown'
    if (env.LIMITER && !(await env.LIMITER.limit({ key: ip })).success) return json({ error: 'slow' }, 429, cors)

    if (Number(request.headers.get('Content-Length') ?? 0) > 20_000) return json({ error: 'too long' }, 413, cors)
    const body = await request.json().catch(() => null)
    const lang = translations[body?.lang] ? body.lang : 'en'
    const messages = (Array.isArray(body?.messages) ? body.messages : [])
      .filter((m) => (m?.role === 'user' || m?.role === 'assistant') && typeof m.content === 'string' && m.content.trim())
      .slice(-MAX_MESSAGES)
      .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }))
    if (messages.at(-1)?.role !== 'user') return json({ error: 'no question' }, 400, cors)

    try {
      const result = await env.AI.run(MODEL, {
        messages: [{ role: 'system', content: systemPrompt(translations[lang], lang) }, ...messages],
        max_completion_tokens: 400,
        temperature: 0.3,
        chat_template_kwargs: { enable_thinking: false },
      })
      const text = result?.choices?.[0]?.message?.content ?? result?.response
      if (!text) throw new Error('empty answer')
      return json(parseReply(text), 200, cors)
    }
    catch (error) {
      const quota = /3036|daily free allocation/i.test(String(error?.message ?? error))
      console.error(String(error?.message ?? error))
      return json({ error: quota ? 'quota' : 'ai' }, 503, cors)
    }
  },
}
