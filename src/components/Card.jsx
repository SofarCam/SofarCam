import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { FaInstagram, FaYoutube } from 'react-icons/fa'
import { HiArrowUpRight } from 'react-icons/hi2'

/* ─── Stagger fade helper ─── */
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
})

/* ─── Links data ─── */
const links = [
  {
    label: 'Shot by Seven',
    sub: 'Photography Studio · Charlotte, NC',
    href: 'https://shotbyseven.com',
    primary: true,
  },
  {
    label: 'Instagram',
    sub: '@sofar.cam',
    href: 'https://instagram.com/sofar.cam',
    icon: FaInstagram,
  },
  {
    label: 'YouTube',
    sub: 'sofarcam',
    href: 'https://youtube.com/sofarcam',
    icon: FaYoutube,
  },
  {
    label: 'Photography IG',
    sub: '@shotbyseven777',
    href: 'https://instagram.com/shotbyseven777',
    icon: FaInstagram,
  },
  {
    label: 'Hire Me',
    sub: 'Upwork · Freelance work',
    href: 'https://upwork.com',
  },
]

/* ─── Cursor glow that follows the mouse ─── */
function CursorGlow() {
  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const springX = useSpring(x, { stiffness: 120, damping: 20 })
  const springY = useSpring(y, { stiffness: 120, damping: 20 })

  useEffect(() => {
    const move = (e) => { x.set(e.clientX); y.set(e.clientY) }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])

  return (
    <motion.div
      className="fixed pointer-events-none z-0 rounded-full"
      style={{
        width: 320,
        height: 320,
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
        background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)',
        filter: 'blur(20px)',
      }}
    />
  )
}

/* ─── Magnetic tilt card wrapper ─── */
function MagneticCard({ children }) {
  const ref = useRef(null)
  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 30 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 30 })

  const handleMouse = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    rotateY.set(dx * 3)
    rotateX.set(-dy * 3)
  }

  const handleLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
      className="w-full"
    >
      {children}
    </motion.div>
  )
}

/* ─── Individual link row ─── */
function LinkRow({ link, index }) {
  const Icon = link.icon
  const [hovered, setHovered] = useState(false)

  return (
    <motion.a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      {...fade(0.5 + index * 0.08)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative flex items-center justify-between py-4 border-b overflow-hidden transition-colors duration-300 ${
        link.primary ? 'border-gold/20' : 'border-cream/6'
      }`}
    >
      {/* Hover background fill */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 origin-left pointer-events-none"
        style={{
          background: link.primary
            ? 'linear-gradient(90deg, rgba(201,168,76,0.06) 0%, transparent 100%)'
            : 'linear-gradient(90deg, rgba(240,235,226,0.03) 0%, transparent 100%)',
        }}
      />

      <div className="relative flex items-center gap-4">
        {Icon && (
          <motion.div animate={{ scale: hovered ? 1.15 : 1 }} transition={{ duration: 0.2 }}>
            <Icon
              size={14}
              className={`flex-shrink-0 transition-colors duration-300 ${
                link.primary
                  ? 'text-gold/60 group-hover:text-gold'
                  : 'text-cream/20 group-hover:text-cream/60'
              }`}
            />
          </motion.div>
        )}
        <div>
          <p
            className={`font-medium transition-colors duration-300 ${
              link.primary ? 'text-gold' : 'text-cream/75 group-hover:text-cream'
            }`}
            style={{ fontFamily: 'var(--font-heading)', fontSize: '0.88rem', letterSpacing: '-0.01em' }}
          >
            {link.label}
          </p>
          <p
            className="text-cream/22 mt-0.5 group-hover:text-cream/45 transition-colors duration-300"
            style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem' }}
          >
            {link.sub}
          </p>
        </div>
      </div>

      <motion.div
        className="relative"
        animate={{
          x: hovered ? 0 : -4,
          opacity: hovered ? 1 : 0.3,
          rotate: hovered ? 0 : -45,
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <HiArrowUpRight
          size={13}
          className={link.primary ? 'text-gold' : 'text-cream/50'}
        />
      </motion.div>
    </motion.a>
  )
}

/* ─── Gold shimmer text ─── */
function ShimmerName() {
  return (
    <motion.h1
      {...fade(0.2)}
      style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(3rem, 13vw, 4.8rem)',
        fontWeight: 700,
        lineHeight: 0.92,
        letterSpacing: '-0.03em',
        color: '#f0ebe2',
      }}
    >
      Cameron
      <br />
      <motion.span
        style={{
          fontStyle: 'italic',
          display: 'inline-block',
          background: 'linear-gradient(90deg, #c9a84c 0%, #e8c96a 40%, #c9a84c 60%, #a07828 100%)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
        animate={{ backgroundPosition: ['0% center', '200% center'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      >
        Currence
      </motion.span>
    </motion.h1>
  )
}

/* ─── Main export ─── */
export default function Card() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16 relative">
      <CursorGlow />

      {/* Ambient background glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 60% at 50% 20%, rgba(201,168,76,0.045) 0%, transparent 65%)',
        }}
      />

      <MagneticCard>
        <div className="w-full max-w-sm relative z-10">

          {/* ── Identity ── */}
          <div className="mb-10">
            <motion.p
              {...fade(0.08)}
              className="text-cream/22 mb-5"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.66rem',
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
              }}
            >
              @sofar.cam
            </motion.p>

            <ShimmerName />

            <motion.p
              {...fade(0.34)}
              className="text-cream/32 mt-5"
              style={{ fontFamily: 'var(--font-body)', fontSize: '0.83rem', lineHeight: 1.7 }}
            >
              Photographer · Creator · Builder
              <br />
              <span className="text-cream/18 text-xs">Charlotte, NC</span>
            </motion.p>
          </div>

          {/* ── Gold rule ── */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
            className="origin-left h-px mb-8"
            style={{
              background: 'linear-gradient(90deg, rgba(201,168,76,0.5) 0%, rgba(201,168,76,0.08) 60%, transparent 100%)',
            }}
          />

          {/* ── Links ── */}
          <div>
            {links.map((link, i) => (
              <LinkRow key={link.href} link={link} index={i} />
            ))}
          </div>

          {/* ── Footer ── */}
          <motion.div
            {...fade(1.05)}
            className="mt-10 flex items-center justify-between"
          >
            <p
              className="text-cream/12"
              style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.04em' }}
            >
              Charlotte, NC · {new Date().getFullYear()}
            </p>
            <div className="flex items-center gap-4">
              {[
                { href: 'https://instagram.com/sofar.cam', Icon: FaInstagram },
                { href: 'https://youtube.com/sofarcam', Icon: FaYoutube },
              ].map(({ href, Icon }) => (
                <motion.a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.25, color: '#c9a84c' }}
                  transition={{ duration: 0.2 }}
                  className="text-cream/15"
                >
                  <Icon size={12} />
                </motion.a>
              ))}
            </div>
          </motion.div>

        </div>
      </MagneticCard>
    </div>
  )
}
