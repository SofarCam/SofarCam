import { useRef } from 'react'
import { motion } from 'framer-motion'
import { HiLightBulb, HiMegaphone, HiPencilSquare, HiUserCircle, HiCalendarDays } from 'react-icons/hi2'

const TOOLS = [
  {
    id: 'concept-gen',
    name: 'Concept Generator',
    description: '3 viral content concepts in 30 seconds — tailored to your niche, platform, and style.',
    status: 'live',
    icon: HiLightBulb,
    color: '#E8C47A',
    colorRgb: '212,160,74',
    href: '#sofarcontent',
  },
  {
    id: 'hook-writer',
    name: 'Hook Writer',
    description: '10 ranked scroll-stopping hooks with scores, medals, and "why it works" breakdowns.',
    status: 'live',
    icon: HiMegaphone,
    color: '#E8C47A',
    colorRgb: '212,160,74',
    href: '#sofarcontent',
  },
  {
    id: 'caption-writer',
    name: 'Caption Writer',
    description: '5 platform-optimized captions from your concept — formatting, hashtags, and CTA included.',
    status: 'live',
    icon: HiPencilSquare,
    color: '#E8C47A',
    colorRgb: '212,160,74',
    href: '#sofarcontent',
  },
  {
    id: 'bio-generator',
    name: 'Bio Generator',
    description: 'A profile bio that converts visitors into followers — platform-optimized, zero fluff.',
    status: 'soon',
    icon: HiUserCircle,
    color: '#E8C47A',
    colorRgb: '212,160,74',
    href: null,
  },
  {
    id: 'content-calendar',
    name: 'Content Calendar',
    description: 'A 30-day posting plan built around your niche and posting frequency. Never run dry.',
    status: 'soon',
    icon: HiCalendarDays,
    color: '#6b6b6b',
    colorRgb: '120,120,120',
    href: null,
  },
]

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function ToolsPreview() {
  return (
    <section id="tools" className="relative py-24 px-6 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(184,134,46,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div
            className="inline-flex items-center gap-2 mb-5 px-3 py-1 rounded-full"
            style={{ background: 'rgba(184,134,46,0.08)', border: '1px solid rgba(232,196,122,0.2)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#E8C47A' }} />
            <span className="text-[10px] tracking-[0.25em] uppercase" style={{ color: '#E8C47A', fontFamily: 'var(--font-heading)' }}>
              The Toolkit
            </span>
          </div>
          <h2
            className="mb-4 heading-glow"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: '#FDF8F0',
            }}
          >
            Every tool a creator needs.
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #E8C47A 0%, #E8C47A 50%, #E8C47A 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 24px rgba(184,134,46,0.5))',
            }}>
              All free. All in one place.
            </span>
          </h2>
          <p style={{ color: 'rgba(253,248,240,0.4)', fontSize: '0.9rem', fontFamily: 'var(--font-body)', maxWidth: '400px', margin: '0 auto', lineHeight: 1.6 }}>
            Built for photographers, videographers, and content creators who are serious about growth.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {TOOLS.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-xs mt-10"
          style={{ color: 'rgba(253,248,240,0.2)', fontFamily: 'var(--font-body)' }}
        >
          More tools dropping soon — follow{' '}
          <a href="https://instagram.com/shotbyseven777" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(232,196,122,0.5)' }}>
            @shotbyseven777
          </a>{' '}
          for updates.
        </motion.p>
      </div>
    </section>
  )
}

function ToolCard({ tool }) {
  const isLive = tool.status === 'live'
  const ref = useRef(null)

  function handleMouseMove(e) {
    const el = ref.current
    if (!el || !isLive) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const rotX = ((y - rect.height / 2) / (rect.height / 2)) * -10
    const rotY = ((x - rect.width / 2) / (rect.width / 2)) * 10
    el.style.transform = `perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.03,1.03,1.03)`
    el.style.boxShadow = `0 20px 60px rgba(${tool.colorRgb},0.2), 0 0 0 1px ${tool.color}25`
  }

  function handleMouseLeave() {
    if (!ref.current) return
    ref.current.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
    ref.current.style.boxShadow = 'none'
  }

  const inner = (
    <motion.div
      ref={ref}
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative rounded-2xl p-5 flex flex-col gap-3 h-full tilt-card overflow-hidden"
      style={{
        background: isLive ? `rgba(${tool.colorRgb},0.06)` : 'rgba(253,248,240,0.02)',
        border: isLive ? `1px solid ${tool.color}25` : '1px solid rgba(253,248,240,0.06)',
        cursor: isLive ? 'pointer' : 'default',
      }}
    >
      {isLive && <div className="shimmer absolute inset-0 rounded-2xl pointer-events-none opacity-30" />}

      <div className="flex items-start justify-between relative z-10">
        <span style={{ filter: isLive ? `drop-shadow(0 0 12px ${tool.color}80)` : 'none' }}>
          <tool.icon size={22} color={isLive ? tool.color : 'rgba(253,248,240,0.3)'} />
        </span>
        <span
          className="text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full"
          style={isLive
            ? { background: `rgba(${tool.colorRgb},0.15)`, color: tool.color, border: `1px solid ${tool.color}30`, textShadow: `0 0 8px ${tool.color}60` }
            : { background: 'rgba(253,248,240,0.04)', color: 'rgba(253,248,240,0.3)', border: '1px solid rgba(253,248,240,0.08)' }
          }
        >
          {isLive ? 'Live' : 'Coming Soon'}
        </span>
      </div>

      <h3
        className="text-sm font-semibold relative z-10"
        style={{ fontFamily: 'var(--font-heading)', color: isLive ? tool.color : 'rgba(253,248,240,0.35)', textShadow: isLive ? `0 0 16px ${tool.color}50` : 'none' }}
      >
        {tool.name}
      </h3>

      <p className="text-xs leading-relaxed flex-1 relative z-10" style={{ fontFamily: 'var(--font-body)', color: isLive ? 'rgba(253,248,240,0.5)' : 'rgba(253,248,240,0.22)' }}>
        {tool.description}
      </p>

      {isLive && (
        <p className="text-[10px] tracking-widest uppercase mt-1 font-semibold relative z-10" style={{ color: tool.color, fontFamily: 'var(--font-heading)', textShadow: `0 0 10px ${tool.color}60` }}>
          Try it free →
        </p>
      )}
    </motion.div>
  )

  if (isLive && tool.href) {
    return <a href={tool.href} className="block h-full no-underline">{inner}</a>
  }
  return inner
}
