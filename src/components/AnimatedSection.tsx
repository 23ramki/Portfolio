import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { ReactNode } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  distance?: number
  scale?: number
  duration?: number
  /** If true, only fade in once (no fade-out on scroll past) */
  once?: boolean
  /** Use clip-path reveal instead of opacity fade */
  clipReveal?: boolean
}

export default function AnimatedSection({
  children,
  className,
  delay: _delay = 0,
  direction = 'up',
  distance = 50,
  scale: scaleProp,
  once = false,
  clipReveal = false,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Opacity: fade in during first 25%, hold, fade out during last 25%
  const opacity = useTransform(
    scrollYProgress,
    once ? [0, 0.25, 1] : [0, 0.25, 0.75, 1],
    once ? [0, 1, 1] : [0, 1, 1, 0],
  )

  // Clip-path reveal — always call hook (rules of hooks), conditionally use value
  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.3],
    ['inset(100% 50% 0% 50%)', 'inset(0% 0% 0% 0%)'],
  )

  // Compute direction-based offsets
  const isHorizontal = direction === 'left' || direction === 'right'
  const sign = direction === 'up' || direction === 'left' ? 1 : -1
  const start = direction !== 'none' ? distance * sign : 0

  // Y translate (used when direction is up/down)
  const y = useTransform(
    scrollYProgress,
    once ? [0, 0.3, 1] : [0, 0.3, 0.7, 1],
    once ? [start, 0, 0] : [start, 0, 0, -start * 0.5],
  )

  // X translate (used when direction is left/right)
  const x = useTransform(
    scrollYProgress,
    once ? [0, 0.3, 1] : [0, 0.3, 0.7, 1],
    once ? [start, 0, 0] : [start, 0, 0, -start * 0.3],
  )

  // Scale
  const scaleStart = scaleProp ?? 1
  const scale = useTransform(
    scrollYProgress,
    once ? [0, 0.3, 1] : [0, 0.3, 0.75, 1],
    once ? [scaleStart, 1, 1] : [scaleStart, 1, 1, scaleStart],
  )

  // Build style object based on which transforms are active
  const style: Record<string, unknown> = {}

  if (clipReveal) {
    style.clipPath = clipPath
    style.opacity = 1
  } else {
    style.opacity = opacity
  }

  if (direction !== 'none') {
    if (isHorizontal) {
      style.x = x
    } else {
      style.y = y
    }
  }

  if (scaleProp !== undefined) {
    style.scale = scale
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      data-animated
    >
      {children}
    </motion.div>
  )
}
