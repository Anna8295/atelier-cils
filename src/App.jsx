import { useEffect, useState } from 'react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import Services from './components/Services.jsx'
import StyleGuide from './components/StyleGuide.jsx'
import Gallery from './components/Gallery.jsx'
import About from './components/About.jsx'
import Reviews from './components/Reviews.jsx'
import FirstVisit from './components/FirstVisit.jsx'
import Aftercare from './components/Aftercare.jsx'
import Faq from './components/Faq.jsx'
import Booking from './components/Booking.jsx'
import Voucher from './components/Voucher.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import Cursor from './components/Cursor.jsx'
import ToastProvider from './components/Toast.jsx'
import { LanguageProvider } from './i18n/LanguageContext.jsx'
import { BookingContext } from './lib/context.js'
import { ScrollTrigger, setupSmoothScroll, setupHeadingReveals, scrollToHash } from './lib/motion.js'

function App() {
  const [service, setService] = useState(null)

  useEffect(() => {
    const cleanScroll = setupSmoothScroll()
    const cleanHeadings = setupHeadingReveals()

    // in-page links go through Lenis so they glide instead of jumping
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      e.preventDefault()
      scrollToHash(a.getAttribute('href'))
    }
    document.addEventListener('click', onClick)

    // fonts and images change section heights; re-measure the scroll triggers
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    document.fonts?.ready.then(refresh)

    return () => {
      document.removeEventListener('click', onClick)
      window.removeEventListener('load', refresh)
      cleanHeadings()
      cleanScroll()
    }
  }, [])

  return (
    <LanguageProvider>
      <ToastProvider>
        <BookingContext.Provider value={{ service, setService }}>
          <Cursor />
          <Nav />
          <main id="top">
            <Hero />
            <Marquee />
            <Services />
            <StyleGuide />
            <Gallery />
            <About />
            <Reviews />
            <FirstVisit />
            <Aftercare />
            <Faq />
            <Booking />
            <Voucher />
            <Contact />
          </main>
          <Footer />
        </BookingContext.Provider>
      </ToastProvider>
    </LanguageProvider>
  )
}

export default App
