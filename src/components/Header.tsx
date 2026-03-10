/*
  HEADER — with hamburger menu for mobile
  =========================================
  KEY CONCEPTS:

  1. useState for UI state:
     `menuOpen` tracks whether the mobile drawer is visible.
     Clicking the hamburger toggles it; clicking a link closes it.

  2. useEffect for side effects:
     - Close menu when the route changes (user navigated)
     - Lock body scroll when the drawer is open (prevents background scrolling)
     The cleanup function (`return () => ...`) runs when the component unmounts
     or before the next effect runs — it resets overflow.

  3. AnimatePresence:
     Framer Motion's AnimatePresence detects when children are removed from the
     React tree and plays their `exit` animation before they're actually removed.
     Without it, elements just disappear instantly.

  4. Spring animation for drawer:
     The drawer uses type: 'spring' for a natural, bouncy slide-in feel.
     stiffness controls speed, damping controls bounciness.
*/

import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from './ThemeToggle'
import styles from './Header.module.css'

const HOME_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#case-studies', label: 'Cases' },
  { href: '#documents', label: 'Docs' },
  { href: '#education', label: 'Education' },
  { href: '#contact', label: 'Contact' },
]

export default function Header() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const [menuOpen, setMenuOpen] = useState(false)

  // Close the mobile menu whenever the route changes
  useEffect(() => setMenuOpen(false), [location])

  // Lock background scroll while the drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const close = () => setMenuOpen(false)

  return (
    <header className={styles.header}>
      <div className={`container ${styles.navWrap}`}>
        {/* Brand / Logo */}
        <Link className={styles.brand} to="/" onClick={close}>
          ADITHYA RAMAKRISHNAN
        </Link>

        {/* Desktop navigation — hidden on mobile via CSS */}
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

        {/* Right-side controls */}
        <div className={styles.controls}>
          <ThemeToggle />
          {/* Hamburger button — visible only on mobile */}
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

      {/* Mobile drawer + backdrop — animated in/out with AnimatePresence */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Semi-transparent backdrop */}
            <motion.div
              className={styles.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={close}
            />

            {/* Slide-in nav drawer */}
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
    </header>
  )
}
