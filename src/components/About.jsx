import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const stats = [
  { value: 'Charlotte', label: 'Base' },
  { value: 'NoDa', label: 'Studio' },
  { value: '2+', label: 'Years Shooting' },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-24 px-6 max-w-2xl mx-auto" ref={ref}>
      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-px bg-gradient-to-r from-transparent via-cream/8 to-transparent mb-24 origin-left"
      />

      <motion.span
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-[10px] tracking-[0.35em] uppercase text-gold/60 block mb-6 text-center"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        The Story
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="text-cream mb-8 text-center"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
          fontWeight: 700,
          lineHeight: 1.2,
        }}
      >
        Building things that{' '}
        <span style={{ fontStyle: 'italic', color: 'var(--color-gold)' }}>last</span>
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="space-y-4 mb-14"
      >
        <p
          className="text-cream/40 leading-relaxed text-center"
          style={{ fontFamily: 'var(--font-body)', fontSize: '1rem' }}
        >
          I'm Cam — photographer, creative, and builder based out of Charlotte, NC.
          I run{' '}
          <a
            href="https://shotbyseven.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold/70 hover:text-gold transition-colors duration-200"
          >
            Shot by Seven
          </a>
          , a photography studio where I shoot portraits, brand content, fashion,
          graduations, and whatever inspires me that week.
        </p>
        <p
          className="text-cream/30 leading-relaxed text-center text-sm"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Outside of photography, I build AI tools, analyze sports markets, and
          chase whatever creative project has my attention. This page is my home base —
          all channels, one place.
        </p>
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.35 }}
        className="grid grid-cols-3 gap-px border border-cream/8 overflow-hidden"
      >
        {stats.map((stat, i) => (
          <div
            key={i}
            className="py-6 px-4 text-center bg-warm-black"
          >
            <p
              className="text-gold font-bold mb-1"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontStyle: 'italic',
              }}
            >
              {stat.value}
            </p>
            <p
              className="text-cream/25 text-[9px] tracking-[0.2em] uppercase"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
