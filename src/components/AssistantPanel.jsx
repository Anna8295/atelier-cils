import { Fragment, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext.jsx'
import { useBooking } from '../lib/context.js'
import { askAi, aiUrl } from '../lib/askAi.js'
import { buildReply, understand } from '../lib/assistant.js'
import { prefersReducedMotion } from '../lib/motion.js'
import { suggest } from '../lib/quiz.js'

const QUIZ = ['look', 'nat', 'masc'] // ids of t.guide.quiz.questions, in order

// Messages are kept as ids and turned into text on screen (see src/lib/assistant.js):
//   bot:  { from: 'bot', topic, service?, q?, result? } or { from: 'bot', ai: text, book? }
//   you:  { from: 'you', text } or { from: 'you', ask: topic } or { from: 'you', pick: { q, v } }
// Typed questions go to the AI (when VITE_ASSISTANT_URL is set); the suggested
// questions and the quiz are answered here, instantly and without using the
// free AI allowance. If the AI fails, the keyword answer is shown instead.
export default function AssistantPanel({ open, onClose }) {
  const { t, lang } = useLang()
  const { setService } = useBooking()
  const a = t.assistant
  const [messages, setMessages] = useState([{ id: 0, from: 'bot', topic: 'hello' }])
  const [typing, setTyping] = useState(false)
  const [text, setText] = useState('')
  const nextId = useRef(1)
  const quiz = useRef({})
  const timer = useRef(null)
  const aiOff = useRef(false) // today's free AI is used up: keyword answers only
  const log = useRef(null)
  const input = useRef(null)

  useEffect(() => {
    if (open) input.current?.focus()
  }, [open])

  // keep the newest message in view
  useEffect(() => {
    const el = log.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, typing])

  useEffect(() => () => clearTimeout(timer.current), [])

  const add = (...msgs) => setMessages((list) => [...list, ...msgs.map((m) => ({ ...m, id: nextId.current++ }))])

  // a short "writing…" pause feels less abrupt; skipped with reduced motion
  const reply = (msg) => {
    clearTimeout(timer.current)
    if (prefersReducedMotion()) return add(msg)
    setTyping(true)
    timer.current = setTimeout(() => {
      setTyping(false)
      add(msg)
    }, 550)
  }

  const answerTopic = (topic, service = null) => {
    if (topic === 'quiz') {
      quiz.current = {}
      reply({ from: 'bot', topic: 'quiz', q: 0 })
    }
    else reply({ from: 'bot', topic, service })
  }

  const send = (e) => {
    e.preventDefault()
    const question = text.trim()
    if (!question || typing) return
    setText('')
    add({ from: 'you', text: question })
    const { topic, service } = understand(question)
    if (!aiUrl() || aiOff.current) return answerTopic(topic, service)

    setTyping(true)
    askAi([...history(), { role: 'user', content: question }], lang)
      .then(({ reply, book }) => add({ from: 'bot', ai: reply, book }))
      .catch((error) => {
        if (error.code === 'quota') aiOff.current = true
        if (topic === 'quiz') quiz.current = {}
        add(topic === 'quiz' ? { from: 'bot', topic, q: 0 } : { from: 'bot', topic, service })
      })
      .finally(() => setTyping(false))
  }

  // the conversation as text, so the AI understands follow-up questions
  const history = () =>
    messages.slice(1).map((m) => ({
      role: m.from === 'you' ? 'user' : 'assistant',
      content: m.from === 'you' ? youText(m) : buildReply(m, t).blocks.flat().join('\n'),
    }))

  const ask = (topic) => {
    add({ from: 'you', ask: topic })
    answerTopic(topic)
  }

  const pick = (q, v) => {
    add({ from: 'you', pick: { q, v } })
    quiz.current[QUIZ[q]] = v
    if (q + 1 < QUIZ.length) reply({ from: 'bot', topic: 'quiz', q: q + 1 })
    else reply({ from: 'bot', topic: 'quizResult', result: suggest(quiz.current) })
  }

  const youText = (m) =>
    m.text ?? (m.ask ? a.suggestions[m.ask] : t.guide.quiz.questions[m.pick.q].a[m.pick.v])

  const action = (x, latest) => {
    switch (x.kind) {
      case 'book':
        return (
          <a className="btn accent" href="#book" data-cursor={t.cursor.book} onClick={() => { if (x.service) setService(x.service); onClose(false) }}>
            {x.label}
          </a>
        )
      case 'page':
        return <Link className="chip" to={x.to} onClick={() => onClose(false)}>{x.label}</Link>
      case 'ext':
        return <a className="chip" href={x.href} target="_blank" rel="noopener noreferrer">{x.label}</a>
      // suggested questions and quiz answers only make sense on the newest message
      case 'ask':
        return latest && <button type="button" className="chip" onClick={() => ask(x.topic)}>{x.label}</button>
      case 'pick':
        return latest && <button type="button" className="chip" onClick={() => pick(x.q, x.v)}>{x.label}</button>
      default:
        return null
    }
  }

  return (
    <section
      id="ask-panel"
      className="ask-panel"
      role="dialog"
      aria-labelledby="ask-title"
      hidden={!open}
      onKeyDown={(e) => { if (e.key === 'Escape') onClose(true) }}
    >
      <header className="ask-head">
        <div>
          <h2 id="ask-title">{a.title}</h2>
          <p>{a.note}</p>
        </div>
        <button type="button" className="ask-close" aria-label={a.close} onClick={() => onClose(true)}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      </header>

      <div className="ask-log" ref={log} role="log" aria-label={a.logLabel} tabIndex={0} data-lenis-prevent>
        {messages.map((m, i) => {
          if (m.from === 'you') {
            return (
              <div key={m.id} className="ask-msg you">
                <span className="sr-only">{a.you}: </span>
                <p>{youText(m)}</p>
              </div>
            )
          }
          const r = buildReply(m, t)
          const latest = i === messages.length - 1 && !typing
          const actions = r.actions.map((x) => action(x, latest)).filter(Boolean)
          return (
            <div key={m.id} className="ask-msg bot">
              <span className="sr-only">{a.bot}: </span>
              {r.blocks.map((b, j) =>
                Array.isArray(b)
                  ? <ul key={j}>{b.map((line) => <li key={line}>{line}</li>)}</ul>
                  : <p key={j}>{b}</p>,
              )}
              {actions.length > 0 && (
                <div className="ask-actions">
                  {actions.map((el, j) => <Fragment key={j}>{el}</Fragment>)}
                </div>
              )}
            </div>
          )
        })}
        {typing && <p className="ask-typing">{a.typing}</p>}
      </div>

      <form className="ask-form" onSubmit={send}>
        <label htmlFor="ask-input" className="sr-only">{a.inputLabel}</label>
        <input
          id="ask-input"
          ref={input}
          type="text"
          autoComplete="off"
          maxLength={300}
          placeholder={a.placeholder}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="btn accent" disabled={!text.trim()}>{a.send}</button>
      </form>
    </section>
  )
}
