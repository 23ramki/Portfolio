/*
  MAGNETIC CURSOR HOOK
  ====================
  Makes an element subtly pull toward the cursor when it's nearby.
  The element translates a few pixels in the direction of the cursor,
  creating a playful "magnetic" feel on CTA buttons.
*/

import { useRef, useCallback } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'

interface MagneticOptions {
  /** Max distance (in px) at which the magnet activates. Default: 80 */
  radius?: number
  /** Max displacement (in px) the element moves. Default: 6 */
  strength?: number
}

export default function useMagneticCursor({ radius = 80, strength = 6 }: MagneticOptions = {}) {
  const ref = useRef<HTMLElement | null>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { stiffness: 200, damping: 18, mass: 0.4 }
  const smoothX = useSpring(x, springConfig)
  const smoothY = useSpring(y, springConfig)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < radius) {
        // Scale displacement by proximity (closer = stronger)
        const pull = 1 - dist / radius
        x.set(dx * pull * (strength / radius) * 2)
        y.set(dy * pull * (strength / radius) * 2)
      } else {
        x.set(0)
        y.set(0)
      }
    },
    [radius, strength, x, y]
  )

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return {
    ref,
    style: { x: smoothX, y: smoothY },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  }
}
