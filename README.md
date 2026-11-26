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
- **Chat assistant:** a bubble that answers questions in English, French or German, runs the style quiz and opens booking with a suggested set. Typed questions are answered by AI (Gemma 4 on Cloudflare Workers AI, free plan) from the site's own text; if the AI is unavailable or the day's free allowance is used up, keyword answers take over.
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

## Chat assistant (Cloudflare Worker)

The AI runs in a small Cloudflare Worker in [`worker/`](worker/). It builds the AI's instructions from the language files (`src/lib/knowledge.js`), only answers this site, and allows 10 questions a minute per visitor. The site finds it through `VITE_ASSISTANT_URL` in `.env.production` and `.env.development`.

```sh
cd worker
npm install
npx wrangler login   # once
npx wrangler deploy  # after changing the worker or the studio's text
```

The site deploys on its own when you push, but the worker doesn't: when you change prices or text, run `npx wrangler deploy` too, so the AI knows.

## Where to change things

- **Text:** `src/i18n/en.js`, `fr.js`, `de.js` (same keys in each)
- **Prices, hours, contact details:** `src/lib/data.js`
- **What the chat assistant understands:** `src/lib/assistantKeywords.js`
- **Colours and fonts:** top of `src/index.css`
