import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import { trackErrors } from './helpers.js'

const switchTo = (page, code) => page.getByRole('group', { name: /Language|Langue|Sprache/ }).getByRole('button', { name: code })

// on the home page the menu (with the language switch) appears once you scroll past the top
async function revealMenu(page) {
  await page.evaluate(() => window.scrollTo(0, 600))
  await expect(page.locator('body')).toHaveClass(/nav-on/)
}

test.describe('languages', () => {
  test('switches the whole page to French and German', async ({ page }) => {
    const errors = trackErrors(page)
    await page.goto('')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Lashes, made by hand in Lausanne.')

    await revealMenu(page)
    await switchTo(page, 'FR').click()
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Des cils posés à la main à Lausanne.')
    await expect(page.locator('html')).toHaveAttribute('lang', 'fr')
    await expect(page.getByRole('heading', { name: 'Réservez votre fauteuil.' })).toBeAttached()
    await expect(page.getByText('Site conceptuel, studio fictif')).toBeAttached()

    await switchTo(page, 'DE').click()
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Wimpern, von Hand gesetzt in Lausanne.')
    await expect(page.locator('html')).toHaveAttribute('lang', 'de')
    expect(errors).toEqual([])
  })

  test('the booking calendar uses the chosen language', async ({ page }) => {
    await page.goto('')
    await revealMenu(page)
    await switchTo(page, 'DE').click()
    await page.locator('#book').getByRole('button', { name: /^Classic/ }).click()
    await expect(page.locator('.cal-wd').first()).toHaveText('Mo')
    await expect(page.locator('.cal-wd').nth(1)).toHaveText('Di')
    await expect(page.locator('.cal-month')).toHaveText(/(Januar|Februar|März|April|Mai|Juni|Juli|August|September|Oktober|November|Dezember)/)
  })

  test('the legal pages are translated', async ({ page }) => {
    await page.goto('privacy')
    await switchTo(page, 'FR').click()
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Politique de confidentialité')
    await expect(page.getByText('Ce site ne dépose aucun cookie')).toBeVisible()
    await switchTo(page, 'DE').click()
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Datenschutzerklärung')
  })
})

test.describe('browser language', () => {
  test.describe('French browser', () => {
    test.use({ locale: 'fr-CH' })
    test('opens in French', async ({ page }) => {
      await page.goto('')
      await expect(page.getByRole('heading', { level: 1 })).toHaveText('Des cils posés à la main à Lausanne.')
      await expect(switchTo(page, 'FR')).toHaveAttribute('aria-pressed', 'true')
    })
  })

  test.describe('German browser', () => {
    test.use({ locale: 'de-CH' })
    test('opens in German, and stores nothing', async ({ page, context }) => {
      await page.goto('')
      await expect(page.getByRole('heading', { level: 1 })).toHaveText('Wimpern, von Hand gesetzt in Lausanne.')
      expect(await context.cookies()).toEqual([])
      expect(await page.evaluate(() => localStorage.length + sessionStorage.length)).toBe(0)
    })
  })

  test.describe('Italian browser', () => {
    test.use({ locale: 'it-CH' })
    test('falls back to English', async ({ page }) => {
      await page.goto('')
      await expect(page.getByRole('heading', { level: 1 })).toHaveText('Lashes, made by hand in Lausanne.')
    })
  })
})

test.describe('accessibility in other languages', () => {
  for (const [locale, path] of [['fr-CH', ''], ['de-CH', ''], ['fr-CH', 'visit'], ['de-CH', 'gift']]) {
    test.describe(`${locale} ${path || 'home'}`, () => {
      test.use({ locale })
      test('passes WCAG 2.1 AA', async ({ page }) => {
        await page.goto(path)
        const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
        expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).slice(0, 3).join(' | ')}`)).toEqual([])
      })
    })
  }
})
