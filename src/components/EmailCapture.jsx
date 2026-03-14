import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function EmailCapture() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!isValid || loading) return
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Failed to subscribe')
      }

      setSubmitted(true)
    } catch (err) {
      setError(err.message || 'Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="waitlist" className="relative py-24 px-6 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 100%, rgba(124,58,237,0.07) 0%, transparent 65%)',
        }}
      />

      {/* Top divider line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px"
        style={{
          height: '80px',
          background: 'linear-gradient(to bottom, transparent, rgba(124,58,237,0.3), transparent)',
        }}
      />

      <div className="max-w-2xl mx-auto relative z-10 text-center">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full"
                style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(167,139,250,0.2)' }}
              >
                <span
                  className="text-[10px] tracking-[0.25em] uppercase"
                  style={{ color: '#a78bfa', fontFamily: 'var(--font-heading)' }}
                >
                  🚀 Early Access
                </span>
              </div>

              {/* Headline */}
              <h2
                className="mb-4"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2rem, 5.5vw, 3.2rem)',
                  fontWeight: 800,
                  lineHeight: 1.05,
                  letterSpacing: '-0.03em',
                  color: '#f4f4f5',
                }}
              >
                Get the tools before{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #a78bfa, #67e8f9)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  everyone else.
                </span>
              </h2>

              <p
                className="mb-8 max-w-sm mx-auto leading-relaxed"
                style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'rgba(244,244,245,0.4)' }}
              >
                New tools drop weekly. Subscribers get them first — plus tips on what's actually working on each platform.
              </p>

              {/* Social proof */}
              <div className="flex items-center justify-center gap-6 mb-8">
                {[
                  { stat: 'Free', label: 'always' },
                  { stat: 'Weekly', label: 'drops' },
                  { stat: 'No spam', label: 'ever' },
                ].map(({ stat, label }) => (
                  <div key={label} className="text-center">
                    <p
                      className="text-lg font-bold"
                      style={{ fontFamily: 'var(--font-heading)', color: '#a78bfa' }}
                    >
                      {stat}
                    </p>
                    <p
                      className="text-[10px] tracking-[0.15em] uppercase"
                      style={{ fontFamily: 'var(--font-heading)', color: 'rgba(244,244,245,0.25)' }}
                    >
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 px-5 py-3.5 rounded-xl text-sm outline-none transition-all duration-200"
                  style={{
                    fontFamily: 'var(--font-body)',
                    background: 'rgba(244,244,245,0.05)',
                    border: `1px solid ${isValid ? 'rgba(167,139,250,0.35)' : 'rgba(244,244,245,0.08)'}`,
                    color: 'rgba(244,244,245,0.85)',
                    fontSize: '0.9rem',
                  }}
                  onFocus={e => (e.target.style.borderColor = 'rgba(167,139,250,0.4)')}
                  onBlur={e => (e.target.style.borderColor = isValid ? 'rgba(167,139,250,0.35)' : 'rgba(244,244,245,0.08)')}
                />

                <motion.button
                  type="submit"
                  disabled={!isValid || loading}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-3.5 rounded-xl text-sm font-bold tracking-wide uppercase transition-all duration-300 shrink-0"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    background: isValid && !loading
                      ? 'linear-gradient(135deg, #7c3aed, #06b6d4)'
                      : 'rgba(244,244,245,0.04)',
                    border: `1px solid ${isValid && !loading ? 'transparent' : 'rgba(244,244,245,0.06)'}`,
                    color: isValid && !loading ? '#fff' : 'rgba(244,244,245,0.2)',
                    cursor: isValid && !loading ? 'pointer' : 'not-allowed',
                    boxShadow: isValid && !loading ? '0 0 24px rgba(124,58,237,0.35)' : 'none',
                  }}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }}
                        className="inline-block w-3.5 h-3.5 rounded-full"
                        style={{ border: '1.5px solid rgba(255,255,255,0.3)', borderTopColor: '#fff' }}
                      />
                      Joining...
                    </span>
                  ) : 'Get Early Access →'}
                </motion.button>
              </form>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 text-xs"
                    style={{ color: 'rgba(255,100,100,0.6)', fontFamily: 'var(--font-body)' }}
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <p
                className="mt-4 text-[10px] tracking-[0.15em] uppercase"
                style={{ fontFamily: 'var(--font-heading)', color: 'rgba(244,244,245,0.2)' }}
              >
                No spam. Unsubscribe anytime.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                className="text-5xl mb-6"
              >
                🎉
              </motion.div>
              <h3
                className="mb-3"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
                  fontWeight: 800,
                  color: '#f4f4f5',
                }}
              >
                You're in.
              </h3>
              <p
                className="max-w-xs mx-auto leading-relaxed"
                style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'rgba(244,244,245,0.4)' }}
              >
                Check your inbox for a confirmation. New tools and platform tips drop every week.
              </p>

              <div
                className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full"
                style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)' }}
              >
                <span className="text-xs" style={{ fontFamily: 'var(--font-body)', color: 'rgba(167,139,250,0.7)' }}>
                  {email}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
