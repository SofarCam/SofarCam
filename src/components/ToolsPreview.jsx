import { motion } from 'framer-motion'

const TOOLS = [
  {
    id: 'concept-gen',
    name: 'Concept Generator',
    description: '3 viral content concepts in 30 seconds — tailored to your niche, platform, and style.',
    status: 'live',
    icon: '💡',
    color: '#a78bfa',
    colorRgb: '124,58,237',
    href: '#sofarcontent',
  },
  {
    id: 'hook-writer',
    name: 'Hook Writer',
    description: '10 ranked scroll-stopping hooks with scores, medals, and "why it works" breakdowns.',
    status: 'live',
    icon: '🎣',
    color: '#67e8f9',
    colorRgb: '6,182,212',
    href: '#sofarcontent',
  },
  {
    id: 'caption-writer',
    name: 'Caption Writer',
    description: '5 platform-optimized captions from your concept — formatting, hashtags, and CTA included.',
    status: 'live',
    icon: '✍️',
    color: '#f9a8d4',
    colorRgb: '236,72,153',
    href: '#sofarcontent',
  },
  {
    id: 'bio-generator',
    name: 'Bio Generator',
    description: 'A profile bio that converts visitors into followers — platform-optimized, zero fluff.',
    status: 'soon',
    icon: '👤',
    color: '#fdba74',
    colorRgb: '249,115,22',
    href: null,
  },
  {
    id: 'content-calendar',
    name: 'Content Calendar',
    description: 'A 30-day posting plan built around your niche and posting frequency. Never run dry.',
    status: 'soon',
    icon: '📅',
    color: '#86efac',
    colorRgb: '34,197,94',
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
    <section id="tools" className="relative py-28 px-6 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(6,182,212,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 mb-5 px-3 py-1 rounded-full" style={{ background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(103,232,249,0.2)' }}>
            <span className="text-[10px] tracking-[0.25em] uppercase" style={{ color: '#67e8f9', fontFamily: 'var(--font-heading)' }}>
              The Toolkit
            </span>
          </div>
          <h2
            className="mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: '#f4f4f5',
            }}
          >
            Every tool a creator needs.
            <br />
            <span className="gradient-text">All free. All in one place.</span>
          </h2>
          <p style={{ color: 'rgba(244,244,245,0.4)', fontSize: '0.9rem', fontFamily: 'var(--font-body)', maxWidth: '400px', margin: '0 auto', lineHeight: 1.6 }}>
            Built for photographers, videographers, and content creators who are serious about growth.
          </p>
        </motion.div>

        {/* Cards grid */}
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

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-xs mt-10"
          style={{ color: 'rgba(244,244,245,0.2)', fontFamily: 'var(--font-body)' }}
        >
          More tools dropping soon — follow{' '}
          <a
            href="https://instagram.com/shotbyseven777"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'rgba(167,139,250,0.5)' }}
          >
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

  const inner = (
    <motion.div
      variants={cardVariants}
      whileHover={isLive ? { y: -4, transition: { duration: 0.2 } } : {}}
      className="relative rounded-2xl p-5 flex flex-col gap-3 h-full transition-all duration-300"
      style={{
        background: isLive
          ? `rgba(${tool.colorRgb},0.06)`
          : 'rgba(244,244,245,0.02)',
        border: isLive
          ? `1px solid ${tool.color}25`
          : '1px solid rgba(244,244,245,0.06)',
        cursor: isLive ? 'pointer' : 'default',
      }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between">
        <span className="text-2xl">{tool.icon}</span>
        <span
          className="text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full"
          style={
            isLive
              ? {
                  background: `rgba(${tool.colorRgb},0.15)`,
                  color: tool.color,
                  border: `1px solid ${tool.color}30`,
                }
              : {
                  background: 'rgba(244,244,245,0.04)',
                  color: 'rgba(244,244,245,0.3)',
                  border: '1px solid rgba(244,244,245,0.08)',
                }
          }
        >
          {isLive ? 'Live' : 'Coming Soon'}
        </span>
      </div>

      {/* Name */}
      <h3
        className="text-sm font-semibold"
        style={{
          fontFamily: 'var(--font-heading)',
          color: isLive ? tool.color : 'rgba(244,244,245,0.35)',
        }}
      >
        {tool.name}
      </h3>

      {/* Description */}
      <p
        className="text-xs leading-relaxed flex-1"
        style={{
          fontFamily: 'var(--font-body)',
          color: isLive ? 'rgba(244,244,245,0.5)' : 'rgba(244,244,245,0.22)',
        }}
      >
        {tool.description}
      </p>

      {/* CTA */}
      {isLive && (
        <p
          className="text-[10px] tracking-widest uppercase mt-1 font-semibold"
          style={{ color: tool.color, fontFamily: 'var(--font-heading)' }}
        >
          Try it free →
        </p>
      )}
    </motion.div>
  )

  if (isLive && tool.href) {
    return (
      <a href={tool.href} className="block h-full no-underline">
        {inner}
      </a>
    )
  }

  return inner
}
