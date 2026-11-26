// Sends a typed question to the chat assistant's Cloudflare Worker (worker/),
// which answers with AI. The address comes from VITE_ASSISTANT_URL (.env).
// Without it, or when the AI fails, the chat uses its keyword answers.

export const aiUrl = () => import.meta.env.VITE_ASSISTANT_URL ?? ''

/**
 * messages: the conversation so far, [{ role: 'user' | 'assistant', content }],
 * ending with the new question. Resolves to { reply, book } (book: a service id
 * or null). Rejects with error.code 'quota' when today's free AI is used up.
 */
export async function askAi(messages, lang) {
  const res = await fetch(`${aiUrl()}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lang, messages }),
    signal: AbortSignal.timeout(20_000),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok || typeof data.reply !== 'string' || !data.reply.trim()) {
    throw Object.assign(new Error(`assistant: ${data.error ?? res.status}`), { code: data.error ?? 'ai' })
  }
  return { reply: data.reply, book: data.book ?? null }
}
