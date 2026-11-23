# Atelier Cils

[![Test and deploy](https://github.com/Anna8295/atelier-cils/actions/workflows/deploy.yml/badge.svg)](https://github.com/Anna8295/atelier-cils/actions/workflows/deploy.yml)

Website for a made-up lash studio in Lausanne. It's a portfolio project, not a real business.

**Live:** https://anna8295.github.io/atelier-cils/

**Built with:** React 19, Vite, GSAP, Lenis · tested with Vitest, React Testing Library, Playwright and axe-core · deployed to GitHub Pages

## What's on the site

- **Hero film:** the eyes blink from natural lashes to full volume, then keep blinking on their own.
- **Prices:** a salon-style list. Hover a row to see that style's photo.
- **Which lashes suit me?** Compare every style on the same eye, or take a 3-question quiz.
- **Booking:** pick a service, a free day and time, and your details. The times are example data; nothing is sent.
- **More pages:** first visit, aftercare with a refill calculator, about, gift vouchers, privacy, terms and imprint.
- **Three languages:** English, French and German. The site opens in the browser's language.

## Run it

```sh
npm install
npm run dev    # http://localhost:5173/atelier-cils/
npm run build  # production build in dist/
```

## Tests

```sh
npm test               # everything
npm run test:unit      # unit and component tests (Vitest)
npm run test:e2e       # browser and accessibility tests (Playwright), desktop and phone
```

The first time, install the test browser with `npx playwright install chromium`.

Pushing to `main` runs all the tests and, only if they pass, deploys to GitHub Pages.

## Where to change things

- **Text:** `src/i18n/en.js`, `fr.js`, `de.js` (same keys in each)
- **Prices, hours, contact details:** `src/lib/data.js`
- **Colours and fonts:** top of `src/index.css`
