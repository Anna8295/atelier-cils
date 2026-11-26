import { afterEach, describe, expect, it, vi } from 'vitest'
import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../test/render.jsx'
import { useBooking } from '../lib/context.js'
import Assistant from './Assistant.jsx'

function ShowService() {
  const { service } = useBooking()
  return <output aria-label="picked service">{service ?? 'none'}</output>
}

async function openChat(user) {
  renderWithProviders(<><Assistant /><ShowService /></>)
  await user.click(screen.getByRole('button', { name: 'Questions? Ask here' }))
  return screen.findByRole('dialog', { name: 'Studio assistant' })
}

const log = () => screen.getByRole('log', { name: 'Conversation' })

describe('chat assistant', () => {
  it('opens with a greeting and suggested questions, and focuses the input', async () => {
    const user = userEvent.setup()
    const chat = await openChat(user)
    expect(within(chat).getByText(/I can tell you about prices/)).toBeInTheDocument()
    expect(within(chat).getByRole('button', { name: 'What does it cost?' })).toBeInTheDocument()
    expect(within(chat).getByLabelText('Your question')).toHaveFocus()
  })

  it('answers a typed question from the FAQ', async () => {
    const user = userEvent.setup()
    await openChat(user)
    await user.type(screen.getByLabelText('Your question'), 'Does it hurt?{Enter}')
    expect(within(log()).getByText('Does it hurt?')).toBeInTheDocument()
    expect(within(log()).getByText(/attached to your natural lash about 1 mm from the skin/)).toBeInTheDocument()
    expect(screen.getByLabelText('Your question')).toHaveValue('')
  })

  it('runs the quiz and picks the suggested set for booking', async () => {
    const user = userEvent.setup()
    await openChat(user)
    await user.click(screen.getByRole('button', { name: 'Which lashes suit me?' }))
    await user.click(screen.getByRole('button', { name: 'Noticeable' }))
    await user.click(screen.getByRole('button', { name: 'Average' }))
    await user.click(screen.getByRole('button', { name: 'Every day' }))
    expect(within(log()).getByText("I'd suggest Volume.")).toBeInTheDocument()

    await user.click(screen.getByRole('link', { name: 'Book Volume' }))
    expect(screen.getByLabelText('picked service')).toHaveTextContent('volume')
    expect(screen.getByRole('dialog', { hidden: true })).not.toBeVisible()
  })

  it('only offers the suggestions on the newest message', async () => {
    const user = userEvent.setup()
    await openChat(user)
    await user.click(screen.getByRole('button', { name: 'When are you open?' }))
    expect(within(log()).queryByRole('button', { name: 'What does it cost?' })).not.toBeInTheDocument()
    expect(within(log()).getByText('Thu · 10:00–20:00')).toBeInTheDocument()
  })

  it('closes with Escape and gives focus back to the bubble, keeping the chat', async () => {
    const user = userEvent.setup()
    const chat = await openChat(user)
    await user.type(screen.getByLabelText('Your question'), 'Where are you?{Enter}')
    await user.keyboard('{Escape}')
    expect(chat).not.toBeVisible()
    const bubble = screen.getByRole('button', { name: 'Questions? Ask here' })
    expect(bubble).toHaveFocus()

    await user.click(bubble)
    expect(within(log()).getByText('Where are you?')).toBeInTheDocument()
  })

  describe('with the AI switched on', () => {
    afterEach(() => {
      vi.unstubAllEnvs()
      vi.unstubAllGlobals()
    })

    const aiAnswers = (status, body) => {
      vi.stubEnv('VITE_ASSISTANT_URL', 'https://assistant.example')
      const fetch = vi.fn(async () => new Response(JSON.stringify(body), { status }))
      vi.stubGlobal('fetch', fetch)
      return fetch
    }

    it('shows the AI answer with a booking button', async () => {
      const fetch = aiAnswers(200, { reply: 'For a soft look:\n- Classic\n- Hybrid', book: 'hybrid' })
      const user = userEvent.setup()
      await openChat(user)
      await user.type(screen.getByLabelText('Your question'), 'I want something soft{Enter}')

      expect(await within(log()).findByText('For a soft look:')).toBeInTheDocument()
      expect(within(log()).getByText('Hybrid')).toBeInTheDocument()
      await user.click(within(log()).getByRole('link', { name: 'Book Hybrid' }))
      expect(screen.getByLabelText('picked service')).toHaveTextContent('hybrid')

      const [url, init] = fetch.mock.calls[0]
      expect(url).toBe('https://assistant.example/chat')
      expect(JSON.parse(init.body)).toEqual({ lang: 'en', messages: [{ role: 'user', content: 'I want something soft' }] })
    })

    it('sends the earlier messages, so follow-up questions make sense', async () => {
      const fetch = aiAnswers(200, { reply: 'It costs CHF 150.', book: null })
      const user = userEvent.setup()
      await openChat(user)
      await user.click(screen.getByRole('button', { name: 'When are you open?' }))
      await user.type(screen.getByLabelText('Your question'), 'and on Sunday?{Enter}')
      await within(log()).findByText('It costs CHF 150.')

      const { messages } = JSON.parse(fetch.mock.calls[0][1].body)
      expect(messages.map((m) => m.role)).toEqual(['user', 'assistant', 'user'])
      expect(messages[0].content).toBe('When are you open?')
      expect(messages[1].content).toContain('Sun · Closed')
    })

    it('falls back to the keyword answer, and stops asking the AI once the free quota is used up', async () => {
      const fetch = aiAnswers(503, { error: 'quota' })
      const user = userEvent.setup()
      await openChat(user)
      await user.type(screen.getByLabelText('Your question'), 'Does it hurt?{Enter}')
      expect(await within(log()).findByText(/1 mm from the skin/)).toBeInTheDocument()

      await user.type(screen.getByLabelText('Your question'), 'Where are you?{Enter}')
      expect(await within(log()).findByText(/Rue de Bourg 12/)).toBeInTheDocument()
      expect(fetch).toHaveBeenCalledTimes(1)
    })
  })
})
