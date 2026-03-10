/*
  STAT CARD — with Framer Motion hover animation
  ================================================
  KEY CONCEPT — motion.article:
  Any HTML element can become a "motion element" by prefixing it with `motion.`.
  motion.article is just an <article> that Framer Motion can animate.

  whileHover: runs the animation while the cursor is over the element.
  whileTap:   runs while the element is being clicked/pressed.
  transition: controls the spring physics of the animation.
*/

import { motion } from 'framer-motion'
import type { Stat } from '../types/portfolio'
import styles from './StatCard.module.css'

interface StatCardProps {
  stat: Stat
}

export default function StatCard({ stat }: StatCardProps) {
  return (
    <motion.article
      className={styles.card}
      whileHover={{ y: -5, boxShadow: '0 12px 32px rgba(0,0,0,0.18)' }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <h2 className={styles.value}>{stat.value}</h2>
      <p className={styles.label}>{stat.label}</p>
    </motion.article>
  )
}
