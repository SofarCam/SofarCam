import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden" style={{ paddingTop: 'clamp(80px, 15vh, 120px)' }}>
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(201,168,76,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Top rule */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 w-full h-px origin-left"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.25), transparent)' }}
      />

      <div className="text-center max-w-3xl mx-auto relative z-10">

        {/* Badge */}
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
            SofarContent — Beta
          </span>
          <div className="w-5 h-px bg-gold/40" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-cream mb-6"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.4rem, 7vw, 5rem)',
            fontWeight: 700,
            lineHeight: 1.02,
            letterSpacing: '-0.02em',
          }}
        >
          Your Business Needs
          <br />
          a Marketing Brain
          <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>.</span>
          <br />
          <motion.span
            style={{
              fontStyle: 'italic',
              background: 'linear-gradient(90deg, #c9a84c 0%, #e8c96a 40%, #c9a84c 60%, #a07828 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block',
            }}
            animate={{ backgroundPosition: ['0% center', '200% center'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          >
            Now It Has One.
          </motion.span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="text-cream/45 mb-4 leading-relaxed"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)',
          }}
        >
          Marketing intelligence for the rest of us.
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="text-cream/25 mb-12 leading-relaxed max-w-xl mx-auto"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.82rem, 2vw, 0.95rem)',
          }}
        >
          AI-powered marketing intelligence for creatives and small businesses who can't afford a CMO.
          No marketing degree required. No guessing what works. Just results.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          <a
            href="#sofarcontent"
            className="px-8 py-3.5 rounded-xl text-sm font-medium tracking-widest uppercase transition-all duration-300 hover:bg-gold/20"
            style={{
              fontFamily: 'var(--font-heading)',
              background: 'rgba(201,168,76,0.12)',
              border: '1px solid rgba(201,168,76,0.4)',
              color: 'var(--color-gold)',
            }}
          >
            Start Free
          </a>
          <a
            href="#services"
            className="px-8 py-3.5 rounded-xl text-sm font-medium tracking-widest uppercase transition-all duration-300 hover:border-cream/20 hover:text-cream/60"
            style={{
              fontFamily: 'var(--font-heading)',
              background: 'rgba(240,235,226,0.03)',
              border: '1px solid rgba(240,235,226,0.08)',
              color: 'rgba(240,235,226,0.35)',
            }}
          >
            Work With Us
          </a>
        </motion.div>

        {/* Platform badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="flex items-center justify-center gap-2 flex-wrap"
          style={{ marginTop: '60px', opacity: 0.5 }}
        >
          <span
            className="text-[9px] tracking-[0.3em] uppercase text-cream/15 mr-2"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Works on
          </span>
          {['Instagram', 'TikTok', 'YouTube', 'X', 'LinkedIn'].map((p) => (
            <span
              key={p}
              className="text-[10px] tracking-[0.1em] text-cream/20 px-2.5 py-1 rounded-full"
              style={{
                fontFamily: 'var(--font-heading)',
                border: '1px solid rgba(240,235,226,0.06)',
                background: 'rgba(240,235,226,0.02)',
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
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-gold/30 to-transparent"
        />
      </motion.div>
    </section>
  )
}
