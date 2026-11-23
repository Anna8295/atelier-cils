import { afterEach, describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../test/render.jsx'
import Footer from './Footer.jsx'

// Opening hours are always worked out in Lausanne time, whatever the
// visitor's own time zone. The times below are given in UTC.
const at = (utc) => {
  vi.useFakeTimers({ toFake: ['Date'] })
  vi.setSystemTime(new Date(utc))
}
afterEach(() => vi.useRealTimers())

describe('footer', () => {
  it('says the studio is open during opening hours', () => {
    at('2026-11-24T09:00:00Z') // Tuesday 10:00 in Lausanne
    renderWithProviders(<Footer />)
    expect(screen.getByText('Open now · until 19:00')).toBeInTheDocument()
  })

  it('says when it opens next on a closed day', () => {
    at('2026-11-23T09:00:00Z') // Monday 10:00 in Lausanne (closed)
    renderWithProviders(<Footer />)
    expect(screen.getByText('Closed · opens tomorrow 09:00')).toBeInTheDocument()
  })

  it("highlights today's opening hours", () => {
    at('2026-11-26T09:00:00Z') // Thursday
    renderWithProviders(<Footer />)
    expect(screen.getByText('Thu').closest('li')).toHaveClass('today')
  })

  it('links to the legal pages', () => {
    renderWithProviders(<Footer />)
    expect(screen.getByRole('link', { name: 'Imprint' })).toHaveAttribute('href', '/imprint')
    expect(screen.getByRole('link', { name: 'Privacy policy' })).toHaveAttribute('href', '/privacy')
    expect(screen.getByRole('link', { name: 'Terms' })).toHaveAttribute('href', '/terms')
  })

  it('copies the phone number', async () => {
    const user = userEvent.setup()
    const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue()
    renderWithProviders(<Footer />)

    await user.click(screen.getByRole('button', { name: 'Copy' }))
    expect(writeText).toHaveBeenCalledWith('+41 21 000 12 34')
    expect(await screen.findByText('Number copied')).toBeInTheDocument()
  })
})
