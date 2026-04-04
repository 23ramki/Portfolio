/*
  BACK TO TOP BUTTON
  ==================
  A floating circular button with a scroll-progress ring.
  The ring fills as the user scrolls down the page, and clicking
  smoothly scrolls back to the top. The chevron arrow lifts on hover.
*/

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion'
import styles from './BackToTop.module.css'

const RING_RADIUS = 19
const CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS

export default function BackToTop() {
  const [visible, setVisible] = useState(false)
  const scrollProgress = useMotionValue(0)
  const smoothProgress = useSpring(scrollProgress, { stiffness: 80, damping: 20 })
  const dashOffset = useTransform(smoothProgress, [0, 1], [CIRCUMFERENCE, 0])

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const scrollY = window.scrollY
        setVisible(scrollY > 400)

        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        scrollProgress.set(docHeight > 0 ? scrollY / docHeight : 0)

        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [scrollProgress])

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          className={styles.btn}
          onClick={scrollTop}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          whileHover="hover"
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Progress ring */}
          <svg className={styles.ring} viewBox="0 0 44 44">
            {/* Background track */}
            <circle
              cx="22"
              cy="22"
              r={RING_RADIUS}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              opacity="0.12"
            />
            {/* Progress arc */}
            <motion.circle
              cx="22"
              cy="22"
              r={RING_RADIUS}
              fill="none"
              stroke="var(--primary)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              style={{
                strokeDashoffset: dashOffset,
                rotate: -90,
                transformOrigin: 'center',
              }}
            />
          </svg>

          {/* Chevron arrow */}
          <motion.svg
            className={styles.arrow}
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={{
              hover: { y: -2, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            <path d="M8 12 L8 4" />
            <path d="M4 7 L8 3 L12 7" />
          </motion.svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
