import { describe, expect, it } from 'vitest'
import { HOURS } from './data.js'
import { busyFor, dayStatus, fmtTime, fromISO, icsFile, MAX_DAYS, addDays, slotsFor, STEP_MIN, toISO } from './availability.js'

// Fixed "now" so results don't depend on the day the tests run:
// Tuesday 24 November 2026, 12:10.
const NOW = new Date(2026, 10, 24, 12, 10)
const TUESDAY = '2026-11-24'
// an open day with plenty of free times for short and long services
const OPEN_DAY = '2026-12-01'
const MONDAY = '2026-11-30'
const SUNDAY = '2026-11-29'

describe('date helpers', () => {
  it('turns a date into YYYY-MM-DD and back', () => {
    expect(toISO(new Date(2026, 0, 5))).toBe('2026-01-05')
    expect(toISO(fromISO('2026-12-31'))).toBe('2026-12-31')
  })

  it('formats minutes after midnight as HH:MM', () => {
    expect(fmtTime(9 * 60)).toBe('09:00')
    expect(fmtTime(14 * 60 + 30)).toBe('14:30')
  })
})

describe('slotsFor', () => {
  it('has no times on the closed days (Sunday and Monday)', () => {
    expect(slotsFor(SUNDAY, 60, NOW)).toEqual([])
    expect(slotsFor(MONDAY, 60, NOW)).toEqual([])
  })

  it('has no times on a day in the past', () => {
    expect(slotsFor('2026-11-20', 60, NOW)).toEqual([])
  })

  // the core promise of the booking flow: every time shown really fits
  it.each([60, 120, 150, 180])('only offers %i-minute times that fit the day and miss other bookings', (minutes) => {
    const [open, close] = HOURS[fromISO(OPEN_DAY).getDay()]
    const busy = busyFor(OPEN_DAY)
    for (const start of slotsFor(OPEN_DAY, minutes, NOW)) {
      expect(start % STEP_MIN).toBe(0)
      expect(start).toBeGreaterThanOrEqual(open * 60)
      expect(start + minutes).toBeLessThanOrEqual(close * 60)
      expect(busy.some(([a, b]) => start < b && start + minutes > a)).toBe(false)
    }
  })

  it('has free times on an ordinary open day (so the checks above are not empty)', () => {
    expect(slotsFor(OPEN_DAY, 60, NOW).length).toBeGreaterThan(0)
  })

  it('needs two hours notice for a booking today', () => {
    const slots = slotsFor(TUESDAY, 60, NOW)
    const earliest = 12 * 60 + 10 + 120
    expect(slots.every((s) => s >= earliest)).toBe(true)
  })

  it('offers fewer (or the same) times for a longer service', () => {
    expect(slotsFor(OPEN_DAY, 180, NOW).length).toBeLessThanOrEqual(slotsFor(OPEN_DAY, 60, NOW).length)
  })

  it('gives the same example bookings for the same day every time', () => {
    expect(busyFor(OPEN_DAY)).toEqual(busyFor(OPEN_DAY))
  })
})

describe('dayStatus', () => {
  it('marks closed, past and too-far-ahead days', () => {
    expect(dayStatus(SUNDAY, 60, NOW)).toBe('closed')
    expect(dayStatus('2026-11-20', 60, NOW)).toBe('past')
    expect(dayStatus(toISO(addDays(NOW, MAX_DAYS + 7)), 60, NOW)).not.toMatch(/^(open|few)$/)
  })

  it('agrees with the number of free times', () => {
    const status = dayStatus(OPEN_DAY, 120, NOW)
    const n = slotsFor(OPEN_DAY, 120, NOW).length
    expect(status).toBe(n === 0 ? 'full' : n <= 3 ? 'few' : 'open')
  })
})

describe('icsFile', () => {
  it('builds a calendar event in Lausanne time', () => {
    const ics = icsFile({ title: 'Hybrid · Atelier Cils', iso: TUESDAY, start: 9 * 60 + 30, minutes: 90, location: 'Rue de Bourg 12' })
    expect(ics).toContain('BEGIN:VCALENDAR')
    expect(ics).toContain('DTSTART;TZID=Europe/Zurich:20261124T093000')
    expect(ics).toContain('DTEND;TZID=Europe/Zurich:20261124T110000')
    expect(ics).toContain('SUMMARY:Hybrid · Atelier Cils')
    expect(ics).toContain('END:VCALENDAR')
  })
})
