import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The site is published on GitHub Pages at https://anna8295.github.io/atelier-cils/,
// so everything is built for that sub-folder. The router uses the same base
// (import.meta.env.BASE_URL), and dev runs at http://localhost:5173/atelier-cils/.
const BASE = '/atelier-cils/'

// GitHub Pages has no redirect rules. Copying index.html to 404.html makes
// it serve the app for any page address (e.g. /atelier-cils/visit), so
// opening or refreshing a page still works; the router then shows that page.
function spaFallback() {
  let outDir
  return {
    name: 'spa-fallback-404',
    apply: 'build',
    configResolved(config) { outDir = resolve(config.root, config.build.outDir) },
    closeBundle() { copyFileSync(resolve(outDir, 'index.html'), resolve(outDir, '404.html')) },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: BASE,
  plugins: [react(), spaFallback()],
})
