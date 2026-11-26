import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config.js'

// Unit and component tests run in jsdom (a simulated browser in Node).
// End-to-end tests in e2e/ run in a real browser with Playwright instead.
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      setupFiles: ['src/test/setup.js'],
      include: ['src/**/*.test.{js,jsx}', 'worker/src/**/*.test.js'],
      restoreMocks: true,
      coverage: {
        provider: 'v8',
        include: ['src/**/*.{js,jsx}'],
        exclude: ['src/**/*.test.{js,jsx}', 'src/test/**', 'src/main.jsx'],
        reporter: ['text', 'html'],
      },
    },
  }),
)
