/*
  APP COMPONENT
  =============
  Layout: Header → Page Content → Footer + BackToTop.
  Header and Footer render on every page; only the middle changes per route.

  KEY CONCEPT — Context power:
  Neither Header nor Footer receive theme as a prop.
  They both call useTheme() directly via ThemeContext — no prop drilling needed.
*/

import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Analytics } from '@vercel/analytics/react'
import Header from './components/Header'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import ScrollProgress from './components/ScrollProgress'
import PageTransition from './components/PageTransition'
import HomePage from './pages/HomePage'
import CaseStudyPage from './pages/CaseStudyPage'

function App() {
  const location = useLocation()

  return (
    <>
      <div className="background-glow" />
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
      <Analytics />
    </>
  )
}

export default App
