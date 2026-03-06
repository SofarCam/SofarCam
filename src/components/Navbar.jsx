import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'Tools', href: '#sofarcontent' },
  { label: 'Trending', href: '#trending' },
  { label: 'Toolkit', href: '#tools' },
  { label: 'Services', href: '#services' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4"
    >
      <div
        className="w-full max-w-3xl rounded-2xl px-5 py-3 flex items-center justify-between transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(9,9,11,0.85)' : 'rgba(9,9,11,0.4)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: scrolled ? '1px solid rgba(167,139,250,0.15)' : '1px solid rgba(167,139,250,0.06)',
          boxShadow: scrolled ? '0 8px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(124,58,237,0.05)' : 'none',
        }}
      >
        {/* Logo */}
        <a href="#" className="no-underline">
          <span
            className="gradient-text-glow"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.1rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
            }}
          >
            SofarContent
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="px-4 py-1.5 rounded-lg text-xs font-medium tracking-wide uppercase transition-all duration-200 no-underline"
              style={{
                fontFamily: 'var(--font-heading)',
                color: 'rgba(244,244,245,0.45)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'rgba(244,244,245,0.9)'
                e.currentTarget.style.background = 'rgba(167,139,250,0.08)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'rgba(244,244,245,0.45)'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="mailto:shotbyseven@gmail.com?subject=SofarContent%20Discovery%20Call"
            className="ml-2 px-4 py-1.5 rounded-lg text-xs font-bold tracking-wide uppercase no-underline transition-all duration-300"
            style={{
              fontFamily: 'var(--font-heading)',
              background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
              color: '#fff',
              boxShadow: '0 0 16px rgba(124,58,237,0.35)',
            }}
          >
            Work With Us
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {[0,1,2].map(i => (
            <motion.span
              key={i}
              animate={open
                ? i === 0 ? { rotate: 45, y: 8 } : i === 1 ? { opacity: 0 } : { rotate: -45, y: -8 }
                : { rotate: 0, y: 0, opacity: 1 }
              }
              className="block w-5 h-px"
              style={{ background: 'rgba(244,244,245,0.5)' }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 left-4 right-4 rounded-2xl p-4 flex flex-col gap-1"
            style={{
              background: 'rgba(9,9,11,0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(167,139,250,0.15)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}
          >
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-xl text-sm no-underline transition-colors duration-200"
                style={{
                  fontFamily: 'var(--font-heading)',
                  color: 'rgba(244,244,245,0.6)',
                }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="mailto:shotbyseven@gmail.com?subject=SofarContent%20Discovery%20Call"
              onClick={() => setOpen(false)}
              className="mt-1 px-4 py-3 rounded-xl text-sm font-bold text-center no-underline"
              style={{
                fontFamily: 'var(--font-heading)',
                background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                color: '#fff',
              }}
            >
              Work With Us
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
