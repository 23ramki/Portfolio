import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

const smooth = [0.16, 1, 0.3, 1]

export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: smooth }}
    >
      {children}
    </motion.div>
  )
}
