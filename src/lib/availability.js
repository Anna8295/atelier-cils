// Free-time calculation for the booking flow.
//
// For now the "existing bookings" are generated from the date (busyFor),
// so the calendar looks realistic without a database. Later, busyFor()
// gets replaced by bookings loaded from Supabase; slotsFor() and
// dayStatus() stay the same.

import { HOURS } from './data.js'

export const STEP_MIN = 30 // start times every 30 minutes
export const LEAD_MIN = 120 // same-day bookings need 2 hours' notice
export const MAX_DAYS = 60 // how far ahead clients can book

const pad = (n) => String(n).padStart(2, '0')

export const toISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
export const fromISO = (s) => {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d)
}
export const fmtTime = (mins) => `${pad(Math.floor(mins / 60))}:${pad(mins % 60)}`

export function addDays(d, n) {
  const x = new Date(d)
  x.setDate(x.getDate() + n)
  return x
}

// small deterministic random generator, so a given day always looks the same
function seeded(seed) {
  let x = seed % 2147483647
  return () => {
    x = (x * 48271) % 2147483647
    return x / 2147483647
  }
}

// Example bookings for a day, as [startMinute, endMinute] pairs.
export function busyFor(iso) {
  const hours = HOURS[fromISO(iso).getDay()]
  if (!hours) return []
  const rnd = seeded(Number(iso.replaceAll('-', '')))
  rnd()
  if (rnd() < 0.12) return [[hours[0] * 60, hours[1] * 60]] // fully booked
  const open = hours[0] * 60
  const halfHours = (hours[1] - hours[0]) * 2
  const busy = []
  const count = 1 + Math.floor(rnd() * 3)
  for (let i = 0; i < count; i++) {
    const len = [60, 120, 150][Math.floor(rnd() * 3)]
    const start = open + Math.floor(rnd() * Math.max(1, halfHours - len / 30)) * 30
    busy.push([start, start + len])
  }
  return busy
}

// Start times (minutes after midnight) where `minutes` fit on that day.
export function slotsFor(iso, minutes, now = new Date()) {
  const hours = HOURS[fromISO(iso).getDay()]
  if (!hours) return []
  const today = toISO(now)
  if (iso < today) return []
  const earliest = iso === today ? now.getHours() * 60 + now.getMinutes() + LEAD_MIN : 0
  const busy = busyFor(iso)
  const slots = []
  for (let s = hours[0] * 60; s + minutes <= hours[1] * 60; s += STEP_MIN) {
    if (s < earliest) continue
    if (busy.some(([a, b]) => s < b && s + minutes > a)) continue
    slots.push(s)
  }
  return slots
}

// 'closed' | 'past' | 'out' (too far ahead) | 'full' | 'few' | 'open'
export function dayStatus(iso, minutes, now = new Date()) {
  if (!HOURS[fromISO(iso).getDay()]) return 'closed'
  if (iso < toISO(now)) return 'past'
  if (iso > toISO(addDays(now, MAX_DAYS))) return 'out'
  const n = slotsFor(iso, minutes, now).length
  if (n === 0) return 'full'
  return n <= 3 ? 'few' : 'open'
}

// Calendar file for "Add to calendar" (local Lausanne time).
export function icsFile({ title, iso, start, minutes, location }) {
  const stamp = (d) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d+Z$/, 'Z')
  const local = (m) => iso.replaceAll('-', '') + 'T' + fmtTime(m).replace(':', '') + '00'
  return [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Atelier Cils//Booking//EN',
    'BEGIN:VEVENT',
    `UID:${iso}-${start}-${Date.now()}@atelier-cils`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART;TZID=Europe/Zurich:${local(start)}`,
    `DTEND;TZID=Europe/Zurich:${local(start + minutes)}`,
    `SUMMARY:${title}`,
    `LOCATION:${location}`,
    'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n')
}
