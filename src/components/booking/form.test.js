import { describe, expect, it } from 'vitest'
import { translations } from '../../i18n/translations.js'
import { EMPTY_FORM, validate } from './form.js'

const f = translations.en.booking.form
const form = (fields) => ({ ...EMPTY_FORM, ...fields })

describe('booking form validation', () => {
  it('needs a name and an email', () => {
    expect(validate(EMPTY_FORM, f)).toEqual({ name: f.required, email: f.required })
  })

  it('accepts a booking without a phone number', () => {
    expect(validate(form({ name: 'Camille', email: 'camille@example.ch' }), f)).toEqual({})
  })

  it('refuses an email address without a domain', () => {
    expect(validate(form({ name: 'Camille', email: 'camille@' }), f)).toEqual({ email: f.badEmail })
  })

  it('checks a phone number only when one is given', () => {
    expect(validate(form({ name: 'Camille', email: 'c@example.ch', phone: '123' }), f)).toEqual({ phone: f.badPhone })
    expect(validate(form({ name: 'Camille', email: 'c@example.ch', phone: '+41 21 000 12 34' }), f)).toEqual({})
  })

  it('starts with the reminder opt-in unticked', () => {
    expect(EMPTY_FORM.remind).toBe(false)
  })
})
