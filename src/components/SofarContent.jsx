import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NICHES = ['Photography', 'Fitness', 'Fashion', 'Food', 'Travel', 'Music', 'Art', 'Business', 'Gaming', 'Lifestyle']
const PLATFORMS = ['Instagram', 'TikTok', 'YouTube Shorts']
const STYLES = ['Educational', 'Raw & Real', 'Aesthetic', 'Funny', 'Motivational', 'Behind the Scenes']

export default function SofarContent() {
  const [form, setForm] = useState({ niche: '', platform: '', style: '' })
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(null)

  const ready = form.niche && form.platform && form.style

  async function handleGenerate() {
    if (!ready || loading) return
    setLoading(true)
    setError(null)
    setResults(null)

    const prompt = `You are a viral content strategist who deeply understands what performs on social media in 2026.

Generate exactly 3 viral content concepts for a ${form.niche} creator on ${form.platform} with a ${form.style} style.

Each concept must be specific and scroll-stopping — not generic advice. Write hooks like a real creator would say them.

Return ONLY valid JSON, no markdown, no explanation:
{
  "concepts": [
    {
      "hook": "The exact opening line or visual hook for the first 3 seconds. Specific, punchy, impossible to scroll past.",
      "format": "The exact content format (e.g. POV, before/after, silent tutorial, storytime, talking head, trending audio)",
      "angle": "Why this works right now — the psychological trigger or trend behind it",
      "cta": "The exact call to action that drives saves, shares, or follows"
    },
    {
      "hook": "...",
      "format": "...",
      "angle": "...",
      "cta": "..."
    },
    {
      "hook": "...",
      "format": "...",
      "angle": "...",
      "cta": "..."
    }
  ]
}`

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1024,
          messages: [{ role: 'user', content: prompt }],
        }),
      })
      if (!res.ok) throw new Error('Generation failed')
      const data = await res.json()
      const text = data.content?.[0]?.text
      const parsed = JSON.parse(text)
      setResults(parsed.concepts)
    } catch {
      setError('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  function handleCopy(text, idx) {
    navigator.clipboard.writeText(text)
    setCopied(idx)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <section id="sofarcontent" className="relative py-32 px-6 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)',
        }}
      />

      {/* Top rule */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent mb-20" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-5 h-px bg-gold/40" />
            <span
              className="text-[10px] tracking-[0.35em] uppercase text-gold/70"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              SofarContent
            </span>
            <div className="w-5 h-px bg-gold/40" />
          </div>
          <h2
            className="text-cream mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.2rem, 6vw, 3.5rem)',
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            Go <span style={{ fontStyle: 'italic', color: 'var(--color-gold)' }}>viral.</span>
          </h2>
          <p
            className="text-cream/35 max-w-md mx-auto leading-relaxed"
            style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem' }}
          >
            Tell me your niche. Get 3 viral content concepts in 30 seconds.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="rounded-2xl border p-8 mb-8"
          style={{
            background: 'rgba(20,20,20,0.8)',
            borderColor: 'rgba(240,235,226,0.07)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div className="grid gap-6">
            {/* Niche */}
            <div>
              <label
                className="block text-[10px] tracking-[0.25em] uppercase text-cream/40 mb-3"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Your Niche
              </label>
              <div className="flex flex-wrap gap-2">
                {NICHES.map((n) => (
                  <button
                    key={n}
                    onClick={() => setForm((f) => ({ ...f, niche: n }))}
                    className="px-3 py-1.5 rounded-full text-xs transition-all duration-200"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      background: form.niche === n ? 'rgba(201,168,76,0.15)' : 'rgba(240,235,226,0.04)',
                      border: `1px solid ${form.niche === n ? 'rgba(201,168,76,0.5)' : 'rgba(240,235,226,0.08)'}`,
                      color: form.niche === n ? 'var(--color-gold)' : 'rgba(240,235,226,0.4)',
                    }}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            {/* Platform */}
            <div>
              <label
                className="block text-[10px] tracking-[0.25em] uppercase text-cream/40 mb-3"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Platform
              </label>
              <div className="flex flex-wrap gap-2">
                {PLATFORMS.map((p) => (
                  <button
                    key={p}
                    onClick={() => setForm((f) => ({ ...f, platform: p }))}
                    className="px-3 py-1.5 rounded-full text-xs transition-all duration-200"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      background: form.platform === p ? 'rgba(201,168,76,0.15)' : 'rgba(240,235,226,0.04)',
                      border: `1px solid ${form.platform === p ? 'rgba(201,168,76,0.5)' : 'rgba(240,235,226,0.08)'}`,
                      color: form.platform === p ? 'var(--color-gold)' : 'rgba(240,235,226,0.4)',
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Style */}
            <div>
              <label
                className="block text-[10px] tracking-[0.25em] uppercase text-cream/40 mb-3"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Your Style
              </label>
              <div className="flex flex-wrap gap-2">
                {STYLES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setForm((f) => ({ ...f, style: s }))}
                    className="px-3 py-1.5 rounded-full text-xs transition-all duration-200"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      background: form.style === s ? 'rgba(201,168,76,0.15)' : 'rgba(240,235,226,0.04)',
                      border: `1px solid ${form.style === s ? 'rgba(201,168,76,0.5)' : 'rgba(240,235,226,0.08)'}`,
                      color: form.style === s ? 'var(--color-gold)' : 'rgba(240,235,226,0.4)',
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate button */}
            <motion.button
              onClick={handleGenerate}
              disabled={!ready || loading}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-xl text-sm font-medium tracking-widest uppercase transition-all duration-300 mt-2"
              style={{
                fontFamily: 'var(--font-heading)',
                background: ready && !loading
                  ? 'rgba(201,168,76,0.12)'
                  : 'rgba(240,235,226,0.03)',
                border: `1px solid ${ready && !loading ? 'rgba(201,168,76,0.4)' : 'rgba(240,235,226,0.06)'}`,
                color: ready && !loading ? 'var(--color-gold)' : 'rgba(240,235,226,0.2)',
                cursor: ready && !loading ? 'pointer' : 'not-allowed',
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    className="inline-block w-3.5 h-3.5 rounded-full"
                    style={{ border: '1.5px solid rgba(201,168,76,0.3)', borderTopColor: 'var(--color-gold)' }}
                  />
                  Generating concepts...
                </span>
              ) : 'Generate Concepts'}
            </motion.button>
          </div>
        </motion.div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-sm mb-6"
              style={{ color: 'rgba(255,100,100,0.7)', fontFamily: 'var(--font-body)' }}
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {results && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <p
                className="text-center text-[10px] tracking-[0.3em] uppercase text-cream/25 mb-6"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                3 concepts · tap to copy
              </p>
              {results.map((concept, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => handleCopy(`Hook: ${concept.hook}\n\nFormat: ${concept.format}\n\nAngle: ${concept.angle}\n\nCTA: ${concept.cta}`, idx)}
                  className="rounded-xl border p-6 cursor-pointer group transition-all duration-300"
                  style={{
                    background: 'rgba(20,20,20,0.6)',
                    borderColor: copied === idx ? 'rgba(201,168,76,0.4)' : 'rgba(240,235,226,0.06)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span
                      className="text-[9px] tracking-[0.3em] uppercase"
                      style={{ fontFamily: 'var(--font-heading)', color: 'rgba(201,168,76,0.5)' }}
                    >
                      Concept {idx + 1}
                    </span>
                    <span
                      className="text-[9px] tracking-[0.2em] uppercase transition-colors duration-200"
                      style={{
                        fontFamily: 'var(--font-heading)',
                        color: copied === idx ? 'var(--color-gold)' : 'rgba(240,235,226,0.15)',
                      }}
                    >
                      {copied === idx ? 'Copied' : 'Copy'}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <span
                        className="text-[9px] tracking-[0.2em] uppercase text-cream/25 block mb-1"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        Hook
                      </span>
                      <p
                        className="text-cream/85 leading-relaxed"
                        style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem' }}
                      >
                        {concept.hook}
                      </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                      <div
                        className="rounded-lg p-3"
                        style={{ background: 'rgba(240,235,226,0.03)', border: '1px solid rgba(240,235,226,0.05)' }}
                      >
                        <span
                          className="text-[8px] tracking-[0.2em] uppercase text-cream/25 block mb-1"
                          style={{ fontFamily: 'var(--font-heading)' }}
                        >
                          Format
                        </span>
                        <p className="text-cream/55 text-xs" style={{ fontFamily: 'var(--font-body)' }}>
                          {concept.format}
                        </p>
                      </div>
                      <div
                        className="rounded-lg p-3"
                        style={{ background: 'rgba(240,235,226,0.03)', border: '1px solid rgba(240,235,226,0.05)' }}
                      >
                        <span
                          className="text-[8px] tracking-[0.2em] uppercase text-cream/25 block mb-1"
                          style={{ fontFamily: 'var(--font-heading)' }}
                        >
                          Angle
                        </span>
                        <p className="text-cream/55 text-xs" style={{ fontFamily: 'var(--font-body)' }}>
                          {concept.angle}
                        </p>
                      </div>
                      <div
                        className="rounded-lg p-3"
                        style={{ background: 'rgba(240,235,226,0.03)', border: '1px solid rgba(240,235,226,0.05)' }}
                      >
                        <span
                          className="text-[8px] tracking-[0.2em] uppercase text-cream/25 block mb-1"
                          style={{ fontFamily: 'var(--font-heading)' }}
                        >
                          CTA
                        </span>
                        <p className="text-cream/55 text-xs" style={{ fontFamily: 'var(--font-body)' }}>
                          {concept.cta}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Generate again */}
              <div className="text-center pt-4">
                <button
                  onClick={() => { setResults(null); setForm({ niche: '', platform: '', style: '' }) }}
                  className="text-[10px] tracking-[0.25em] uppercase text-cream/25 hover:text-gold/60 transition-colors duration-200"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Start over
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom rule */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent mt-20" />
    </section>
  )
}
