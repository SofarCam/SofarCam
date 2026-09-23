import { useLayoutEffect, useRef, useState } from 'react'

// Deterministic wobble so the same mark renders identically every time.
function rand(seed) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return s / 2147483647
  }
}

function buildLoop(w, h, seed) {
  const r = rand(seed)
  const cx = w / 2
  const cy = h / 2
  const rx = w * 0.6
  const ry = h * 0.58
  const start = -Math.PI * 0.62
  const sweep = Math.PI * 2 * 1.1 // overshoot the start like a real pencil loop
  const steps = 96
  const phase = r() * Math.PI * 2
  const points = []
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const a = start + sweep * t
    const drift = 1 + 0.06 * t // the loop opens slightly as it closes
    const wobble = 1 + 0.025 * Math.sin(a * 3 + phase)
    points.push([
      cx + Math.cos(a) * rx * drift * wobble,
      cy + Math.sin(a) * ry * drift * wobble,
    ])
  }
  return 'M' + points.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L')
}

// Draws a gold grease-pencil loop around its parent (parent must be position: relative).
export default function GreaseMark({ seed = 7, animate = true }) {
  const ref = useRef(null)
  const [size, setSize] = useState(null)

  useLayoutEffect(() => {
    const parent = ref.current?.parentElement
    if (!parent) return
    const measure = () => setSize({ w: parent.offsetWidth, h: parent.offsetHeight })
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(parent)
    return () => ro.disconnect()
  }, [])

  return (
    <svg
      ref={ref}
      aria-hidden="true"
      className={animate ? 'grease-mark is-drawing' : 'grease-mark'}
      width={size?.w ?? 0}
      height={size?.h ?? 0}
      viewBox={size ? `0 0 ${size.w} ${size.h}` : undefined}
    >
      {size && <path d={buildLoop(size.w, size.h, seed)} pathLength="1" />}
    </svg>
  )
}
