import { expect, test } from '@playwright/test'
import { expectNoHorizontalScroll, PAGES, trackErrors } from './helpers.js'

test.describe('detail and legal pages', () => {
  for (const [path, title] of PAGES) {
    test(`${path} loads, fits the screen and links back home`, async ({ page }) => {
      const errors = trackErrors(page)
      await page.goto(path)
      await expect(page.getByRole('heading', { name: title }).first()).toBeVisible()
      await expect(page.getByRole('link', { name: '← Back to home' })).toBeVisible()
      await expectNoHorizontalScroll(page)
      await page.waitForLoadState('networkidle')
      expect(errors).toEqual([])
    })
  }

  test('a link to the FAQ lands on the questions', async ({ page }) => {
    await page.goto('/visit#faq')
    await expect(page.getByRole('heading', { name: /Questions we get every day/ })).toBeInViewport()
  })

  test('the footer links to the legal pages from every page', async ({ page }) => {
    await page.goto('/about')
    await page.getByRole('link', { name: 'Imprint' }).click()
    await expect(page).toHaveURL(/\/imprint$/)
    await page.getByRole('link', { name: 'Privacy policy' }).click()
    await expect(page).toHaveURL(/\/privacy$/)
    await expect(page.getByText('This website sets no cookies')).toBeVisible()
  })

  test('the Book now button on a detail page goes to booking on the home page', async ({ page }) => {
    await page.goto('/aftercare')
    await page.locator('.book-band').getByRole('link', { name: 'Book now' }).click()
    await expect(page).toHaveURL(/\/#book$/)
    await expect(page.locator('#book')).toBeInViewport()
  })
})

test.describe('which lashes suit me?', () => {
  test('the quiz suggests a style and switches the photo', async ({ page }) => {
    await page.goto('/style')
    await page.getByRole('group', { name: /What look do you want/ }).getByRole('button', { name: 'Full glam' }).click()
    await page.getByRole('group', { name: /Your natural lashes are/ }).getByRole('button', { name: 'Average' }).click()
    await page.getByRole('group', { name: /Do you wear mascara/ }).getByRole('button', { name: 'Every day' }).click()

    await expect(page.getByRole('link', { name: 'Book Mega volume' })).toBeVisible()
    await expect(page.getByRole('tab', { name: 'Mega' })).toHaveAttribute('aria-selected', 'true')
  })

  test('holding the photo shows the natural lashes', async ({ page }) => {
    await page.goto('/style')
    const photo = page.locator('.guide-eye')
    await photo.dispatchEvent('pointerdown')
    await expect(photo.locator('.tag')).toHaveText('Your lashes')
    await photo.dispatchEvent('pointerup')
    await expect(photo.locator('.tag')).toHaveText('Classic')
  })
})

test.describe('gift vouchers', () => {
  test('a voucher request from form to confirmation', async ({ page }) => {
    await page.goto('/gift')
    await page.getByRole('button', { name: /CHF 200/ }).click()
    await page.getByLabel('Who is it for?').fill('Camille')
    await expect(page.locator('.vcard')).toContainText('Camille')

    await page.getByLabel('Your email').fill('anna@example.ch')
    await page.getByRole('button', { name: 'Request voucher · CHF 200' }).click()
    await expect(page.getByRole('heading', { name: 'Voucher requested.' })).toBeVisible()
  })
})

test.describe('aftercare', () => {
  test('the refill calculator offers a reminder file', async ({ page }) => {
    await page.goto('/aftercare')
    const today = new Date()
    today.setDate(today.getDate() - 5)
    await page.getByLabel('Date of your last set or refill').fill(today.toISOString().slice(0, 10))
    await expect(page.getByText(/^Refill between/)).toBeVisible()
    await expect(page.getByRole('link', { name: 'Add a reminder' })).toHaveAttribute('download', 'lash-refill-reminder.ics')
  })
})
