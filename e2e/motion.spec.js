import { expect, test } from '@playwright/test'
import { trackErrors } from './helpers.js'

// The rest of the suite runs with reduced motion. These tests turn motion on
// to check the hero intro and that visitors who ask for less motion get it.
test.describe('hero intro', () => {
  test.use({ reducedMotion: 'no-preference' })

  test('plays the film, then shows the headline as the eyes open', async ({ page }) => {
    const errors = trackErrors(page)
    await page.goto('')

    const hero = page.locator('#hero')
    await expect(hero).toHaveClass(/pending/) // the copy waits for the film
    await expect(page.locator('#heroVideo')).toHaveJSProperty('paused', false, { timeout: 5_000 })
    await expect(hero).not.toHaveClass(/pending/, { timeout: 10_000 })
    await expect(page.getByRole('link', { name: 'Book now' }).first()).toBeVisible()

    // after the intro the eyes keep blinking on their own
    await expect(page.locator('.hero-film')).toHaveClass(/idle/, { timeout: 10_000 })
    expect(errors).toEqual([])
  })
})

test.describe('reduced motion', () => {
  test('shows the headline straight away without autoplaying the film', async ({ page }) => {
    await page.goto('')
    await expect(page.locator('#hero')).not.toHaveClass(/pending/)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.locator('#heroVideo')).toHaveJSProperty('paused', true)
  })
})
