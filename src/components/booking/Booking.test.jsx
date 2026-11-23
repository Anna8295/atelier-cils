import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../../test/render.jsx'
import Booking from './Booking.jsx'

// Fixed "today" (Tuesday 17 November 2026, 08:00) so the calendar is the same on every run.
// Only Date is faked; timers stay real so user-event keeps working.
beforeEach(() => {
  vi.useFakeTimers({ toFake: ['Date'] })
  vi.setSystemTime(new Date(2026, 10, 17, 8, 0))
})
afterEach(() => vi.useRealTimers())

async function pickDayAndTime(user, container) {
  const day = container.querySelector('.cal-day:not(:disabled)')
  await user.click(day)
  const firstTime = within(container.querySelector('.slots-wrap')).getAllByRole('button')[0]
  await user.click(firstTime)
  return firstTime.textContent
}

describe('booking flow', () => {
  it('starts by asking for a service, then shows the calendar', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Booking />)

    expect(screen.getByRole('heading', { name: 'What would you like?' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /^Hybrid/ }))
    expect(screen.getByRole('heading', { name: 'Pick a day' })).toBeInTheDocument()
    expect(screen.getByText('140 min · CHF 150')).toBeInTheDocument()
  })

  it('skips the service step when one was picked elsewhere on the site', () => {
    renderWithProviders(<Booking />, { service: 'volume' })
    expect(screen.getByRole('heading', { name: 'Pick a day' })).toBeInTheDocument()
  })

  it('greys out the closed days', () => {
    const { container } = renderWithProviders(<Booking />, { service: 'classic' })
    // Monday 23 and Sunday 29 November
    for (const label of [/Monday 23 November/, /Sunday 29 November/]) {
      expect(within(container.querySelector('.cal')).getByRole('button', { name: label })).toBeDisabled()
    }
  })

  it('only continues once a time is picked', async () => {
    const user = userEvent.setup()
    const { container } = renderWithProviders(<Booking />, { service: 'classic' })

    expect(screen.getByRole('button', { name: 'Continue' })).toBeDisabled()
    const time = await pickDayAndTime(user, container)
    expect(screen.getByRole('button', { name: 'Continue' })).toBeEnabled()
    expect(screen.getByLabelText('Your appointment')).toHaveTextContent(time)
  })

  it('checks the details and then confirms with an Add to calendar file', async () => {
    const user = userEvent.setup()
    const { container } = renderWithProviders(<Booking />, { service: 'hybrid' })
    await pickDayAndTime(user, container)
    await user.click(screen.getByRole('button', { name: 'Continue' }))

    // purpose and privacy link next to the button, reminders off by default
    expect(screen.getByRole('link', { name: 'Privacy policy' })).toHaveAttribute('href', '/privacy')
    expect(screen.getByLabelText(/Email me when my refill is due/)).not.toBeChecked()

    await user.click(screen.getByRole('button', { name: 'Confirm booking' }))
    expect(screen.getAllByText('Please fill this in.')).toHaveLength(2)

    await user.type(screen.getByLabelText('Full name'), 'Camille Rochat')
    await user.type(screen.getByLabelText('Email'), 'camille@example.ch')
    expect(screen.queryByText('Please fill this in.')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Confirm booking' }))
    expect(screen.getByRole('heading', { name: "You're booked." })).toBeInTheDocument()
    expect(screen.getByText(/camille@example\.ch/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Add to calendar' })).toHaveAttribute('download', 'atelier-cils.ics')
  })

  it('starts again from the service step after Book something else', async () => {
    const user = userEvent.setup()
    const { container } = renderWithProviders(<Booking />, { service: 'hybrid' })
    await pickDayAndTime(user, container)
    await user.click(screen.getByRole('button', { name: 'Continue' }))
    await user.type(screen.getByLabelText('Full name'), 'Camille')
    await user.type(screen.getByLabelText('Email'), 'camille@example.ch')
    await user.click(screen.getByRole('button', { name: 'Confirm booking' }))

    await user.click(screen.getByRole('button', { name: 'Book something else' }))
    expect(screen.getByRole('heading', { name: 'What would you like?' })).toBeInTheDocument()
  })
})
