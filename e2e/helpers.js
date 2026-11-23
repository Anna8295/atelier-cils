import { expect } from '@playwright/test'

/** Collects console errors and failed requests, e.g. a missing image, video or font. */
export function trackErrors(page) {
  const errors = []
  page.on('console', (message) => message.type() === 'error' && errors.push(message.text()))
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('requestfailed', (request) => errors.push(`${request.failure()?.errorText}: ${request.url()}`))
  page.on('response', (response) => response.status() >= 400 && errors.push(`${response.status()}: ${response.url()}`))
  return errors
}

/** Records every request that leaves the site (fonts, analytics, embeds…). */
export function trackThirdParties(page, origin) {
  const external = []
  page.on('request', (request) => {
    const url = request.url()
    if (!url.startsWith(origin) && !url.startsWith('data:') && !url.startsWith('blob:')) external.push(url)
  })
  return external
}

export async function expectNoHorizontalScroll(page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  expect(overflow, 'page is wider than the screen').toBeLessThanOrEqual(0)
}

export const bookingSection = (page) => page.locator('#book')

/** A row in the price list, matched by its exact service name. */
export const priceRow = (page, service) =>
  page.locator('.menu-row').filter({ has: page.locator('.menu-name', { hasText: new RegExp(`^${service}`) }) })

/**
 * Books a service from the price list. With a mouse, clicking the row books;
 * on touch screens the row opens first and its Book button books.
 */
export async function bookFromPriceList(page, service) {
  const row = priceRow(page, service)
  await row.click()
  if (await row.evaluate((el) => el.tagName === 'BUTTON')) {
    await row.locator('xpath=..').getByRole('link', { name: `Book ${service}` }).click()
  }
}

/** From the price list: book a service, pick the first free day and time, continue to the details. */
export async function startBooking(page, service = 'Hybrid') {
  await bookFromPriceList(page, service)
  const booking = bookingSection(page)
  await expect(booking.getByRole('heading', { name: 'Pick a day' })).toBeVisible()
  await booking.locator('.cal-day:not(:disabled)').first().click()
  await booking.locator('.slot-list .chip').first().click()
  await booking.getByRole('button', { name: 'Continue' }).click()
  await expect(booking.getByLabel('Full name')).toBeVisible()
  return booking
}

// paths are relative to the base URL (/atelier-cils/)
export const PAGES = [
  ['style', 'Which lashes suit me?'],
  ['visit', 'What happens, step by step.'],
  ['aftercare', 'Make them last longer.'],
  ['about', 'Meet Léa.'],
  ['gift', 'Give someone a full set.'],
  ['privacy', 'Privacy policy'],
  ['terms', 'Booking and voucher terms'],
  ['imprint', 'Imprint'],
]
