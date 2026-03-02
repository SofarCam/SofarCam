import { motion } from 'framer-motion'

const TOOLS = [
  {
    id: 'concept-gen',
    name: 'Concept Generator',
    description: '3 viral content concepts in 30 seconds — tailored to your niche, platform, and style.',
    status: 'live',
    icon: '💡',
    href: '#sofarcontent',
  },
  {
    id: 'hook-writer',
    name: 'Hook Writer',
    description: '10 ranked scroll-stopping hooks with scores, medals, and "why it works" breakdowns.',
    status: 'live',
    icon: '🎣',
    href: '#sofarcontent',
  },
  {
    id: 'caption-writer',
    name: 'Caption Writer',
    description: '5 platform-optimized captions from your concept — formatting, hashtags, and CTA included.',
    status: 'live',
    icon: '✍️',
    href: '#sofarcontent',
  },
  {
    id: 'bio-generator',
    name: 'Bio Generator',
    description: 'A profile bio that converts visitors into followers — platform-optimized, zero fluff.',
    status: 'soon',
    icon: '👤',
    href: null,
  },
  {
    id: 'content-calendar',
    name: 'Content Calendar',
    description: 'A 30-day posting plan built around your niche and posting frequency. Never run dry.',
    status: 'soon',
    icon: '📅',
    href: null,
  },
]

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function ToolsPreview() {
  return (
    <section id="tools" className="relative py-28 px-6 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(201,168,76,0.03) 0%, transparent 70%)',
        }}
      />

      {/* Top rule */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent mb-20" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p
            className="text-xs tracking-[0.25em] uppercase mb-4"
            style={{ color: 'rgba(201,168,76,0.7)' }}
          >
            The Toolkit
          </p>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-4">
            Every tool a creator needs.
            <br />
            <span style={{ color: 'rgba(201,168,76,0.85)' }}>All in one place.</span>
          </h2>
          <p className="text-white/40 text-sm max-w-md mx-auto leading-relaxed">
            Built for photographers, videographers, and content creators who are serious about growth.
            Free while in beta.
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
          className="text-center text-white/25 text-xs mt-10 tracking-wide"
        >
          More tools dropping soon — follow{' '}
          <a
            href="https://instagram.com/shotbyseven777"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-gold/60 transition-colors duration-200"
          >
            @shotbyseven777
          </a>{' '}
          for updates.
        </motion.p>
      </div>

      {/* Bottom rule */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent mt-20" />
    </section>
  )
}

function ToolCard({ tool }) {
  const isLive = tool.status === 'live'

  const inner = (
    <motion.div
      variants={cardVariants}
      whileHover={isLive ? { y: -3, transition: { duration: 0.2 } } : {}}
      className="relative rounded-xl p-5 flex flex-col gap-3 h-full"
      style={{
        background: isLive
          ? 'rgba(255,255,255,0.03)'
          : 'rgba(255,255,255,0.015)',
        border: isLive
          ? '1px solid rgba(201,168,76,0.18)'
          : '1px solid rgba(255,255,255,0.06)',
        cursor: isLive ? 'pointer' : 'default',
      }}
    >
      {/* Status badge */}
      <div className="flex items-start justify-between">
        <span className="text-2xl">{tool.icon}</span>
        <span
          className="text-[10px] font-medium tracking-widest uppercase px-2 py-0.5 rounded-full"
          style={
            isLive
              ? {
                  background: 'rgba(201,168,76,0.12)',
                  color: 'rgba(201,168,76,0.9)',
                  border: '1px solid rgba(201,168,76,0.2)',
                }
              : {
                  background: 'rgba(255,165,0,0.08)',
                  color: 'rgba(255,165,0,0.55)',
                  border: '1px solid rgba(255,165,0,0.12)',
                }
          }
        >
          {isLive ? 'Live' : 'Coming Soon'}
        </span>
      </div>

      {/* Name */}
      <h3
        className="text-sm font-medium tracking-wide"
        style={{ color: isLive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)' }}
      >
        {tool.name}
      </h3>

      {/* Description */}
      <p
        className="text-xs leading-relaxed flex-1"
        style={{ color: isLive ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.22)' }}
      >
        {tool.description}
      </p>

      {/* CTA for live tools */}
      {isLive && (
        <p
          className="text-[10px] tracking-widest uppercase mt-1"
          style={{ color: 'rgba(201,168,76,0.5)' }}
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
