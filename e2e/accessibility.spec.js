import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import { PAGES, startBooking } from './helpers.js'

// axe checks the page against the WCAG 2.1 AA rules: contrast, labels, headings,
// keyboard access, ARIA use, and so on.
async function expectNoViolations(page) {
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
  const summary = results.violations.map((v) => `${v.id} (${v.impact}): ${v.help} — ${v.nodes.map((n) => n.target.join(' ')).slice(0, 3).join(' | ')}`)
  expect(summary).toEqual([])
}

test.describe('accessibility', () => {
  test('home page', async ({ page }) => {
    await page.goto('')
    await expectNoViolations(page)
  })

  for (const [path] of PAGES) {
    test(`${path}`, async ({ page }) => {
      await page.goto(path)
      await expectNoViolations(page)
    })
  }

  test('booking details step with errors', async ({ page }) => {
    await page.goto('')
    const booking = await startBooking(page)
    await booking.getByRole('button', { name: 'Confirm booking' }).click()
    await expectNoViolations(page)
  })

  test('quiz with a result', async ({ page }) => {
    await page.goto('/style')
    for (const [q, a] of [['What look', 'Noticeable'], ['natural lashes', 'Average'], ['mascara', 'Never']]) {
      await page.getByRole('group', { name: new RegExp(q) }).getByRole('button', { name: a }).click()
    }
    await expect(page.locator('.result.has')).toBeVisible()
    await expectNoViolations(page)
  })

  test('the quiz can be answered with the keyboard alone', async ({ page }) => {
    await page.goto('/style')
    const option = page.getByRole('group', { name: /What look/ }).getByRole('button', { name: 'Full glam' })
    await option.focus()
    await page.keyboard.press('Enter')
    await expect(option).toHaveAttribute('aria-pressed', 'true')
  })

  test('FAQ answers open with the keyboard', async ({ page }) => {
    await page.goto('/visit')
    const question = page.locator('summary', { hasText: 'How long do extensions last?' })
    await question.focus()
    await page.keyboard.press('Enter')
    await expect(page.getByText(/fall out with your natural lashes/)).toBeVisible()
  })
})
