import { useEffect, useRef } from 'react'

/**
 * Animated wire blob background — organic, flowing contour lines
 * that slowly morph and drift, inspired by landonorris.com.
 * Renders on a fixed full-screen canvas behind all content.
 */

interface BlobConfig {
  cx: number
  cy: number
  radiusX: number
  radiusY: number
  points: number
  speed: number
  drift: { x: number; y: number }
  phaseOffset: number
  noiseAmp: number
}

function createBlobs(): BlobConfig[] {
  return [
    {
      cx: 0.3, cy: 0.25, radiusX: 280, radiusY: 220,
      points: 8, speed: 0.0004, drift: { x: 0.00003, y: 0.00002 },
      phaseOffset: 0, noiseAmp: 60,
    },
    {
      cx: 0.7, cy: 0.15, radiusX: 350, radiusY: 300,
      points: 10, speed: 0.0003, drift: { x: -0.00002, y: 0.00003 },
      phaseOffset: 2, noiseAmp: 80,
    },
    {
      cx: 0.5, cy: 0.55, radiusX: 400, radiusY: 320,
      points: 9, speed: 0.00035, drift: { x: 0.00002, y: -0.00002 },
      phaseOffset: 4, noiseAmp: 70,
    },
    {
      cx: 0.2, cy: 0.75, radiusX: 300, radiusY: 260,
      points: 7, speed: 0.00045, drift: { x: 0.00004, y: 0.00001 },
      phaseOffset: 1, noiseAmp: 55,
    },
    {
      cx: 0.8, cy: 0.65, radiusX: 320, radiusY: 280,
      points: 8, speed: 0.00025, drift: { x: -0.00003, y: -0.00002 },
      phaseOffset: 3, noiseAmp: 65,
    },
  ]
}

function getBlobPath(
  blob: BlobConfig,
  time: number,
  w: number,
  h: number,
): string {
  const { points, radiusX, radiusY, speed, phaseOffset, noiseAmp, drift } = blob
  const cx = (blob.cx + Math.sin(time * drift.x * 1000) * 0.05) * w
  const cy = (blob.cy + Math.cos(time * drift.y * 1000) * 0.05) * h

  const coords: [number, number][] = []
  for (let i = 0; i < points; i++) {
    const angle = (i / points) * Math.PI * 2
    const noise =
      Math.sin(time * speed * 1000 + i * 1.7 + phaseOffset) * noiseAmp +
      Math.sin(time * speed * 600 + i * 2.3 + phaseOffset * 0.5) * noiseAmp * 0.5
    const rx = radiusX + noise
    const ry = radiusY + noise * 0.8
    coords.push([
      cx + Math.cos(angle) * rx,
      cy + Math.sin(angle) * ry,
    ])
  }

  // Smooth closed curve through points using cubic bezier
  let d = ''
  for (let i = 0; i < coords.length; i++) {
    const curr = coords[i]
    const next = coords[(i + 1) % coords.length]
    const prev = coords[(i - 1 + coords.length) % coords.length]
    const next2 = coords[(i + 2) % coords.length]

    const cp1x = curr[0] + (next[0] - prev[0]) / 6
    const cp1y = curr[1] + (next[1] - prev[1]) / 6
    const cp2x = next[0] - (next2[0] - curr[0]) / 6
    const cp2y = next[1] - (next2[1] - curr[1]) / 6

    if (i === 0) {
      d += `M ${curr[0]},${curr[1]} `
    }
    d += `C ${cp1x},${cp1y} ${cp2x},${cp2y} ${next[0]},${next[1]} `
  }
  d += 'Z'
  return d
}

export default function WireBlobs() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const blobsRef = useRef<BlobConfig[]>(createBlobs())
  const frameRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let running = true
    let isVisible = true

    // Pause animation when tab is not visible
    const handleVisibility = () => {
      isVisible = !document.hidden
      if (isVisible && running) {
        frameRef.current = requestAnimationFrame(draw)
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const isDark = () =>
      document.documentElement.getAttribute('data-theme') === 'dark'

    const draw = (time: number) => {
      if (!running || !isVisible) return
      const w = window.innerWidth
      const h = window.innerHeight

      ctx.clearRect(0, 0, w, h)

      const dark = isDark()
      const strokeColor = dark
        ? 'rgba(255, 255, 255, 0.15)'
        : 'rgba(120, 110, 80, 0.1)'

      ctx.strokeStyle = strokeColor
      ctx.lineWidth = dark ? 1.8 : 1.2
      ctx.lineJoin = 'round'

      const blobs = blobsRef.current
      for (const blob of blobs) {
        const pathStr = getBlobPath(blob, time * 0.001, w, h)
        const path = new Path2D(pathStr)
        ctx.stroke(path)

        // Draw a second slightly offset contour for depth
        ctx.save()
        ctx.translate(15, 10)
        ctx.globalAlpha = 0.5
        ctx.stroke(path)
        ctx.restore()
        ctx.globalAlpha = 1
      }

      frameRef.current = requestAnimationFrame(draw)
    }

    frameRef.current = requestAnimationFrame(draw)

    return () => {
      running = false
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
