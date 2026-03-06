import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaInstagram, FaYoutube, FaDiscord } from 'react-icons/fa'
import { HiCamera, HiExternalLink, HiBriefcase } from 'react-icons/hi'
import { HiSparkles } from 'react-icons/hi2'

const channels = [
  {
    id: 'shotbyseven',
    label: 'Shot by Seven',
    sublabel: 'Photography Studio',
    description: 'Book a session. View portfolio. Studio in Charlotte\'s NoDa arts district.',
    href: 'https://shotbyseven.com',
    icon: HiCamera,
    accent: '#c9a84c',
    tag: 'Photography',
    featured: true,
  },
  {
    id: 'instagram-sofarcam',
    label: '@sofar.cam',
    sublabel: 'Personal Instagram',
    description: 'Day-to-day life, creative work, behind the scenes.',
    href: 'https://instagram.com/sofar.cam',
    icon: FaInstagram,
    accent: '#c9a84c',
    tag: 'Social',
  },
  {
    id: 'instagram-sbs',
    label: '@shotbyseven777',
    sublabel: 'Photography Instagram',
    description: 'Portfolio drops, client features, studio content.',
    href: 'https://instagram.com/shotbyseven777',
    icon: FaInstagram,
    accent: '#c9a84c',
    tag: 'Social',
  },
  {
    id: 'youtube',
    label: 'YouTube',
    sublabel: 'sofarcam',
    description: 'Creative process, photography vlogs, behind the lens.',
    href: 'https://youtube.com/sofarcam',
    icon: FaYoutube,
    accent: '#c9a84c',
    tag: 'Video',
  },
  {
    id: 'upwork',
    label: 'Hire Me',
    sublabel: 'Upwork · Freelance',
    description: 'Available for photography, creative direction, and content creation projects.',
    href: 'https://www.upwork.com/freelancers/sofarcam',
    icon: HiBriefcase,
    accent: '#c9a84c',
    tag: 'Work',
  },
  {
    id: 'sofarseven',
    label: 'SofarSeven',
    sublabel: 'AI Sports + Creative Assistant',
    description: 'AI agent for sports betting analysis and creative workflow. Join the Discord.',
    href: 'https://discord.gg/sofarseven',
    icon: HiSparkles,
    accent: '#c9a84c',
    tag: 'AI',
  },
]

function LinkCard({ channel, index }) {
  const Icon = channel.icon

  return (
    <motion.a
      href={channel.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -2 }}
      className={`group relative flex items-start gap-5 p-6 border transition-all duration-300 ${
        channel.featured
          ? 'border-gold/30 bg-gold/5 hover:bg-gold/10 hover:border-gold/50'
          : 'border-cream/8 bg-warm-black/50 hover:bg-warm-black hover:border-cream/15'
      }`}
      style={{
        '--tw-bg-opacity': 1,
      }}
    >
      {/* Icon */}
      <div
        className={`flex-shrink-0 w-11 h-11 flex items-center justify-center border transition-colors duration-300 ${
          channel.featured
            ? 'border-gold/30 group-hover:border-gold/60 bg-gold/10'
            : 'border-cream/10 group-hover:border-gold/30'
        }`}
      >
        <Icon
          size={18}
          style={{ color: channel.featured ? '#c9a84c' : 'rgba(242,237,228,0.4)' }}
          className="group-hover:text-gold transition-colors duration-300"
        />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3 mb-1">
          <div>
            <p
              className="text-cream font-medium group-hover:text-gold transition-colors duration-300"
              style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem' }}
            >
              {channel.label}
            </p>
            <p
              className="text-cream/30 text-xs mt-0.5"
              style={{ fontFamily: 'var(--font-heading)', letterSpacing: '0.05em' }}
            >
              {channel.sublabel}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span
              className="text-[9px] tracking-[0.2em] uppercase text-gold/50 border border-gold/20 px-2 py-0.5"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {channel.tag}
            </span>
            <HiExternalLink
              size={13}
              className="text-cream/15 group-hover:text-gold/50 transition-colors duration-300"
            />
          </div>
        </div>
        <p
          className="text-cream/30 text-sm leading-relaxed mt-2 group-hover:text-cream/45 transition-colors duration-300"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {channel.description}
        </p>
      </div>

      {/* Featured glow line */}
      {channel.featured && (
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/50 to-transparent" />
      )}
    </motion.a>
  )
}

export default function Links() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-24 px-6 max-w-2xl mx-auto" ref={ref}>
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="mb-12 text-center"
      >
        <span
          className="text-[10px] tracking-[0.35em] uppercase text-gold/60 block mb-4"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Find Me
        </span>
        <h2
          className="text-cream"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 700,
          }}
        >
          Channels &amp;{' '}
          <span style={{ fontStyle: 'italic', color: 'var(--color-gold)' }}>Work</span>
        </h2>
      </motion.div>

      {/* Cards */}
      <div className="flex flex-col gap-3">
        {channels.map((channel, i) => (
          <LinkCard key={channel.id} channel={channel} index={i} />
        ))}
      </div>
    </section>
  )
}
