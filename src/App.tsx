/*
  APP COMPONENT
  =============
  Layout: Header → Page Content → Footer + BackToTop.
  Header and Footer render on every page; only the middle changes per route.

  KEY CONCEPT — Context power:
  Neither Header nor Footer receive theme as a prop.
  They both call useTheme() directly via ThemeContext — no prop drilling needed.
*/

import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import HomePage from './pages/HomePage'
import CaseStudyPage from './pages/CaseStudyPage'

function App() {
  return (
    <>
      <div className="background-glow" />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/case-studies/:slug" element={<CaseStudyPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
      <BackToTop />
    </>
  )
}

export default App
