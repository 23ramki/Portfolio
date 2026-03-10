/*
  ANIMATED SECTION — Step 8: Scroll Reveal
  ==========================================
  A wrapper component that animates its children into view
  when they scroll into the viewport.

  KEY CONCEPT — whileInView:
  Framer Motion watches the element's position relative to the viewport.
  When it enters (with a -80px margin so it triggers slightly early),
  it transitions from "hidden" to "visible".

  `viewport={{ once: true }}` means the animation only plays once —
  re-scrolling up won't reset it. This is usually the right UX choice.

  `variants` lets you define named animation states and share them
  between parent and child components for staggered effects.
*/

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
}

const variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
}

export default function AnimatedSection({
  children,
  className,
  delay = 0,
}: AnimatedSectionProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.55,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay,
      }}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}
