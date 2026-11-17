function Field({ id, label, error, children }) {
  return (
    <div className={`field${error ? ' has-error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      {children}
      {error && <span className="field-error" id={`${id}-err`}>{error}</span>}
    </div>
  )
}

// Name, phone, email, first-visit box, optional note.
export default function DetailsForm({ form, setForm, errors, f }) {
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })
  const aria = (key) => (errors[key] ? { 'aria-invalid': true, 'aria-describedby': `bk-${key}-err` } : {})

  return (
    <div className="fields">
      <Field id="bk-name" label={f.name} error={errors.name}>
        <input id="bk-name" type="text" autoComplete="name" value={form.name} onChange={set('name')} {...aria('name')} />
      </Field>
      <div className="field-row">
        <Field id="bk-phone" label={f.phone} error={errors.phone}>
          <input id="bk-phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+41 79 …" value={form.phone} onChange={set('phone')} {...aria('phone')} />
        </Field>
        <Field id="bk-email" label={f.email} error={errors.email}>
          <input id="bk-email" type="email" autoComplete="email" value={form.email} onChange={set('email')} {...aria('email')} />
        </Field>
      </div>
      <label className="check" htmlFor="bk-first">
        <input id="bk-first" type="checkbox" checked={form.first} onChange={set('first')} />
        <span>{f.first}</span>
      </label>
      <Field id="bk-notes" label={`${f.notes} (${f.optional})`}>
        <textarea id="bk-notes" rows={3} value={form.notes} onChange={set('notes')} />
      </Field>
    </div>
  )
}
