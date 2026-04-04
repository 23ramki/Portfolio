/*
  APP COMPONENT
  =============
  Layout: Header → Page Content → Footer + BackToTop.
  Header and Footer render on every page; only the middle changes per route.

  KEY CONCEPT — Context power:
  Neither Header nor Footer receive theme as a prop.
  They both call useTheme() directly via ThemeContext — no prop drilling needed.
*/

import { useEffect, useRef } from 'react'
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
  const prevPathRef = useRef(location.pathname)
  const scrollPositions = useRef<Record<string, number>>({})
  const lenisRef = useRef<Lenis | null>(null)

  // Save/restore scroll position on navigation
  useEffect(() => {
    const prevPath = prevPathRef.current
    const currentPath = location.pathname

    if (prevPath !== currentPath) {
      // Save scroll position of the page we're leaving
      scrollPositions.current[prevPath] = window.scrollY

      if (currentPath.startsWith('/case-studies/')) {
        // Navigating to a case study — scroll to top immediately
        lenisRef.current?.scrollTo(0, { immediate: true })
        window.scrollTo(0, 0)
      } else if (scrollPositions.current[currentPath] !== undefined) {
        // Navigating back (e.g. to home) — restore position after page transition
        const savedY = scrollPositions.current[currentPath]
        // Wait for AnimatePresence exit (0.4s) + enter animation to start
        setTimeout(() => {
          lenisRef.current?.scrollTo(savedY, { immediate: true })
          window.scrollTo(0, savedY)
        }, 500)
      }

      prevPathRef.current = currentPath
    }
  }, [location.pathname])

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenisRef.current = lenis

    let rafId: number

    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return (
    <>
      {/* Skip-to-content link for keyboard/screen reader users */}
      <a className="skip-link" href="#main-content">Skip to content</a>
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
