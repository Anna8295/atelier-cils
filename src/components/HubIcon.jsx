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
  // gift box with a bow
  gift: [
    'M8 19h32v7H8z',
    'M10.5 26v14h27V26',
    'M24 19v21',
    'M24 19c-2.5-5.5-10-7-10-2.5 0 2.5 4 2.5 10 2.5',
    'M24 19c2.5-5.5 10-7 10-2.5 0 2.5-4 2.5-10 2.5',
  ],
}

export default function HubIcon({ id }) {
  const paths = PATHS[id]
  if (!paths) return null
  return (
    <svg className="hub-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths.map((d) => (
        <path key={d} d={d} pathLength="1" />
      ))}
    </svg>
  )
}
