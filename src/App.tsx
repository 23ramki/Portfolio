/*
  APP COMPONENT
  =============
  Layout: Header → Page Content → Footer + BackToTop.
  Header and Footer render on every page; only the middle changes per route.

  KEY CONCEPT — Context power:
  Neither Header nor Footer receive theme as a prop.
  They both call useTheme() directly via ThemeContext — no prop drilling needed.
*/

import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import WireBlobs from './components/WireBlobs'
import Header from './components/Header'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import ScrollProgress from './components/ScrollProgress'
import PageTransition from './components/PageTransition'
import HomePage from './pages/HomePage'
import CaseStudyPage from './pages/CaseStudyPage'

function App() {
  const location = useLocation()

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return (
    <>
      <WireBlobs />
      <ScrollProgress />
      <Header />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
          <Route path="/case-studies/:slug" element={<PageTransition><CaseStudyPage /></PageTransition>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
      <Footer />
      <BackToTop />
    </>
  )
}

export default App
