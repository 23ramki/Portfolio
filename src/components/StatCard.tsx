import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import type { Stat } from '../types/portfolio'
import TiltCard from './TiltCard'
import styles from './StatCard.module.css'

function useCountUp(target: string, duration = 1.5) {
  const [display, setDisplay] = useState(target)
  const ref = useRef<HTMLElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          // Extract numeric part
          const match = target.match(/^([\d.]+)(.*)$/)
          if (!match) { setDisplay(target); return }
          const end = parseFloat(match[1])
          const suffix = match[2]
          const start = 0
          const startTime = performance.now()

          const animate = (now: number) => {
            const elapsed = (now - startTime) / 1000
            const progress = Math.min(elapsed / duration, 1)
            // Ease out expo
            const eased = 1 - Math.pow(2, -10 * progress)
            const current = start + (end - start) * eased
            setDisplay(
              (Number.isInteger(end) ? Math.round(current) : current.toFixed(1)) + suffix
            )
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return { ref, display }
}

interface StatCardProps {
  stat: Stat
}

export default function StatCard({ stat }: StatCardProps) {
  const { ref, display } = useCountUp(stat.value)

  return (
    <TiltCard tilt={10} hoverScale={1.05}>
      <motion.article
        className={styles.card}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <h2 className={styles.value} ref={ref as React.Ref<HTMLHeadingElement>}>{display}</h2>
        <p className={styles.label}>{stat.label}</p>
      </motion.article>
    </TiltCard>
  )
}
