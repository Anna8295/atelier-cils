import { useState } from 'react'
import { useLang } from '../i18n/LanguageContext.jsx'
import { useBooking } from '../lib/context.js'
import { STYLES, STYLE_BY_ID } from '../lib/data.js'
import SectionHead from './SectionHead.jsx'

// look 0–2, natural lashes 0–2, mascara 0–2 → suggested style id
function suggest({ look, nat, masc }) {
  if (look === 0 && nat >= 1) return 'lift'
  const score = look * 2 + masc
  let r = score <= 1 ? 'classic' : score <= 3 ? 'hybrid' : score <= 5 ? 'volume' : 'mega'
  if (nat === 0 && r === 'mega') r = 'volume' // fine lashes can't carry mega fans
  if (nat === 0 && r === 'classic') r = 'hybrid'
  return r
}

export default function StyleGuide() {
  const { t } = useLang()
  const { setService } = useBooking()
  const g = t.guide
  const [style, setStyle] = useState('classic')
  const [answers, setAnswers] = useState({})
  const [peek, setPeek] = useState(false) // holding the photo shows the natural lashes

  const qs = g.quiz.questions
  const answered = qs.filter((q) => answers[q.id] !== undefined).length
  const result = answered === qs.length ? suggest(answers) : null
  const resultName = result ? t.services.items[result]?.name ?? g.styles[result].tab : null
  const shown = peek && style !== 'natural' ? 'natural' : style
  const info = g.styles[style]

  const answer = (qid, v) => {
    const next = { ...answers, [qid]: v }
    setAnswers(next)
    if (qs.every((q) => next[q.id] !== undefined)) setStyle(suggest(next))
  }

  const peekOn = () => setPeek(true)
  const peekOff = () => setPeek(false)

  return (
    <section className="section" id="guide" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <SectionHead a={g.titleA} em={g.titleEm} lede={g.lede} />
        <div className="guide">
          <div className="panel">
            <div className="tabs" role="tablist" aria-label={g.tabsLabel}>
              {STYLES.map((s) => (
                <button key={s.id} role="tab" aria-selected={style === s.id} onClick={() => setStyle(s.id)}>
                  {g.styles[s.id].tab}
                </button>
              ))}
            </div>

            <div
              className={`guide-eye${peek ? ' peeking' : ''}`}
              onPointerDown={peekOn}
              onPointerUp={peekOff}
              onPointerLeave={peekOff}
              onPointerCancel={peekOff}
              onContextMenu={(e) => e.preventDefault()}
            >
              {STYLES.map((s) => (
                <img key={s.id} src={s.img} alt={g.styles[s.id].alt} className={shown === s.id ? 'on' : ''} draggable="false" />
              ))}
              <span className="tag">{g.styles[shown].tab}</span>
              {style !== 'natural' && (
                <button
                  type="button"
                  className="hold"
                  aria-pressed={peek}
                  onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); peekOn() } }}
                  onKeyUp={peekOff}
                  onBlur={peekOff}
                >
                  {g.hold}
                </button>
              )}
            </div>

            <dl className="readout">
              <div><dt>{g.readout.per}</dt><dd>{info.per}</dd></div>
              <div><dt>{g.readout.curl}</dt><dd>{info.curl}</dd></div>
              <div><dt>{g.readout.thk}</dt><dd>{info.thk}</dd></div>
              <div><dt>{g.readout.look}</dt><dd>{g.styles[style].look}</dd></div>
            </dl>
            <p className="guide-desc">{g.styles[style].desc}</p>
          </div>

          <form className="panel quiz" onSubmit={(e) => e.preventDefault()}>
            <div className="quiz-progress" aria-hidden="true">
              <i style={{ width: `${(answered / qs.length) * 100}%` }} />
            </div>
            <h3>{g.quiz.title}</h3>
            <p className="lede" style={{ fontSize: '.92rem' }}>{g.quiz.lede}</p>
            {qs.map((q, i) => (
              <div className="q" key={q.id}>
                <fieldset>
                  <legend>
                    <span className="q-n">{i + 1}/{qs.length}</span>
                    {q.q}
                  </legend>
                  <div className="opts">
                    {q.a.map((label, v) => (
                      <button key={label} type="button" className="opt" aria-pressed={answers[q.id] === v} onClick={() => answer(q.id, v)}>
                        {label}
                      </button>
                    ))}
                  </div>
                </fieldset>
              </div>
            ))}

            <div className={`result${result ? ' has' : ''}`} aria-live="polite">
              {result ? (
                <>
                  <img className="result-img" src={STYLE_BY_ID[result].img} alt="" />
                  <div className="result-body">
                    <strong>{resultName}</strong>
                    <p>{g.quiz.why[result]}</p>
                    <a className="btn accent" href="#book" data-cursor={t.cursor.book} onClick={() => setService(result)}>
                      {g.quiz.book(resultName)}
                    </a>
                  </div>
                </>
              ) : (
                <div className="result-body">
                  <strong>{g.quiz.empty}</strong>
                  <p>{g.quiz.emptyWhy}</p>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
