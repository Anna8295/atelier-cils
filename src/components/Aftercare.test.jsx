import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, screen } from '@testing-library/react'
import { renderWithProviders } from '../test/render.jsx'
import Aftercare from './Aftercare.jsx'

// today = Monday 23 November 2026, noon
beforeEach(() => {
  vi.useFakeTimers({ toFake: ['Date'] })
  vi.setSystemTime(new Date(2026, 10, 23, 12, 0))
})
afterEach(() => vi.useRealTimers())

const setLastSet = (iso) => fireEvent.change(screen.getByLabelText('Date of your last set or refill'), { target: { value: iso } })

describe('refill calculator', () => {
  it('shows the refill window and offers a reminder for a recent set', () => {
    renderWithProviders(<Aftercare />)
    setLastSet('2026-11-15') // day 8

    expect(screen.getByText(/Refill between Sun 29 Nov and Sun 6 Dec/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Add a reminder' })).toHaveAttribute('download')
  })

  it('says the refill is due inside the window, without a reminder', () => {
    renderWithProviders(<Aftercare />)
    setLastSet('2026-11-04') // day 19

    expect(screen.getByText('Your refill is due now.')).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Add a reminder' })).not.toBeInTheDocument()
  })

  it('suggests a new set after four weeks', () => {
    renderWithProviders(<Aftercare />)
    setLastSet('2026-10-01')
    expect(screen.getByText('Time for a new full set.')).toBeInTheDocument()
  })

  it('catches a date in the future', () => {
    renderWithProviders(<Aftercare />)
    setLastSet('2026-12-01')
    expect(screen.getByText('That date is in the future.')).toBeInTheDocument()
  })

  it('books a 2-week refill from the calculator', () => {
    renderWithProviders(<Aftercare />)
    expect(screen.getByRole('link', { name: 'Book my refill' })).toHaveAttribute('href', '#book')
  })
})
