/*
  SECTION HEADING COMPONENT
  =========================
  A reusable heading with a scroll-triggered clip-path reveal.
  The heading text sweeps in from the bottom as it enters the viewport,
  while the accent underline draws itself in.
*/

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import styles from './SectionHeading.module.css'

interface SectionHeadingProps {
  title: string
  subtitle?: string
}

const smooth = [0.16, 1, 0.3, 1] as const

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div className={styles.heading} ref={ref}>
      <div className={styles.titleWrap}>
        <motion.h2
          initial={{ y: '100%' }}
          animate={isInView ? { y: 0 } : { y: '100%' }}
          transition={{ duration: 0.6, ease: smooth }}
        >
          {title}
        </motion.h2>
      </div>
      <motion.span
        className={styles.accent}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: smooth }}
      />
      {subtitle && (
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.5, delay: 0.35, ease: smooth }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
