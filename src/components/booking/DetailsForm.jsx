function Field({ id, label, error, hint, children }) {
  return (
    <div className={`field${error ? ' has-error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      {children}
      {hint && !error && <span className="field-hint" id={`${id}-hint`}>{hint}</span>}
      {error && <span className="field-error" id={`${id}-err`}>{error}</span>}
    </div>
  )
}

// Name, email, optional phone, first-visit box, optional note, reminder opt-in.
// Only what's needed to arrange the appointment; no health questions.
export default function DetailsForm({ form, setForm, errors, f }) {
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })
  const aria = (key) => (errors[key] ? { 'aria-invalid': true, 'aria-describedby': `bk-${key}-err` } : {})

  return (
    <div className="fields">
      <Field id="bk-name" label={f.name} error={errors.name}>
        <input id="bk-name" type="text" autoComplete="name" value={form.name} onChange={set('name')} {...aria('name')} />
      </Field>
      <div className="field-row">
        <Field id="bk-phone" label={`${f.phone} (${f.optional})`} error={errors.phone} hint={f.phoneHint}>
          <input id="bk-phone" type="tel" autoComplete="tel" inputMode="tel" value={form.phone} onChange={set('phone')} aria-describedby="bk-phone-hint" {...aria('phone')} />
        </Field>
        <Field id="bk-email" label={f.email} error={errors.email}>
          <input id="bk-email" type="email" autoComplete="email" value={form.email} onChange={set('email')} {...aria('email')} />
        </Field>
      </div>
      <label className="check" htmlFor="bk-first">
        <input id="bk-first" type="checkbox" checked={form.first} onChange={set('first')} />
        <span>{f.first}</span>
      </label>
      <Field id="bk-notes" label={`${f.notes} (${f.optional})`} hint={f.notesHint}>
        <textarea id="bk-notes" rows={3} maxLength={300} value={form.notes} onChange={set('notes')} aria-describedby="bk-notes-hint" />
      </Field>
      <label className="check" htmlFor="bk-remind">
        <input id="bk-remind" type="checkbox" checked={form.remind} onChange={set('remind')} />
        <span>{f.remind} ({f.optional})</span>
      </label>
    </div>
  )
}
