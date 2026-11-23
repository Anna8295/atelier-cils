import { describe, expect, it } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../test/render.jsx'
import Voucher from './Voucher.jsx'

describe('gift voucher', () => {
  it('needs the recipient and an email address', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Voucher />)

    await user.click(screen.getByRole('button', { name: /Request voucher/ }))
    expect(screen.getAllByText('Please fill this in.')).toHaveLength(2)
  })

  it('fills in the card while you type and updates the price on the button', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Voucher />)

    expect(screen.getByText('someone lovely')).toBeInTheDocument()
    await user.type(screen.getByLabelText('Who is it for?'), 'Camille')
    await user.type(screen.getByLabelText('From'), 'Anna')
    expect(screen.getByText('Camille')).toBeInTheDocument()
    expect(screen.getByText('From Anna')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /CHF 200/ }))
    expect(screen.getByRole('button', { name: 'Request voucher · CHF 200' })).toBeInTheDocument()
  })

  it('confirms the request and links to the privacy policy', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Voucher />)

    expect(screen.getByRole('link', { name: 'Privacy policy' })).toHaveAttribute('href', '/privacy')
    await user.type(screen.getByLabelText('Who is it for?'), 'Camille')
    await user.type(screen.getByLabelText('Your email'), 'anna@example.ch')
    await user.click(screen.getByRole('button', { name: /Request voucher/ }))

    expect(screen.getByRole('heading', { name: 'Voucher requested.' })).toBeInTheDocument()
    expect(screen.getByText(/anna@example\.ch.*CHF 150 voucher for Camille/)).toBeInTheDocument()
  })
})
