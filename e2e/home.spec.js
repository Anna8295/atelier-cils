import { expect, test } from '@playwright/test'
import { expectNoHorizontalScroll, trackErrors, trackThirdParties } from './helpers.js'

test.describe('home page', () => {
  test('loads with no console errors or missing files', async ({ page }) => {
    const errors = trackErrors(page)
    await page.goto('')

    await expect(page).toHaveTitle(/Atelier Cils/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Lashes, made by hand in Lausanne.')
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForLoadState('networkidle')
    expect(errors).toEqual([])
  })

  // privacy: fonts, images and videos are self-hosted, nothing is sent to third parties
  test('loads nothing from other websites', async ({ page, baseURL }) => {
    const external = trackThirdParties(page, baseURL)
    await page.goto('')
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForLoadState('networkidle')
    expect(external).toEqual([])
  })

  test('sets no cookies and stores nothing in the browser', async ({ page, context }) => {
    await page.goto('')
    await page.waitForLoadState('networkidle')
    expect(await context.cookies()).toEqual([])
    expect(await page.evaluate(() => localStorage.length + sessionStorage.length)).toBe(0)
  })

  test('never scrolls sideways', async ({ page }) => {
    await page.goto('')
    await expectNoHorizontalScroll(page)
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await expectNoHorizontalScroll(page)
  })

  test('shows no fake reviews', async ({ page }) => {
    await page.goto('')
    await expect(page.getByText(/reviews/i)).toHaveCount(0)
  })
})

test.describe('navigation', () => {
  test('hides over the hero and slides in once you scroll', async ({ page, isMobile }) => {
    test.skip(isMobile, 'the menu links are hidden on phones; the bottom booking bar is used instead')
    await page.goto('')
    await expect(page.locator('body')).not.toHaveClass(/nav-on/)
    await page.mouse.wheel(0, 600)
    await expect(page.locator('body')).toHaveClass(/nav-on/)
    await expect(page.getByRole('link', { name: 'Book now' }).first()).toBeInViewport()
  })

  test('shows a sticky booking bar on phones', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'phone only')
    await page.goto('')
    await page.mouse.wheel(0, 1500)
    await expect(page.locator('.mbar').getByRole('link', { name: 'Book now' })).toBeInViewport()
  })

  test('takes you to the prices', async ({ page }) => {
    await page.goto('')
    await page.getByRole('link', { name: 'See prices' }).click()
    await expect(page.locator('#services .menu-row').first()).toBeInViewport()
  })

  test('opens a detail page from Good to know and comes back', async ({ page }) => {
    await page.goto('')
    await page.getByRole('link', { name: /Your first visit/ }).click()
    await expect(page).toHaveURL(/\/visit$/)
    await expect(page.getByRole('heading', { name: 'What happens, step by step.' })).toBeVisible()

    await page.getByRole('link', { name: '← Back to home' }).click()
    await expect(page).toHaveURL(/\/$/)
  })

  // GitHub Pages serves 404.html for any address it doesn't know (e.g. /atelier-cils/visit);
  // it must be the app itself so opening or refreshing a page still works
  test('ships a 404.html that is the app itself', async ({ page }) => {
    const [fallback, index] = await Promise.all([page.request.get('404.html'), page.request.get('')])
    expect(fallback.status()).toBe(200)
    expect(await fallback.text()).toBe(await index.text())
  })

  test('sends unknown addresses to the home page', async ({ page }) => {
    await page.goto('does-not-exist')
    await expect(page).toHaveURL(/\/$/)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })
})
