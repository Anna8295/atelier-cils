# Atelier Cils

One-page website for a lash artist in Lausanne: services and prices, a style guide with a quiz, before and after sliders, first visit, aftercare, FAQ, booking, gift vouchers and contact.

Built with React 19 + Vite 8. Motion uses GSAP (ScrollTrigger) with Lenis smooth scrolling.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
npm run preview   # serve the build
npm run lint      # oxlint
```

## Pages

The home page has one job: show results and get the booking. Supporting info has its own pages, opened from the "Good to know" cards and the nav.

| Route | Content |
| --- | --- |
| `/` | Hero film, prices, before & after, reviews, Good to know cards, booking, location |
| `/style` | Which lashes suit me? Style comparison + 3-question quiz |
| `/visit` | First visit steps + FAQ (`/visit#faq`) |
| `/aftercare` | Aftercare tips + refill calculator |
| `/about` | About Léa, certifications, products |
| `/gift` | Gift vouchers |

Every detail page ends with a booking band. `#…` links (like `#book`) always lead to that section on the home page, from any page.
`public/_redirects` sends every route to `index.html` on Netlify.

## Where things live

| What | Where |
| --- | --- |
| All text (for FR / DE translations) | `src/i18n/translations.js` |
| Prices, durations, opening hours, contact details, booking link | `src/lib/data.js` |
| Pages (which sections each route shows) | `src/pages/` |
| One component per page section | `src/components/` |
| Smooth scroll, headline char reveal, reduced-motion check | `src/lib/motion.js` |
| Colours, fonts, all styles | `src/index.css` (tokens at the top, dark mode included) |
| Lash photos (style guide + gallery) | `src/assets/lashes/` |
| Hero video + idle blink clip | `src/assets/video/` |

## Booking

`src/components/booking/` is the full client flow: service → calendar & free times → details → done (with an .ics "Add to calendar").
It is **UI only for now**: nothing is saved or sent.

- `src/lib/availability.js` works out free start times from opening hours (`HOURS` in `data.js`), the service length, 2 h same-day notice and existing bookings. Existing bookings come from `busyFor()`, which generates example bookings per date.
- To go live: replace `busyFor()` with bookings from the database (Supabase), and make the confirm step in `Booking.jsx` send the booking to a server function that re-checks the slot, saves it and sends the emails.

## Hero video

`hero.mp4` plays once (natural lashes → blink → full volume), then the copy appears.
After that `blink.mp4` plays every few seconds at a random speed. It was cut from the
end of `hero.mp4` (closed eyes → open, reversed then forwards), so it starts and ends on
the same frame and joins without a jump. To rebuild it from a new hero video:

```bash
ffmpeg -i hero.mp4 -filter_complex "[0:v]trim=start=2.85,setpts=PTS-STARTPTS,split[a][b];[a]reverse[r];[r][b]concat=n=2:v=1[out]" \
  -map "[out]" -an -c:v libx264 -crf 23 -pix_fmt yuv420p -movflags +faststart blink.mp4
```

Change `2.85` to the moment the eyes are fully closed in the new video.

## Before going live

- Replace the AI sample images in the gallery with real client photos.
- Replace the sample reviews with real Google reviews.
- Real name, address, phone, WhatsApp, Instagram and Fresha link in `src/lib/data.js`.
- Portrait photo of Léa on the About page (`PORTRAIT` in `src/components/About.jsx` currently shows a lash close-up).
- Add the FR and DE translations, then the Impressum and privacy pages.
