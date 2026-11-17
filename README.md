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

## Where things live

| What | Where |
| --- | --- |
| All text (for FR / DE translations) | `src/i18n/translations.js` |
| Prices, durations, opening hours, contact details, booking link | `src/lib/data.js` |
| One component per page section | `src/components/` |
| Smooth scroll, headline char reveal, reduced-motion check | `src/lib/motion.js` |
| Colours, fonts, all styles | `src/index.css` (tokens at the top, dark mode included) |
| Lash photos (style guide + gallery) | `src/assets/lashes/` |
| Hero video + idle blink clip | `src/assets/video/` |

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
- Portrait photo in the About section.
- Add the FR and DE translations, then the Impressum and privacy pages.
