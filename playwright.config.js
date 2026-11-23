import { defineConfig, devices } from '@playwright/test'

const PORT = 4173
const CI = !!process.env.CI

// End-to-end tests drive the production build (npm run build + preview),
// in a desktop browser and on a phone.
export default defineConfig({
  testDir: 'e2e',
  fullyParallel: true,
  forbidOnly: CI,
  retries: CI ? 1 : 0,
  reporter: CI ? [['github'], ['html', { open: 'never' }]] : [['list'], ['html', { open: 'never' }]],
  use: {
    // same sub-folder as on GitHub Pages
    baseURL: `http://localhost:${PORT}/atelier-cils/`,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    // Most tests run with reduced motion: no smooth scrolling, no intro wait,
    // so they're fast and stable. e2e/motion.spec.js turns motion back on.
    reducedMotion: 'reduce',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'phone', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    command: `npm run build && npm run preview -- --port ${PORT} --strictPort`,
    url: `http://localhost:${PORT}/atelier-cils/`,
    reuseExistingServer: !CI,
    timeout: 120_000,
  },
})
