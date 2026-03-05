import { motion } from 'framer-motion'
import { FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa'
import { HiArrowUpRight } from 'react-icons/hi2'

const socials = [
  { href: 'https://instagram.com/sofar.cam', icon: FaInstagram, label: '@sofar.cam' },
  { href: 'https://instagram.com/shotbyseven777', icon: FaInstagram, label: '@shotbyseven777' },
  { href: 'https://youtube.com/sofarcam', icon: FaYoutube, label: 'YouTube' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative pt-24 pb-12 px-6 overflow-hidden">
      {/* Top gradient separator */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(124,58,237,0.4) 30%, rgba(6,182,212,0.4) 70%, transparent 100%)' }}
      />

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(124,58,237,0.06) 0%, transparent 60%)' }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Big CTA line */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <p className="text-[10px] tracking-[0.35em] uppercase mb-6" style={{ fontFamily: 'var(--font-heading)', color: 'rgba(167,139,250,0.4)' }}>
            Ready to grow?
          </p>
          <h2
            className="mb-8"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 7vw, 5rem)',
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
              color: '#f4f4f5',
              textShadow: '0 0 80px rgba(124,58,237,0.25)',
            }}
          >
            Stop scrolling.
            <br />
            <span className="gradient-text-glow">Start creating.</span>
          </h2>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a
              href="#sofarcontent"
              className="px-8 py-4 rounded-xl text-sm font-bold tracking-wide uppercase transition-all duration-300"
              style={{
                fontFamily: 'var(--font-heading)',
                background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                color: '#fff',
                boxShadow: '0 0 40px rgba(124,58,237,0.5)',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 60px rgba(124,58,237,0.7)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(124,58,237,0.5)' }}
            >
              Try Free Tools →
            </a>
            <a
              href="mailto:shotbyseven@gmail.com?subject=SofarContent%20Discovery%20Call"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-medium tracking-wide uppercase transition-all duration-300"
              style={{
                fontFamily: 'var(--font-heading)',
                background: 'rgba(244,244,245,0.04)',
                border: '1px solid rgba(244,244,245,0.1)',
                color: 'rgba(244,244,245,0.5)',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(167,139,250,0.3)'; e.currentTarget.style.color = 'rgba(244,244,245,0.8)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(244,244,245,0.1)'; e.currentTarget.style.color = 'rgba(244,244,245,0.5)' }}
            >
              Work With Us <HiArrowUpRight size={12} />
            </a>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="w-full h-px mb-12" style={{ background: 'linear-gradient(90deg, transparent, rgba(244,244,245,0.06), transparent)' }} />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.03 }} className="flex flex-col items-center sm:items-start gap-1">
            <span
              className="gradient-text-glow"
              style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.03em' }}
            >
              SofarContent
            </span>
            <span className="text-[9px] tracking-[0.3em] uppercase" style={{ fontFamily: 'var(--font-heading)', color: 'rgba(244,244,245,0.18)' }}>
              Charlotte, NC · {year}
            </span>
          </motion.div>

          {/* Socials */}
          <div className="flex items-center gap-4">
            {socials.map((s) => {
              const Icon = s.icon
              return (
                <motion.a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -2 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-300"
                  style={{ background: 'rgba(244,244,245,0.04)', border: '1px solid rgba(244,244,245,0.07)', color: 'rgba(244,244,245,0.3)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(124,58,237,0.12)'; e.currentTarget.style.borderColor = 'rgba(167,139,250,0.3)'; e.currentTarget.style.color = '#a78bfa'; e.currentTarget.style.boxShadow = '0 0 16px rgba(124,58,237,0.3)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(244,244,245,0.04)'; e.currentTarget.style.borderColor = 'rgba(244,244,245,0.07)'; e.currentTarget.style.color = 'rgba(244,244,245,0.3)'; e.currentTarget.style.boxShadow = 'none' }}
                  aria-label={s.label}
                >
                  <Icon size={15} />
                </motion.a>
              )
            })}
          </div>

          {/* Credit */}
          <p className="text-[10px]" style={{ fontFamily: 'var(--font-body)', color: 'rgba(244,244,245,0.12)' }}>
            Built by{' '}
            <a href="https://shotbyseven.com" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(167,139,250,0.35)' }}>
              Cam
            </a>{' '}
            &amp; SofarSeven
          </p>
        </div>
      </div>
    </footer>
  )
}
