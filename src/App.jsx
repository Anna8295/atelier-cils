import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import Cursor from './components/Cursor.jsx'
import ToastProvider from './components/Toast.jsx'
import RouteEffects from './components/RouteEffects.jsx'
import Home from './pages/Home.jsx'
import StylePage from './pages/StylePage.jsx'
import VisitPage from './pages/VisitPage.jsx'
import AftercarePage from './pages/AftercarePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import GiftPage from './pages/GiftPage.jsx'
import LegalPage from './pages/LegalPage.jsx'
import { LanguageProvider } from './i18n/LanguageContext.jsx'
import { BookingContext } from './lib/context.js'
import { ScrollTrigger, setupSmoothScroll } from './lib/motion.js'

function App() {
  const [service, setService] = useState(null)

  useEffect(() => {
    const cleanScroll = setupSmoothScroll()
    // fonts and images change section heights; re-measure the scroll triggers
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    document.fonts?.ready.then(refresh)
    return () => {
      window.removeEventListener('load', refresh)
      cleanScroll()
    }
  }, [])

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <LanguageProvider>
        <ToastProvider>
          <BookingContext.Provider value={{ service, setService }}>
            <Cursor />
            <Nav />
            <main id="top">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/style" element={<StylePage />} />
                <Route path="/visit" element={<VisitPage />} />
                <Route path="/aftercare" element={<AftercarePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/gift" element={<GiftPage />} />
                <Route path="/privacy" element={<LegalPage id="privacy" key="privacy" />} />
                <Route path="/terms" element={<LegalPage id="terms" key="terms" />} />
                <Route path="/imprint" element={<LegalPage id="imprint" key="imprint" />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
            <RouteEffects />
          </BookingContext.Provider>
        </ToastProvider>
      </LanguageProvider>
    </BrowserRouter>
  )
}

export default App
