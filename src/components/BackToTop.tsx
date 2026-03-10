/*
  BACK TO TOP BUTTON
  ==================
  A floating button that appears after the user scrolls down 400px
  and smoothly scrolls back to the top on click.

  KEY CONCEPTS:
  - useEffect + scroll listener: watches window.scrollY to toggle visibility
  - AnimatePresence: lets Framer Motion animate the button OUT when it disappears
    (without AnimatePresence, exit animations are ignored)
  - { passive: true }: a performance hint telling the browser this scroll
    listener won't call preventDefault(), allowing smoother scrolling
*/

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './BackToTop.module.css'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          className={styles.btn}
          onClick={scrollTop}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.92 }}
          transition={{ duration: 0.2 }}
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  )
}
