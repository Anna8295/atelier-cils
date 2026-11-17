// Line icons for the Good to know cards (48×48, stroke only).
// Every path has pathLength="1", so the "drawing" animation can run
// stroke-dashoffset from 1 to 0 regardless of the real path length.

const PATHS = {
  // eye with lashes
  style: [
    'M6 27c5-8 11-12 18-12s13 4 18 12',
    'M6 27c5 7 11 10 18 10s13-3 18-10',
    'M29 26.5a5 5 0 1 1-10 0a5 5 0 1 1 10 0',
    'M11.5 19.5L8.5 15.5M17.5 16.5l-1.6-4.6M24 15v-5M30.5 16.5l1.6-4.6M36.5 19.5l3-4',
  ],
  // calendar with a check
  visit: [
    'M10 13h28a3 3 0 0 1 3 3v21a3 3 0 0 1-3 3H10a3 3 0 0 1-3-3V16a3 3 0 0 1 3-3z',
    'M16 8v9M32 8v9',
    'M7 21h34',
    'M18 30.5l4.2 4.2 8-8',
  ],
  // lash spoolie + water drop
  aftercare: [
    'M8 41l15-15',
    'M23 26l12-12',
    'M25 20.5l4.5 4.5M28 17.5l4.5 4.5M31 14.5l4.5 4.5M34 11.5l3.5 3.5',
    'M38 29c-2.6 3.4-4 5.8-4 7.4a4 4 0 0 0 8 0c0-1.6-1.4-4-4-7.4z',
  ],
  // speech bubble with a question mark
  faq: [
    'M9 10h30a3 3 0 0 1 3 3v17a3 3 0 0 1-3 3H23l-8 7v-7H9a3 3 0 0 1-3-3V13a3 3 0 0 1 3-3z',
    'M20 18.5a4 4 0 1 1 5.8 3.6c-1.1.6-1.8 1.5-1.8 2.9v.6',
    'M24 28.6v.4',
  ],
  // lash tweezers holding a lash
  about: [
    'M15 6l8.2 31.5',
    'M33 6l-8.2 31.5',
    'M15 6h18',
    'M19 41.5c2.6-2.2 7.4-2.2 10 0',
    'M39 16l1 2.4 2.4 1-2.4 1-1 2.4-1-2.4-2.4-1 2.4-1z',
  ],
  // footer: map pin
  pin: [
    'M24 43s-13-12.2-13-22a13 13 0 0 1 26 0c0 9.8-13 22-13 22z',
    'M28.5 21a4.5 4.5 0 1 1-9 0a4.5 4.5 0 1 1 9 0',
  ],
  // footer: clock
  clock: [
    'M42 24a18 18 0 1 1-36 0a18 18 0 1 1 36 0',
    'M24 13v11l7 5',
  ],
  // footer: speech bubble
  chat: [
    'M24 8c9.9 0 18 6.7 18 15s-8.1 15-18 15c-2.2 0-4.3-.3-6.2-.9L9 41l2.4-7.6C8.1 30.6 6 27 6 23 6 14.7 14.1 8 24 8z',
    'M17 23h.01M24 23h.01M31 23h.01',
  ],
  // visit steps: plaster (patch test)
  patch: [
    'M9.5 30.5l21-21a5 5 0 0 1 7 7l-21 21a5 5 0 0 1-7-7z',
    'M19 20l9 9',
    'M21.5 24.5h.01M24.5 21.5h.01M26.5 26.5h.01M23.5 23.5h.01',
  ],
  // visit steps: checklist (come ready)
  ready: [
    'M14 7h20a3 3 0 0 1 3 3v30a3 3 0 0 1-3 3H14a3 3 0 0 1-3-3V10a3 3 0 0 1 3-3z',
    'M16.5 18l2.5 2.5 4.5-5M16.5 29l2.5 2.5 4.5-5',
    'M27 18h5M27 29h5',
  ],
  // visit steps: pencil drawing a lash map (consultation)
  consult: [
    'M31 7l10 10-21 21H10V28z',
    'M27 11l10 10',
    'M7 43c7-3 15-3 22 0',
  ],
  // visit steps: closed eye with lashes (application)
  apply: [
    'M6 20c5 8 11 11 18 11s13-3 18-11',
    'M11.5 27.5l-3 4.5M17.5 30l-1.6 5M24 31v5.5M30.5 30l1.6 5M36.5 27.5l3 4.5',
  ],
  // visit steps: hand mirror (check)
  mirror: [
    'M35 18a12 12 0 1 1-24 0a12 12 0 1 1 24 0',
    'M23 30v13M19 43h8',
    'M16.5 15.5a7 7 0 0 1 5.5-4.5',
  ],
  // gift box with a bow
  gift: [
    'M8 19h32v7H8z',
    'M10.5 26v14h27V26',
    'M24 19v21',
    'M24 19c-2.5-5.5-10-7-10-2.5 0 2.5 4 2.5 10 2.5',
    'M24 19c2.5-5.5 10-7 10-2.5 0 2.5-4 2.5-10 2.5',
  ],
}

export default function HubIcon({ id, className = 'hub-icon' }) {
  const paths = PATHS[id]
  if (!paths) return null
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths.map((d) => (
        <path key={d} d={d} pathLength="1" />
      ))}
    </svg>
  )
}
