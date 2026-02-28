import { motion } from 'framer-motion'
import { FaInstagram, FaYoutube } from 'react-icons/fa'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(201,168,76,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Horizontal rule top */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent origin-left"
      />

      <div className="text-center max-w-2xl mx-auto relative z-10">
        {/* Handle badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-10"
        >
          <div className="w-5 h-px bg-gold/40" />
          <span
            className="text-[10px] tracking-[0.35em] uppercase text-gold/70"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            @sofar.cam
          </span>
          <div className="w-5 h-px bg-gold/40" />
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-cream mb-6"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3.5rem, 10vw, 7rem)',
            fontWeight: 700,
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
          }}
        >
          Cam
          <span style={{ fontStyle: 'italic', color: 'var(--color-gold)' }}>.</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="text-cream/40 mb-12 leading-relaxed"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
          }}
        >
          Photographer · Creator · Builder
          <br />
          <span className="text-cream/25 text-sm">Charlotte, NC</span>
        </motion.p>

        {/* Social quick-links */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75 }}
          className="flex items-center justify-center gap-6"
        >
          <a
            href="https://instagram.com/sofar.cam"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-cream/30 hover:text-gold transition-colors duration-300"
          >
            <FaInstagram size={16} />
            <span
              className="text-[10px] tracking-[0.2em] uppercase"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Instagram
            </span>
          </a>
          <div className="w-px h-4 bg-cream/10" />
          <a
            href="https://youtube.com/sofarcam"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-cream/30 hover:text-gold transition-colors duration-300"
          >
            <FaYoutube size={16} />
            <span
              className="text-[10px] tracking-[0.2em] uppercase"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              YouTube
            </span>
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span
          className="text-[9px] tracking-[0.3em] uppercase text-cream/20"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-gold/30 to-transparent"
        />
      </motion.div>
    </section>
  )
}
