import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import { bookingSection, expectNoHorizontalScroll, trackErrors } from './helpers.js'

const bubble = (page) => page.getByRole('button', { name: 'Questions? Ask here' })
const chat = (page) => page.getByRole('dialog', { name: 'Studio assistant' })

// The tests never reach the real AI (it would use up the free allowance):
// by default it is unreachable, so the chat falls back to its keyword answers.
const AI = /\/chat$/

test.describe('chat assistant', () => {
  test.beforeEach(async ({ page }) => {
    await page.route(AI, (route) => route.abort())
  })

  test('waits for the visitor to scroll past the hero on the home page', async ({ page }) => {
    await page.goto('')
    await expect(bubble(page)).toBeHidden()
    await page.mouse.wheel(0, 600)
    await page.evaluate(() => window.scrollTo(0, 600))
    await expect(bubble(page)).toBeVisible()
  })

  test('answers, runs the quiz and books the suggestion', async ({ page }) => {
    const errors = trackErrors(page)
    await page.goto('visit')
    await bubble(page).click()
    await expect(chat(page)).toBeVisible()
    await expectNoHorizontalScroll(page)

    await page.getByLabel('Your question').fill('How much is hybrid?')
    await page.getByLabel('Your question').press('Enter')
    await expect(chat(page).getByText('Hybrid costs CHF 150')).toBeVisible()

    await page.getByLabel('Your question').fill('which lashes suit me')
    await page.getByLabel('Your question').press('Enter')
    for (const a of ['Barely there', 'Average', 'Never']) await chat(page).getByRole('button', { name: a }).click()
    await expect(chat(page).getByText("I'd suggest Lash lift.")).toBeVisible()

    await chat(page).getByRole('link', { name: 'Book Lash lift' }).click()
    await expect(chat(page)).toBeHidden()
    await expect(bookingSection(page).getByRole('heading', { name: 'Pick a day' })).toBeVisible()
    // the blocked AI request shows up as a failed request; nothing else may fail
    expect(errors.filter((e) => !/\/chat\b|Failed to load resource/.test(e))).toEqual([])
  })

  test('passes the accessibility checks when open', async ({ page }) => {
    await page.goto('about')
    await bubble(page).click()
    await chat(page).getByRole('button', { name: 'When are you open?' }).click()
    await expect(chat(page).getByText('Opening hours:')).toBeVisible()
    const results = await new AxeBuilder({ page }).include('.ask').withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
    expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(' | ')}`)).toEqual([])
  })

  test('shows an AI answer when the AI replies', async ({ page }) => {
    await page.route(AI, (route) => route.fulfill({ json: { reply: 'Hybrid gives a soft, fuller look.', book: 'hybrid' }, headers: { 'Access-Control-Allow-Origin': '*' } }))
    await page.goto('visit')
    await bubble(page).click()
    await page.getByLabel('Your question').fill('Something soft but noticeable?')
    await page.getByLabel('Your question').press('Enter')
    await expect(chat(page).getByText('Hybrid gives a soft, fuller look.')).toBeVisible()
    await expect(chat(page).getByRole('link', { name: 'Book Hybrid' })).toBeVisible()
  })
})
