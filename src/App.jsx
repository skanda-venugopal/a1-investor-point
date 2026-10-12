import { useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import MutualFunds from './pages/MutualFunds.jsx'
import Insurance from './pages/Insurance.jsx'
import AboutUs from './pages/AboutUs.jsx'
import ContactUs from './pages/ContactUs.jsx'
import Calculators from './pages/Calculators.jsx'
import { Privacy, Disclosures } from './pages/Legal.jsx'
import NotFound from './pages/NotFound.jsx'

/** Scroll to top and move focus to <main> on route change (keyboard / screen-reader friendly). */
function RouteEffects({ mainRef }) {
  const { pathname } = useLocation()
  const first = useRef(true)
  useEffect(() => {
    window.scrollTo(0, 0)
    if (first.current) { first.current = false; return }
    mainRef.current?.focus({ preventScroll: true })
  }, [pathname, mainRef])
  return null
}

export default function App() {
  const mainRef = useRef(null)
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only z-50 rounded-full bg-navy-700 px-5 py-3 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
      <Navbar />
      <RouteEffects mainRef={mainRef} />
      <main id="main" ref={mainRef} tabIndex={-1} className="outline-none">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mutual-funds" element={<MutualFunds />} />
          <Route path="/insurance" element={<Insurance />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/calculators" element={<Calculators />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route path="/disclosures" element={<Disclosures />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
