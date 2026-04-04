/*
  MAGNETIC BUTTON WRAPPER
  =======================
  Wraps any <a> or <button> CTA element with a magnetic cursor effect.
  The child element subtly pulls toward the cursor when hovered nearby.
*/

import { motion } from 'framer-motion'
import useMagneticCursor from '../hooks/useMagneticCursor'
import type { ReactNode } from 'react'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  href?: string
  target?: string
  rel?: string
  onClick?: () => void
}

export default function MagneticButton({ children, className, href, target, rel, onClick }: MagneticButtonProps) {
  const { ref, style, onMouseMove, onMouseLeave } = useMagneticCursor({ radius: 100, strength: 8 })

  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={className}
        href={href}
        target={target}
        rel={rel}
        style={style}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={className}
      onClick={onClick}
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.button>
  )
}
