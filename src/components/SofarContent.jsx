import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HookWriter from './HookWriter'
import CaptionWriter from './CaptionWriter'
import LinkedInWriter from './LinkedInWriter'
import ContentAnalyzer from './ContentAnalyzer'
import { llmFetch } from '../lib/llmFetch'

const NICHES = ['Photography', 'Fitness', 'Fashion', 'Food', 'Travel', 'Music', 'Art', 'Business', 'Gaming', 'Lifestyle']
const PLATFORMS = ['Instagram', 'TikTok', 'YouTube Shorts']
const STYLES = ['Educational', 'Raw & Real', 'Aesthetic', 'Funny', 'Motivational', 'Behind the Scenes']

const TABS = [
  { id: 'concepts', label: 'Concept Generator', sub: '3 viral concepts in 30s', color: '#a78bfa', colorRgb: '124,58,237' },
  { id: 'hooks', label: 'Hook Writer', sub: '10 scroll-stopping hooks', color: '#67e8f9', colorRgb: '6,182,212' },
  { id: 'captions', label: 'Caption Writer', sub: '5 platform-ready captions', color: '#f9a8d4', colorRgb: '236,72,153' },
  { id: 'linkedin', label: 'LinkedIn Writer', sub: '3 authority-building posts', color: '#60a5fa', colorRgb: '96,165,250' },
  { id: 'analyzer', label: 'Content Analyzer', sub: 'Break down any post', color: '#fb923c', colorRgb: '251,146,60' },
]

export default function SofarContent() {
  const [activeTab, setActiveTab] = useState('concepts')
  const [form, setForm] = useState({ niche: '', platform: '', style: '' })
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(null)
  const [usedFallback, setUsedFallback] = useState(false)

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
      const { text, usedFallback: fb } = await llmFetch(prompt, 1024)
      setUsedFallback(fb)
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
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(124,58,237,0.08) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-5 px-3 py-1 rounded-full" style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(167,139,250,0.2)' }}>
            <span className="text-[10px] tracking-[0.25em] uppercase" style={{ color: '#a78bfa', fontFamily: 'var(--font-heading)' }}>
              Free Tools
            </span>
          </div>
          <h2
            className="mb-4 heading-glow"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.2rem, 6vw, 3.5rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: '#f4f4f5',
            }}
          >
            Pick a tool.{' '}
            <span className="gradient-text-glow">Start creating.</span>
          </h2>
          <p
            className="max-w-md mx-auto leading-relaxed"
            style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'rgba(244,244,245,0.4)' }}
          >
            AI tools that tell you exactly what to post and how to hook your audience. Free, forever.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-8"
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <TabCard
                key={tab.id}
                tab={tab}
                isActive={isActive}
                onClick={() => { setActiveTab(tab.id); setResults(null) }}
              />
            )
          })}
        </motion.div>

        {/* LinkedIn Writer tab */}
        <AnimatePresence mode="wait">
          {activeTab === 'linkedin' && (
            <motion.div
              key="linkedin"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <LinkedInWriter />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Analyzer tab */}
        <AnimatePresence mode="wait">
          {activeTab === 'analyzer' && (
            <motion.div
              key="analyzer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <ContentAnalyzer />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hook Writer tab */}
        <AnimatePresence mode="wait">
          {activeTab === 'hooks' && (
            <motion.div
              key="hooks"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <HookWriter />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Caption Writer tab */}
        <AnimatePresence mode="wait">
          {activeTab === 'captions' && (
            <motion.div
              key="captions"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <CaptionWriter />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Concepts tab */}
        <AnimatePresence mode="wait">
        {activeTab === 'concepts' && (
        <motion.div
          key="concepts"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="rounded-2xl border p-8 mb-8"
          style={{
            background: 'rgba(17,17,22,0.9)',
            borderColor: 'rgba(124,58,237,0.15)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div className="grid gap-6">
            {/* Niche */}
            <div>
              <label
                className="block text-[10px] tracking-[0.25em] uppercase mb-3"
                style={{ fontFamily: 'var(--font-heading)', color: 'rgba(167,139,250,0.6)' }}
              >
                Your Niche
              </label>
              <div className="flex flex-wrap gap-2">
                {NICHES.map((n) => {
                  const sel = form.niche === n
                  return (
                    <button
                      key={n}
                      onClick={() => setForm((f) => ({ ...f, niche: n }))}
                      className="px-3 py-1.5 rounded-full text-xs transition-all duration-200"
                      style={{
                        fontFamily: 'var(--font-heading)',
                        background: sel ? 'rgba(124,58,237,0.2)' : 'rgba(244,244,245,0.04)',
                        border: `1px solid ${sel ? 'rgba(167,139,250,0.5)' : 'rgba(244,244,245,0.08)'}`,
                        color: sel ? '#a78bfa' : 'rgba(244,244,245,0.4)',
                      }}
                    >
                      {n}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Platform */}
            <div>
              <label
                className="block text-[10px] tracking-[0.25em] uppercase mb-3"
                style={{ fontFamily: 'var(--font-heading)', color: 'rgba(167,139,250,0.6)' }}
              >
                Platform
              </label>
              <div className="flex flex-wrap gap-2">
                {PLATFORMS.map((p) => {
                  const sel = form.platform === p
                  return (
                    <button
                      key={p}
                      onClick={() => setForm((f) => ({ ...f, platform: p }))}
                      className="px-3 py-1.5 rounded-full text-xs transition-all duration-200"
                      style={{
                        fontFamily: 'var(--font-heading)',
                        background: sel ? 'rgba(124,58,237,0.2)' : 'rgba(244,244,245,0.04)',
                        border: `1px solid ${sel ? 'rgba(167,139,250,0.5)' : 'rgba(244,244,245,0.08)'}`,
                        color: sel ? '#a78bfa' : 'rgba(244,244,245,0.4)',
                      }}
                    >
                      {p}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Style */}
            <div>
              <label
                className="block text-[10px] tracking-[0.25em] uppercase mb-3"
                style={{ fontFamily: 'var(--font-heading)', color: 'rgba(167,139,250,0.6)' }}
              >
                Your Style
              </label>
              <div className="flex flex-wrap gap-2">
                {STYLES.map((s) => {
                  const sel = form.style === s
                  return (
                    <button
                      key={s}
                      onClick={() => setForm((f) => ({ ...f, style: s }))}
                      className="px-3 py-1.5 rounded-full text-xs transition-all duration-200"
                      style={{
                        fontFamily: 'var(--font-heading)',
                        background: sel ? 'rgba(124,58,237,0.2)' : 'rgba(244,244,245,0.04)',
                        border: `1px solid ${sel ? 'rgba(167,139,250,0.5)' : 'rgba(244,244,245,0.08)'}`,
                        color: sel ? '#a78bfa' : 'rgba(244,244,245,0.4)',
                      }}
                    >
                      {s}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Generate button */}
            <motion.button
              onClick={handleGenerate}
              disabled={!ready || loading}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-xl text-sm font-bold tracking-wide uppercase transition-all duration-300 mt-2"
              style={{
                fontFamily: 'var(--font-heading)',
                background: ready && !loading
                  ? 'linear-gradient(135deg, #7c3aed, #06b6d4)'
                  : 'rgba(244,244,245,0.04)',
                border: `1px solid ${ready && !loading ? 'transparent' : 'rgba(244,244,245,0.06)'}`,
                color: ready && !loading ? '#fff' : 'rgba(244,244,245,0.2)',
                cursor: ready && !loading ? 'pointer' : 'not-allowed',
                boxShadow: ready && !loading ? '0 0 30px rgba(124,58,237,0.3)' : 'none',
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    className="inline-block w-4 h-4 rounded-full"
                    style={{ border: '2px solid rgba(167,139,250,0.3)', borderTopColor: '#a78bfa' }}
                  />
                  Generating concepts...
                </span>
              ) : 'Generate Concepts →'}
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
              <div className="flex items-center justify-center gap-3 mb-6">
                <p
                  className="text-[10px] tracking-[0.3em] uppercase"
                  style={{ fontFamily: 'var(--font-heading)', color: 'rgba(167,139,250,0.5)' }}
                >
                  3 concepts · tap to copy
                </p>
                {usedFallback && (
                  <span
                    className="text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full"
                    style={{
                      background: 'rgba(249,115,22,0.08)',
                      color: 'rgba(249,115,22,0.6)',
                      border: '1px solid rgba(249,115,22,0.15)',
                    }}
                  >
                    backup model
                  </span>
                )}
              </div>
              {results.map((concept, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => handleCopy(`Hook: ${concept.hook}\n\nFormat: ${concept.format}\n\nAngle: ${concept.angle}\n\nCTA: ${concept.cta}`, idx)}
                  className="rounded-xl border p-6 cursor-pointer transition-all duration-300"
                  style={{
                    background: copied === idx ? 'rgba(124,58,237,0.08)' : 'rgba(17,17,22,0.8)',
                    borderColor: copied === idx ? 'rgba(167,139,250,0.4)' : 'rgba(124,58,237,0.15)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span
                      className="text-[9px] tracking-[0.3em] uppercase"
                      style={{ fontFamily: 'var(--font-heading)', color: 'rgba(167,139,250,0.6)' }}
                    >
                      Concept {idx + 1}
                    </span>
                    <span
                      className="text-[9px] tracking-[0.2em] uppercase transition-colors duration-200"
                      style={{
                        fontFamily: 'var(--font-heading)',
                        color: copied === idx ? '#a78bfa' : 'rgba(244,244,245,0.2)',
                      }}
                    >
                      {copied === idx ? 'Copied' : 'Copy'}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <span
                        className="text-[9px] tracking-[0.2em] uppercase block mb-1"
                        style={{ fontFamily: 'var(--font-heading)', color: 'rgba(244,244,245,0.25)' }}
                      >
                        Hook
                      </span>
                      <p
                        className="leading-relaxed"
                        style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'rgba(244,244,245,0.85)' }}
                      >
                        {concept.hook}
                      </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                      {[
                        { label: 'Format', value: concept.format },
                        { label: 'Angle', value: concept.angle },
                        { label: 'CTA', value: concept.cta },
                      ].map(({ label, value }) => (
                        <div
                          key={label}
                          className="rounded-lg p-3"
                          style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.1)' }}
                        >
                          <span
                            className="text-[8px] tracking-[0.2em] uppercase block mb-1"
                            style={{ fontFamily: 'var(--font-heading)', color: 'rgba(167,139,250,0.5)' }}
                          >
                            {label}
                          </span>
                          <p className="text-xs leading-relaxed" style={{ fontFamily: 'var(--font-body)', color: 'rgba(244,244,245,0.55)' }}>
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Start over */}
              <div className="text-center pt-4">
                <button
                  onClick={() => { setResults(null); setForm({ niche: '', platform: '', style: '' }) }}
                  className="text-[10px] tracking-[0.25em] uppercase transition-colors duration-200"
                  style={{ fontFamily: 'var(--font-heading)', color: 'rgba(244,244,245,0.25)' }}
                >
                  Start over
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        </motion.div>
        )}
        </AnimatePresence>

      </div>
    </section>
  )
}

function TabCard({ tab, isActive, onClick }) {
  const ref = useRef(null)

  function handleMouseMove(e) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const rotX = ((y - cy) / cy) * -8
    const rotY = ((x - cx) / cx) * 8
    el.style.transform = `perspective(500px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.03,1.03,1.03)`
  }

  function handleMouseLeave() {
    if (ref.current) {
      ref.current.style.transform = 'perspective(500px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
    }
  }

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="py-3 px-3 rounded-xl text-left tilt-card"
      style={{
        background: isActive ? `rgba(${tab.colorRgb},0.12)` : 'rgba(244,244,245,0.03)',
        border: `1px solid ${isActive ? tab.color + '40' : 'rgba(244,244,245,0.07)'}`,
        boxShadow: isActive ? `0 0 20px rgba(${tab.colorRgb},0.2), inset 0 1px 0 rgba(255,255,255,0.05)` : 'none',
      }}
    >
      <p
        className="text-xs font-semibold mb-0.5 truncate"
        style={{
          fontFamily: 'var(--font-heading)',
          color: isActive ? tab.color : 'rgba(244,244,245,0.4)',
          textShadow: isActive ? `0 0 12px ${tab.color}80` : 'none',
        }}
      >
        {tab.label}
      </p>
      <p
        className="text-[10px] truncate"
        style={{
          fontFamily: 'var(--font-body)',
          color: isActive ? tab.color + '80' : 'rgba(244,244,245,0.2)',
        }}
      >
        {tab.sub}
      </p>
    </button>
  )
}
