import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Suspense, lazy } from 'react'

const HeroScene = lazy(() => import('./HeroScene'))

const tools = [
  { label: 'Concept Generator', color: '#a78bfa', desc: '3 viral ideas in 30s' },
  { label: 'Hook Writer', color: '#67e8f9', desc: '10 scroll-stopping hooks' },
  { label: 'Caption Writer', color: '#f9a8d4', desc: '5 ready-to-post captions' },
]

export default function Hero() {
  const mouse = useRef([0, 0])

  function handleMouseMove(e) {
    const x = (e.clientX / window.innerWidth - 0.5) * 2
    const y = -(e.clientY / window.innerHeight - 0.5) * 2
    mouse.current = [x, y]
  }

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden grid-bg"
      style={{ paddingTop: 'clamp(80px, 15vh, 120px)' }}
      onMouseMove={handleMouseMove}
    >
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(124,58,237,0.1) 0%, rgba(6,182,212,0.04) 50%, transparent 70%)',
        }}
      />

      {/* 3D Scene — right side on desktop, behind content on mobile */}
      <div
        className="absolute pointer-events-none"
        style={{
          right: '-5%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 'clamp(320px, 45vw, 680px)',
          height: 'clamp(320px, 45vw, 680px)',
          opacity: 0.92,
        }}
      >
        <Suspense fallback={null}>
          <HeroScene mouse={mouse} />
        </Suspense>
      </div>

      {/* Subtle vignette over the 3D side so text stays readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, rgba(9,9,11,0.85) 0%, rgba(9,9,11,0.5) 45%, transparent 70%)',
        }}
      />

      <div className="text-center max-w-4xl mx-auto relative z-10">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full"
          style={{
            background: 'rgba(124,58,237,0.1)',
            border: '1px solid rgba(167,139,250,0.25)',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#a78bfa' }} />
          <span className="text-[11px] tracking-[0.2em] uppercase" style={{ color: '#a78bfa', fontFamily: 'var(--font-heading)' }}>
            Free Tools · Beta
          </span>
        </motion.div>

        {/* Headline with depth */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.8rem, 8vw, 5.5rem)',
            fontWeight: 800,
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
            color: '#f4f4f5',
            textShadow: '0 0 80px rgba(124,58,237,0.25), 0 2px 40px rgba(0,0,0,0.5)',
          }}
        >
          Stop Guessing.
          <br />
          <span
            className="gradient-text"
            style={{
              filter: 'drop-shadow(0 0 30px rgba(124,58,237,0.5))',
            }}
          >
            Start Going Viral.
          </span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mb-12 leading-relaxed max-w-2xl mx-auto"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            color: 'rgba(244,244,245,0.55)',
          }}
        >
          Free AI tools that tell you exactly what to post, how to hook your audience,
          and what will actually grow your account — in seconds.
        </motion.p>

        {/* Tool cards — 3D tilt on hover */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          {tools.map((tool, i) => (
            <TiltCard key={tool.label} tool={tool} delay={0.65 + i * 0.1} />
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          <a
            href="#sofarcontent"
            className="px-8 py-4 rounded-xl text-sm font-bold tracking-wide uppercase transition-all duration-300"
            style={{
              fontFamily: 'var(--font-heading)',
              background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
              color: '#fff',
              boxShadow: '0 0 40px rgba(124,58,237,0.5), 0 0 80px rgba(124,58,237,0.2)',
            }}
          >
            Try Free Tools →
          </a>
          <a
            href="#services"
            className="px-8 py-4 rounded-xl text-sm font-medium tracking-wide uppercase transition-all duration-300"
            style={{
              fontFamily: 'var(--font-heading)',
              background: 'rgba(244,244,245,0.04)',
              border: '1px solid rgba(244,244,245,0.1)',
              color: 'rgba(244,244,245,0.5)',
            }}
          >
            Work With Us
          </a>
        </motion.div>

        {/* Platform badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex items-center justify-center gap-2 flex-wrap mt-12"
        >
          <span className="text-[9px] tracking-[0.3em] uppercase mr-1" style={{ color: 'rgba(244,244,245,0.2)', fontFamily: 'var(--font-heading)' }}>
            Works on
          </span>
          {['Instagram', 'TikTok', 'YouTube', 'X', 'LinkedIn'].map((p) => (
            <span
              key={p}
              className="text-[10px] px-2.5 py-1 rounded-full"
              style={{
                fontFamily: 'var(--font-heading)',
                color: 'rgba(244,244,245,0.3)',
                border: '1px solid rgba(244,244,245,0.07)',
                background: 'rgba(244,244,245,0.02)',
              }}
            >
              {p}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          className="w-px h-8"
          style={{ background: 'linear-gradient(to bottom, rgba(124,58,237,0.5), transparent)' }}
        />
      </motion.div>
    </section>
  )
}

function TiltCard({ tool, delay }) {
  const cardRef = useRef(null)

  function handleMouseMove(e) {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const rotX = ((y - cy) / cy) * -12
    const rotY = ((x - cx) / cx) * 12
    card.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.04,1.04,1.04)`
  }

  function handleMouseLeave() {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
    }
  }

  const colorRgb = tool.color === '#a78bfa' ? '124,58,237' : tool.color === '#67e8f9' ? '6,182,212' : '236,72,153'

  return (
    <motion.a
      href="#sofarcontent"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className="flex flex-col gap-1 px-5 py-3.5 rounded-2xl text-left no-underline"
      style={{
        background: `rgba(${colorRgb},0.08)`,
        border: `1px solid ${tool.color}30`,
        minWidth: '160px',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        willChange: 'transform',
      }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <span
        className="text-sm font-semibold"
        style={{ color: tool.color, fontFamily: 'var(--font-heading)', textShadow: `0 0 20px ${tool.color}60` }}
      >
        {tool.label}
      </span>
      <span className="text-xs" style={{ color: 'rgba(244,244,245,0.4)', fontFamily: 'var(--font-body)' }}>
        {tool.desc}
      </span>
    </motion.a>
  )
}
