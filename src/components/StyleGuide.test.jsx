import { describe, expect, it } from 'vitest'
import { fireEvent, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../test/render.jsx'
import StyleGuide from './StyleGuide.jsx'

const answer = (user, question, option) =>
  user.click(within(screen.getByRole('group', { name: new RegExp(question) })).getByRole('button', { name: option }))

describe('Which lashes suit me?', () => {
  it('starts on Classic and switches style with the tabs', async () => {
    const user = userEvent.setup()
    renderWithProviders(<StyleGuide />)

    expect(screen.getByRole('tab', { name: 'Classic' })).toHaveAttribute('aria-selected', 'true')
    await user.click(screen.getByRole('tab', { name: 'Hybrid' }))
    expect(screen.getByRole('tab', { name: 'Hybrid' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText(/Classic lashes mixed with small fans/)).toBeInTheDocument()
  })

  it('waits for all three answers before suggesting a style', async () => {
    const user = userEvent.setup()
    renderWithProviders(<StyleGuide />)

    await answer(user, 'What look do you want', 'Noticeable')
    await answer(user, 'Your natural lashes are', 'Average')
    expect(screen.getByText('Answer all three')).toBeInTheDocument()

    await answer(user, 'Do you wear mascara now', 'Every day')
    expect(screen.getByRole('link', { name: 'Book Volume' })).toBeInTheDocument()
    // the photo switches to the suggestion
    expect(screen.getByRole('tab', { name: 'Volume' })).toHaveAttribute('aria-selected', 'true')
  })

  it('suggests a lash lift for a barely-there look on strong natural lashes', async () => {
    const user = userEvent.setup()
    renderWithProviders(<StyleGuide />)

    await answer(user, 'What look do you want', 'Barely there')
    await answer(user, 'Your natural lashes are', 'Long and strong')
    await answer(user, 'Do you wear mascara now', 'Never')
    expect(screen.getByRole('link', { name: 'Book Lash lift' })).toBeInTheDocument()
  })

  it('never suggests mega volume for fine lashes', async () => {
    const user = userEvent.setup()
    renderWithProviders(<StyleGuide />)

    await answer(user, 'What look do you want', 'Full glam')
    await answer(user, 'Your natural lashes are', 'Fine or sparse')
    await answer(user, 'Do you wear mascara now', 'Every day')
    expect(screen.getByRole('link', { name: 'Book Volume' })).toBeInTheDocument()
  })

  it('shows the natural lashes while the photo is held', () => {
    renderWithProviders(<StyleGuide />)
    const photo = screen.getByRole('button', { name: 'Hold to compare' }).parentElement

    fireEvent.pointerDown(photo)
    expect(within(photo).getByText('Your lashes')).toBeInTheDocument()
    fireEvent.pointerUp(photo)
    expect(within(photo).getByText('Classic')).toBeInTheDocument()
  })
})
