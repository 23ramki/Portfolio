import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import ThemeToggle from './ThemeToggle'
import styles from './Header.module.css'

const HOME_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#case-studies', label: 'Cases' },
  { href: '#education', label: 'Education' },
  { href: '#contact', label: 'Contact' },
]

export default function Header() {
  const location = useLocation()
  const { theme } = useTheme()
  const isHome = location.pathname === '/'
  const [menuOpen, setMenuOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)

  // Close the mobile menu whenever the route changes
  useEffect(() => setMenuOpen(false), [location])

  // Lock background scroll while the drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Hide header on scroll down, show on scroll up (rAF-throttled)
  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const currentY = window.scrollY
        if (currentY < 60) {
          setHidden(false)
        } else if (currentY > lastScrollY.current + 5) {
          setHidden(true)
        } else if (currentY < lastScrollY.current - 5) {
          setHidden(false)
        }
        lastScrollY.current = currentY
        ticking = false
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const close = () => setMenuOpen(false)

  return (
    <>
      <header className={`${styles.header} ${hidden && !menuOpen ? styles.headerHidden : ''}`}>
        <div className={`container ${styles.navWrap}`}>
          <Link className={styles.brand} to="/" onClick={close} aria-label="Adithya Ramakrishnan – Home">
            <img
              className={`${styles.brandLogo}${theme === 'dark' ? ` ${styles.brandLogoDark}` : ''}`}
              src="/assets/Light Mode.png"
              alt="AR"
            />
          </Link>

          <nav className={styles.nav} aria-label="Primary Navigation">
            {isHome ? (
              HOME_LINKS.map((l) => (
                <a key={l.href} href={l.href}>{l.label}</a>
              ))
            ) : (
              <>
                <Link to="/">Home</Link>
                <Link to="/#case-studies">Case Studies</Link>
                <Link to="/#contact">Contact</Link>
              </>
            )}
          </nav>

          <div className={styles.controls}>
            <ThemeToggle />
            <button
              className={styles.hamburger}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span className={`${styles.bar} ${menuOpen ? styles.barOpen1 : ''}`} />
              <span className={`${styles.bar} ${menuOpen ? styles.barOpen2 : ''}`} />
              <span className={`${styles.bar} ${menuOpen ? styles.barOpen3 : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Drawer rendered OUTSIDE header to avoid backdrop-filter containing block issues */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className={styles.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={close}
            />

            <motion.nav
              className={styles.drawer}
              aria-label="Mobile Navigation"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {isHome ? (
                HOME_LINKS.map((l) => (
                  <a key={l.href} href={l.href} onClick={close}>{l.label}</a>
                ))
              ) : (
                <>
                  <Link to="/" onClick={close}>Home</Link>
                  <Link to="/#case-studies" onClick={close}>Case Studies</Link>
                  <Link to="/#contact" onClick={close}>Contact</Link>
                </>
              )}
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
