import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { HiArrowUpRight } from 'react-icons/hi2'

const services = [
  {
    title: 'Portraits',
    price: 'From $150',
    desc: 'Headshots, personal branding, LinkedIn. Studio at NoDa Arts District or on location.',
  },
  {
    title: 'Events',
    price: 'From $250',
    desc: 'Graduations, birthdays, milestones. Full coverage, same-day previews available.',
  },
  {
    title: 'Fashion & Editorial',
    price: 'From $300',
    desc: 'Creative direction, wardrobe styling guidance. For brands, models, and creatives.',
  },
  {
    title: 'Automotive',
    price: 'Custom',
    desc: 'Detail shots, lifestyle, showroom-ready imagery for car owners and dealerships.',
  },
]

function ServiceCard({ service, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative p-6 border border-cream/6 hover:border-gold/25 transition-colors duration-300"
    >
      {/* Gold top line on hover */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gold/0 group-hover:bg-gold/40 transition-colors duration-300" />

      <div className="flex items-start justify-between mb-4">
        <p
          className="text-cream/80 group-hover:text-cream transition-colors duration-300"
          style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', fontWeight: 600, letterSpacing: '-0.01em' }}
        >
          {service.title}
        </p>
        <span
          className="text-gold/50 group-hover:text-gold transition-colors duration-300 flex-shrink-0 ml-4"
          style={{ fontFamily: 'var(--font-heading)', fontSize: '0.72rem', letterSpacing: '0.04em' }}
        >
          {service.price}
        </span>
      </div>
      <p
        className="text-cream/28 group-hover:text-cream/45 transition-colors duration-300"
        style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', lineHeight: 1.65 }}
      >
        {service.desc}
      </p>
    </motion.div>
  )
}

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-24 px-6 max-w-sm mx-auto" ref={ref}>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-cream/22 mb-3"
        style={{ fontFamily: 'var(--font-heading)', fontSize: '0.66rem', letterSpacing: '0.24em', textTransform: 'uppercase' }}
      >
        Services
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-10"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.2rem, 7vw, 3.2rem)',
          fontWeight: 700,
          lineHeight: 0.95,
          letterSpacing: '-0.03em',
          color: '#f0ebe2',
        }}
      >
        What I{' '}
        <span style={{ fontStyle: 'italic', color: '#c9a84c' }}>Shoot</span>
      </motion.h2>

      <div className="flex flex-col gap-2 mb-10">
        {services.map((s, i) => (
          <ServiceCard key={s.title} service={s} index={i} />
        ))}
      </div>

      <motion.a
        href="https://shotbyseven.com"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        whileHover={{ x: 3 }}
        className="inline-flex items-center gap-3 px-5 py-3 border border-gold/30 text-gold/70 hover:text-gold hover:border-gold/60 transition-colors duration-300"
      >
        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.8rem', letterSpacing: '0.06em' }}>
          Book a session
        </span>
        <HiArrowUpRight size={13} />
      </motion.a>
    </section>
  )
}
