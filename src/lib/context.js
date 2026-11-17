import { createContext, useContext } from 'react'

// toast messages: const toast = useToast(); toast('Saved')
export const ToastContext = createContext(() => {})
export const useToast = () => useContext(ToastContext)

// which service the visitor picked (from a card, the quiz or the refill calculator)
export const BookingContext = createContext({ service: null, setService: () => {} })
export const useBooking = () => useContext(BookingContext)
