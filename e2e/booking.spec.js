import { expect, test } from '@playwright/test'
import { bookingSection, priceRow, startBooking } from './helpers.js'

test.describe('booking', () => {
  test('a price list row opens booking with that service chosen', async ({ page }) => {
    await page.goto('')
    await priceRow(page, 'Volume').click()

    const booking = bookingSection(page)
    await expect(booking).toBeInViewport()
    await expect(booking.getByLabel('Your appointment')).toContainText('Volume')
    await expect(booking.getByRole('heading', { name: 'Pick a day' })).toBeVisible()
  })

  test('closed days cannot be picked', async ({ page }) => {
    await page.goto('')
    await priceRow(page, 'Classic').click()
    const closed = bookingSection(page).locator('.cal-day.closed')
    expect(await closed.count()).toBeGreaterThan(0)
    await expect(closed.first()).toBeDisabled()
  })

  test('a full booking from service to confirmation', async ({ page }) => {
    await page.goto('')
    const booking = await startBooking(page)

    await booking.getByRole('button', { name: 'Confirm booking' }).click()
    await expect(booking.getByText('Please fill this in.')).toHaveCount(2)

    await booking.getByLabel('Full name').fill('Camille Rochat')
    await booking.getByLabel('Email', { exact: true }).fill('camille@example.ch')
    await booking.getByRole('button', { name: 'Confirm booking' }).click()

    await expect(booking.getByRole('heading', { name: "You're booked." })).toBeVisible()
    await expect(booking.getByRole('link', { name: 'Add to calendar' })).toHaveAttribute('download', 'atelier-cils.ics')
  })

  test('the calendar file downloads', async ({ page }) => {
    await page.goto('')
    const booking = await startBooking(page)
    await booking.getByLabel('Full name').fill('Camille Rochat')
    await booking.getByLabel('Email', { exact: true }).fill('camille@example.ch')
    await booking.getByRole('button', { name: 'Confirm booking' }).click()

    const [download] = await Promise.all([
      page.waitForEvent('download'),
      booking.getByRole('link', { name: 'Add to calendar' }).click(),
    ])
    expect(download.suggestedFilename()).toBe('atelier-cils.ics')
  })

  test('Change goes back to an earlier step and keeps the service', async ({ page }) => {
    await page.goto('')
    const booking = await startBooking(page, 'Classic')
    await booking.getByRole('button', { name: 'Change' }).last().click()
    await expect(booking.getByRole('heading', { name: 'Pick a day' })).toBeVisible()
    await expect(booking.getByLabel('Your appointment')).toContainText('Classic')
  })

  test('the booking policy opens and links to the full terms', async ({ page }) => {
    await page.goto('#book')
    await page.getByText('Booking policy').click()
    await expect(page.getByText(/Free up to 24 hours before/)).toBeVisible()
    await page.getByRole('link', { name: 'Full booking terms' }).click()
    await expect(page).toHaveURL(/\/terms$/)
  })
})
