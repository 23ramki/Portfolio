import { motion } from 'framer-motion'
import type { Stat } from '../types/portfolio'
import TiltCard from './TiltCard'
import styles from './StatCard.module.css'

interface StatCardProps {
  stat: Stat
}

export default function StatCard({ stat }: StatCardProps) {
  return (
    <TiltCard tilt={10} hoverScale={1.05}>
      <motion.article
        className={styles.card}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <h2 className={styles.value}>{stat.value}</h2>
        <p className={styles.label}>{stat.label}</p>
      </motion.article>
    </TiltCard>
  )
}
