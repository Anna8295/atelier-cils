import Hero from '../components/Hero.jsx'
import Marquee from '../components/Marquee.jsx'
import Services from '../components/Services.jsx'
import Gallery from '../components/Gallery.jsx'
import GoodToKnow from '../components/GoodToKnow.jsx'
import Booking from '../components/booking/Booking.jsx'

// The home page does one job: show results and get the booking.
// Everything supporting lives on the detail pages behind <GoodToKnow />.
export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Services />
      <Gallery />
      <GoodToKnow />
      <Booking />
    </>
  )
}
