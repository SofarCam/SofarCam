import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaInstagram, FaYoutube } from 'react-icons/fa'
import { HiArrowUpRight } from 'react-icons/hi2'

const channels = [
  {
    label: 'Instagram',
    value: '@sofar.cam',
    href: 'https://instagram.com/sofar.cam',
    icon: FaInstagram,
  },
  {
    label: 'Photography',
    value: '@shotbyseven777',
    href: 'https://instagram.com/shotbyseven777',
    icon: FaInstagram,
  },
  {
    label: 'YouTube',
    value: 'sofarcam',
    href: 'https://youtube.com/sofarcam',
    icon: FaYoutube,
  },
]

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-24 px-6 max-w-sm mx-auto" ref={ref}>
      {/* Rule */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="origin-left h-px mb-14"
        style={{ background: 'linear-gradient(90deg, rgba(201,168,76,0.3) 0%, transparent 100%)' }}
      />

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-cream/22 mb-3"
        style={{ fontFamily: 'var(--font-heading)', fontSize: '0.66rem', letterSpacing: '0.24em', textTransform: 'uppercase' }}
      >
        Contact
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-4"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.2rem, 7vw, 3.2rem)',
          fontWeight: 700,
          lineHeight: 0.95,
          letterSpacing: '-0.03em',
          color: '#f0ebe2',
        }}
      >
        Let's{' '}
        <span style={{ fontStyle: 'italic', color: '#c9a84c' }}>Work</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-cream/28 mb-10"
        style={{ fontFamily: 'var(--font-body)', fontSize: '0.83rem', lineHeight: 1.7 }}
      >
        For bookings, collabs, or just to say what's up —
        slide in the DMs or hit the booking page.
      </motion.p>

      {/* Social channels */}
      <div className="flex flex-col gap-0 mb-10">
        {channels.map((ch, i) => {
          const Icon = ch.icon
          return (
            <motion.a
              key={ch.href}
              href={ch.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.25 + i * 0.07 }}
              whileHover={{ x: 4 }}
              className="group flex items-center justify-between py-4 border-b border-cream/6 hover:border-cream/15 transition-colors duration-200"
            >
              <div className="flex items-center gap-3">
                <Icon size={13} className="text-cream/20 group-hover:text-gold/70 transition-colors duration-200" />
                <span
                  className="text-cream/40 group-hover:text-cream transition-colors duration-200"
                  style={{ fontFamily: 'var(--font-heading)', fontSize: '0.82rem' }}
                >
                  {ch.value}
                </span>
              </div>
              <span
                className="text-cream/15 group-hover:text-cream/30 transition-colors duration-200"
                style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem' }}
              >
                {ch.label}
              </span>
            </motion.a>
          )
        })}
      </div>

      {/* Book CTA */}
      <motion.a
        href="https://shotbyseven.com"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.55 }}
        whileHover={{ x: 3 }}
        className="group inline-flex items-center gap-3 text-cream/30 hover:text-gold transition-colors duration-300"
      >
        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.8rem', letterSpacing: '0.08em' }}>
          Book a session at shotbyseven.com
        </span>
        <HiArrowUpRight size={13} />
      </motion.a>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="mt-20 pt-8 border-t border-cream/5 flex items-center justify-between"
      >
        <span
          className="text-cream/12"
          style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontStyle: 'italic', color: '#c9a84c', opacity: 0.4 }}
        >
          Cam.
        </span>
        <span
          className="text-cream/10"
          style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem' }}
        >
          Charlotte, NC · {new Date().getFullYear()}
        </span>
      </motion.div>
    </section>
  )
}
