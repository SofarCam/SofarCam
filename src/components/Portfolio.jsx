import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { HiArrowUpRight } from 'react-icons/hi2'

const photos = [
  { src: '/photos/DM0A3082.webp', alt: 'Portrait' },
  { src: '/photos/DM0A3108.webp', alt: 'Portrait' },
  { src: '/photos/DM0A3194.webp', alt: 'Portrait' },
  { src: '/photos/DM0A3332.webp', alt: 'Portrait' },
  { src: '/photos/DM0A3446.webp', alt: 'Portrait' },
  { src: '/photos/DM0A3526.webp', alt: 'Portrait' },
  { src: '/photos/DM0A3878.webp', alt: 'Portrait' },
  { src: '/photos/DM0A5935.webp', alt: 'Portrait' },
  { src: '/photos/DM0A2936.webp', alt: 'Portrait' },
  { src: '/photos/DM0A2960.webp', alt: 'Portrait' },
  { src: '/photos/19_websize.webp', alt: 'Portrait' },
  { src: '/photos/26_websize.webp', alt: 'Portrait' },
]

function PhotoCard({ photo, index }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.02 }}
      className="relative overflow-hidden bg-white/5 cursor-pointer group"
      style={{ aspectRatio: '3/4' }}
    >
      {!loaded && (
        <div className="absolute inset-0 bg-white/3 animate-pulse" />
      )}
      <img
        src={photo.src}
        alt={photo.alt}
        onLoad={() => setLoaded(true)}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.3s ease' }}
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
    </motion.div>
  )
}

export default function Portfolio() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-24 px-6 max-w-4xl mx-auto" ref={ref}>
      {/* Header */}
      <div className="max-w-sm mx-auto mb-14">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="origin-left h-px mb-10"
          style={{
            background: 'linear-gradient(90deg, rgba(201,168,76,0.4) 0%, transparent 100%)',
          }}
        />
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-cream/22 mb-3"
          style={{ fontFamily: 'var(--font-heading)', fontSize: '0.66rem', letterSpacing: '0.24em', textTransform: 'uppercase' }}
        >
          Work
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.2rem, 7vw, 3.2rem)',
            fontWeight: 700,
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            color: '#f0ebe2',
          }}
        >
          Selected{' '}
          <span style={{ fontStyle: 'italic', color: '#c9a84c' }}>Shots</span>
        </motion.h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {photos.map((photo, i) => (
          <PhotoCard key={photo.src} photo={photo} index={i} />
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-10 max-w-sm mx-auto"
      >
        <a
          href="https://shotbyseven.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 text-cream/30 hover:text-gold transition-colors duration-300"
        >
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.8rem', letterSpacing: '0.08em' }}>
            Full portfolio at shotbyseven.com
          </span>
          <motion.div
            animate={{ x: 0 }}
            whileHover={{ x: 3 }}
          >
            <HiArrowUpRight size={13} />
          </motion.div>
        </a>
      </motion.div>
    </section>
  )
}
