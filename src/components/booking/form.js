// Booking form: initial values and validation.

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// phone and notes are optional; `remind` is an unticked opt-in for refill reminder emails
export const EMPTY_FORM = { name: '', phone: '', email: '', first: false, notes: '', remind: false }

export function validate(form, f) {
  const errors = {}
  if (!form.name.trim()) errors.name = f.required
  if (form.phone.trim() && form.phone.replace(/\D/g, '').length < 9) errors.phone = f.badPhone
  if (!form.email.trim()) errors.email = f.required
  else if (!EMAIL.test(form.email.trim())) errors.email = f.badEmail
  return errors
}
