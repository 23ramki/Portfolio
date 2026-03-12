import { useRef, useCallback, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion'

interface TiltCardProps {
  children: ReactNode
  className?: string
  /** Max tilt angle in degrees (default 12) */
  tilt?: number
  /** Scale on hover (default 1.04) */
  hoverScale?: number
  style?: React.CSSProperties
}

const springConfig = { stiffness: 200, damping: 22, mass: 0.4 }

export default function TiltCard({
  children,
  className,
  tilt = 12,
  hoverScale = 1.04,
  style,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const scale = useMotionValue(1)
  const shadowX = useMotionValue(0)
  const shadowY = useMotionValue(4)
  const shadowBlur = useMotionValue(12)
  const shadowOp = useMotionValue(0.1)

  const sRotateX = useSpring(rotateX, springConfig)
  const sRotateY = useSpring(rotateY, springConfig)
  const sScale = useSpring(scale, springConfig)
  const sShadowX = useSpring(shadowX, springConfig)
  const sShadowY = useSpring(shadowY, springConfig)
  const sShadowBlur = useSpring(shadowBlur, springConfig)
  const sShadowOp = useSpring(shadowOp, springConfig)

  const boxShadow = useMotionTemplate`${sShadowX}px ${sShadowY}px ${sShadowBlur}px rgba(0,0,0,${sShadowOp})`

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2  // -1 to 1
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2  // -1 to 1
      rotateX.set(-ny * tilt)
      rotateY.set(nx * tilt)
      scale.set(hoverScale)
      shadowX.set(-nx * 10)
      shadowY.set(-ny * 10 + 8)
      shadowBlur.set(28)
      shadowOp.set(0.22)
    },
    [rotateX, rotateY, scale, shadowX, shadowY, shadowBlur, shadowOp, tilt, hoverScale],
  )

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0)
    rotateY.set(0)
    scale.set(1)
    shadowX.set(0)
    shadowY.set(4)
    shadowBlur.set(12)
    shadowOp.set(0.1)
  }, [rotateX, rotateY, scale, shadowX, shadowY, shadowBlur, shadowOp])

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 600,
        transformStyle: 'preserve-3d',
        borderRadius: 'var(--radius)',
        rotateX: sRotateX,
        rotateY: sRotateY,
        scale: sScale,
        boxShadow,
        ...style,
      }}
    >
      {children}
    </motion.div>
  )
}
