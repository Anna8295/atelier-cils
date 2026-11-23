import { useState } from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { LanguageProvider } from '../i18n/LanguageContext.jsx'
import { BookingContext } from '../lib/context.js'
import ToastProvider from '../components/Toast.jsx'

function Providers({ children, service: initial }) {
  const [service, setService] = useState(initial ?? null)
  return (
    <LanguageProvider>
      <ToastProvider>
        <BookingContext.Provider value={{ service, setService }}>{children}</BookingContext.Provider>
      </ToastProvider>
    </LanguageProvider>
  )
}

// Renders a component with the same providers the app uses (language, toast,
// booking context, router).
export function renderWithProviders(ui, { route = '/', service } = {}) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Providers service={service}>{ui}</Providers>
    </MemoryRouter>,
  )
}
