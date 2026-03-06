import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { llmFetch } from '../lib/llmFetch'
import { getActiveConcept, clearActiveConcept, saveSession, loadSession } from '../lib/sessionStore'

const PLATFORMS = ['Instagram', 'TikTok', 'YouTube', 'YouTube Shorts', 'Pinterest', 'Etsy', 'X (Twitter)', 'LinkedIn']
const EMOTIONS = ['Curious', 'Aspirational', 'Urgent', 'Controversial', 'Relatable', 'Engagement Bait']

const RANK_MEDALS = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣']

function ViralScore({ score }) {
  const pct = Math.min(100, Math.max(0, score || 0))
  const label = pct >= 85 ? '🔥 Viral' : pct >= 65 ? '⚡ Strong' : '💤 Weak'
  const barColor = pct >= 85
    ? 'linear-gradient(90deg, #7c3aed, #06b6d4)'
    : pct >= 65
    ? 'linear-gradient(90deg, #ca8a04, #f59e0b)'
    : 'linear-gradient(90deg, #374151, #4b5563)'
  const labelColor = pct >= 85 ? '#a78bfa' : pct >= 65 ? '#f59e0b' : 'rgba(244,244,245,0.3)'

  return (
    <div className="flex items-center gap-3 mt-2">
      <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(244,244,245,0.06)' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ background: barColor }}
        />
      </div>
      <span
        className="text-[9px] tracking-[0.15em] uppercase shrink-0"
        style={{ fontFamily: 'var(--font-heading)', color: labelColor, minWidth: '3.5rem', textAlign: 'right' }}
      >
        {label}
      </span>
    </div>
  )
}

export default function HookWriter() {
  const [form, setForm] = useState({ idea: '', platform: '', emotion: '', includeCta: true })
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(null)
  const [usedFallback, setUsedFallback] = useState(false)
  const [fromConcept, setFromConcept] = useState(null)

  // On mount: check for active concept (chained from Concept Generator) + restore last session
  useEffect(() => {
    const concept = getActiveConcept()
    if (concept) {
      const idea = concept.hook
        ? `${concept.hook}${concept.angle ? ` — ${concept.angle}` : ''}`
        : ''
      setForm(f => ({
        ...f,
        idea,
        platform: concept.platform || f.platform,
      }))
      setFromConcept(concept)
      clearActiveConcept()
    } else {
      // Restore last hook session
      const savedForm = loadSession('hooks_form')
      const savedResults = loadSession('hooks_results')
      if (savedForm) setForm(savedForm)
      if (savedResults) setResults(savedResults)
    }
  }, [])

  const ready = form.idea.trim() && form.platform

  async function handleGenerate() {
    if (!ready || loading) return
    setLoading(true)
    setError(null)
    setResults(null)

    const viralPatterns = {
      Instagram: [
        '"I used to [bad thing], then I discovered [surprising thing]"',
        '"Stop doing [common thing]. Do this instead."',
        '"POV: You\'re [relatable moment]"',
        '"Here\'s what [group] don\'t understand about [topic]"',
      ],
      TikTok: [
        '"3 things I wish I knew before [thing]"',
        '"This works 99% of the time"',
        '"Unpopular opinion: [hot take]"',
        '"How I\'d [goal] if I [constraint]"',
      ],
      'X (Twitter)': [
        '"Thread: [number] lessons from [thing]"',
        '"Here\'s the truth about [topic] (no one wants to tell you)"',
        '"I spent [time/amount] on [thing]. Here\'s what I learned:"',
        '"The biggest lie about [topic]: [statement]"',
      ],
      LinkedIn: [
        '"I made [mistake]. Here\'s what I wish I\'d known:"',
        '"What [impressive person] taught me about [topic]"',
        '"The uncomfortable truth about [industry topic]"',
      ],
      YouTube: [
        '"I tried [thing] for [time period]. Here\'s what happened."',
        '"Why everyone is wrong about [topic]"',
        '"The [adjective] truth about [topic] nobody talks about"',
      ],
    }

    const engagementBaitPatterns = [
      '"Comment [keyword] and I\'ll send you [valuable thing]"',
      '"Like this if you want [outcome] — I\'ll share the full guide with everyone who does"',
      '"Drop a 🔥 if you want me to break this down"',
      '"Save this before [urgency reason]"',
      '"Tag someone who needs to see this"',
    ]

    const patterns = viralPatterns[form.platform] || viralPatterns['Instagram']
    const isEngagementBait = form.emotion === 'Engagement Bait'

    const prompt = `You are a viral hook specialist who deeply understands what stops the scroll on social media in 2026.

Generate exactly 10 scroll-stopping hooks for this content idea on ${form.platform}:
"${form.idea}"

${form.emotion && !isEngagementBait ? `Emotional angle: ${form.emotion}` : ''}
${isEngagementBait ? `ENGAGEMENT BAIT MODE: Every hook must drive a specific action (comment, like, save, tag). Use the "Comment X and I'll send Y" format, save-bait, tag-bait, or reply-bait patterns. The hook itself IS the CTA.` : ''}
${form.includeCta && !isEngagementBait ? 'Include a subtle CTA in at least 3 of the hooks.' : ''}

Proven viral patterns for ${form.platform}:
${isEngagementBait ? engagementBaitPatterns.join('\n') : patterns.join('\n')}

Scoring criteria (auto-score each hook out of 100):
- Pattern Match (40pts): Does it use a proven viral pattern for this platform?
- Curiosity Gap (30pts): Does it create information asymmetry — makes you NEED to read more?
- Specificity (20pts): Concrete numbers, details, not generic fluff?
- Length (10pts): Optimal character count for ${form.platform}?

Return ONLY valid JSON, no markdown, no explanation:
{
  "hooks": [
    {
      "rank": 1,
      "score": 97,
      "hook": "exact hook text here",
      "format": "question|statement|list|story|challenge",
      "emotion": "curious|aspirational|urgent|controversial|relatable",
      "why_it_works": "one punchy sentence explaining why this hooks",
      "char_count": 89
    }
  ],
  "best_overall": "the single best hook text",
  "platform_tips": "2-3 sentences of platform-specific posting tips for this content"
}`

    try {
      const { text, usedFallback: fb } = await llmFetch(prompt, 2000)
      setUsedFallback(fb)
      const parsed = JSON.parse(text)
      setResults(parsed)
      saveSession('hooks_results', parsed)
      saveSession('hooks_form', form)
    } catch {
      setError('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  function copyHook(text, idx) {
    navigator.clipboard.writeText(text)
    setCopied(idx)
    setTimeout(() => setCopied(null), 2000)
  }

  function copyAll() {
    const all = results.hooks.map((h, i) => `${i + 1}. ${h.hook}`).join('\n\n')
    navigator.clipboard.writeText(all)
    setCopied('all')
    setTimeout(() => setCopied(null), 2000)
  }

  function copyTop5() {
    const top5 = results.hooks.slice(0, 5).map((h, i) => `${i + 1}. ${h.hook}`).join('\n\n')
    navigator.clipboard.writeText(top5)
    setCopied('top5')
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div>
      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border p-8 mb-6"
        style={{
          background: 'rgba(20,20,20,0.8)',
          borderColor: 'rgba(240,235,226,0.07)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="grid gap-5">
          {/* Chained concept banner */}
          {fromConcept && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 px-4 py-3 rounded-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(6,182,212,0.06))',
                border: '1px solid rgba(124,58,237,0.25)',
              }}
            >
              <span className="text-base mt-0.5">⚡</span>
              <div>
                <p className="text-[9px] tracking-[0.25em] uppercase mb-1" style={{ fontFamily: 'var(--font-heading)', color: 'rgba(167,139,250,0.7)' }}>
                  Pre-filled from your concept
                </p>
                <p className="text-xs leading-relaxed" style={{ fontFamily: 'var(--font-body)', color: 'rgba(244,244,245,0.5)' }}>
                  {fromConcept.hook}
                </p>
              </div>
              <button
                onClick={() => { setFromConcept(null); setForm(f => ({ ...f, idea: '', platform: '' })) }}
                className="ml-auto text-[9px] tracking-wider uppercase shrink-0"
                style={{ fontFamily: 'var(--font-heading)', color: 'rgba(244,244,245,0.2)' }}
              >
                Clear
              </button>
            </motion.div>
          )}

          {/* Content idea */}
          <div>
            <label
              className="block text-[10px] tracking-[0.25em] uppercase text-cream/40 mb-3"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Your Content Idea
            </label>
            <textarea
              value={form.idea}
              onChange={(e) => setForm((f) => ({ ...f, idea: e.target.value }))}
              placeholder="e.g. How I grew my Instagram from 0 to 10k in 90 days using AI tools..."
              rows={3}
              className="w-full rounded-xl px-4 py-3 text-sm resize-none outline-none transition-all duration-200"
              style={{
                fontFamily: 'var(--font-body)',
                background: 'rgba(240,235,226,0.04)',
                border: '1px solid rgba(240,235,226,0.08)',
                color: 'rgba(240,235,226,0.8)',
                fontSize: '0.88rem',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'rgba(201,168,76,0.35)')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(240,235,226,0.08)')}
            />
          </div>

          {/* Platform + Emotion row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

            <div>
              <label
                className="block text-[10px] tracking-[0.25em] uppercase text-cream/40 mb-3"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Emotion (optional)
              </label>
              <div className="flex flex-wrap gap-2">
                {EMOTIONS.map((e) => (
                  <button
                    key={e}
                    onClick={() => setForm((f) => ({ ...f, emotion: f.emotion === e ? '' : e }))}
                    className="px-3 py-1.5 rounded-full text-xs transition-all duration-200"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      background: form.emotion === e ? 'rgba(201,168,76,0.15)' : 'rgba(240,235,226,0.04)',
                      border: `1px solid ${form.emotion === e ? 'rgba(201,168,76,0.5)' : 'rgba(240,235,226,0.08)'}`,
                      color: form.emotion === e ? 'var(--color-gold)' : 'rgba(240,235,226,0.4)',
                    }}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Include CTA toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setForm((f) => ({ ...f, includeCta: !f.includeCta }))}
              className="w-10 h-5 rounded-full transition-all duration-300 relative"
              style={{
                background: form.includeCta ? 'rgba(201,168,76,0.4)' : 'rgba(240,235,226,0.08)',
                border: `1px solid ${form.includeCta ? 'rgba(201,168,76,0.6)' : 'rgba(240,235,226,0.1)'}`,
              }}
            >
              <motion.div
                animate={{ x: form.includeCta ? 20 : 2 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="absolute top-0.5 w-3.5 h-3.5 rounded-full"
                style={{ background: form.includeCta ? 'var(--color-gold)' : 'rgba(240,235,226,0.3)' }}
              />
            </button>
            <span
              className="text-xs text-cream/35"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Include CTA in hooks
            </span>
          </div>

          {/* Generate button */}
          <motion.button
            onClick={handleGenerate}
            disabled={!ready || loading}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 rounded-xl text-sm font-medium tracking-widest uppercase transition-all duration-300"
            style={{
              fontFamily: 'var(--font-heading)',
              background: ready && !loading ? 'rgba(201,168,76,0.12)' : 'rgba(240,235,226,0.03)',
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
                Writing hooks...
              </span>
            ) : 'Generate Hooks'}
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
          >
            {/* Fallback model badge */}
            {usedFallback && (
              <div className="flex justify-center mb-4">
                <span
                  className="text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full"
                  style={{
                    background: 'rgba(255,165,0,0.08)',
                    color: 'rgba(255,165,0,0.5)',
                    border: '1px solid rgba(255,165,0,0.12)',
                  }}
                >
                  Using backup model
                </span>
              </div>
            )}

            {/* Platform tips */}
            {results.platform_tips && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="rounded-xl border p-4 mb-4"
                style={{
                  background: 'rgba(201,168,76,0.04)',
                  borderColor: 'rgba(201,168,76,0.12)',
                }}
              >
                <p
                  className="text-[9px] tracking-[0.25em] uppercase text-gold/50 mb-1"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {form.platform} Tips
                </p>
                <p
                  className="text-cream/40 text-xs leading-relaxed"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {results.platform_tips}
                </p>
              </motion.div>
            )}

            {/* Hook cards */}
            <div className="space-y-3 mb-4">
              {results.hooks.map((hook, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => copyHook(hook.hook, idx)}
                  className="rounded-xl border p-5 cursor-pointer transition-all duration-200"
                  style={{
                    background: 'rgba(20,20,20,0.6)',
                    borderColor: copied === idx ? 'rgba(201,168,76,0.4)' : 'rgba(240,235,226,0.06)',
                  }}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{RANK_MEDALS[idx] || `${idx + 1}.`}</span>
                      <span
                        className="text-[9px] tracking-[0.2em] uppercase"
                        style={{ fontFamily: 'var(--font-heading)', color: 'rgba(201,168,76,0.5)' }}
                      >
                        {hook.score}/100
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className="text-[9px] tracking-[0.15em] uppercase text-cream/20"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {hook.char_count} chars
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
                  </div>

                  <p
                    className="text-cream/80 leading-relaxed mb-2"
                    style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem' }}
                  >
                    {hook.hook}
                  </p>

                  <ViralScore score={hook.score} />

                  <div className="flex items-center gap-3 flex-wrap mt-2">
                    <span
                      className="text-[8px] tracking-[0.15em] uppercase px-2 py-0.5 rounded-full text-cream/25"
                      style={{
                        fontFamily: 'var(--font-heading)',
                        border: '1px solid rgba(240,235,226,0.06)',
                      }}
                    >
                      {hook.format}
                    </span>
                    <span
                      className="text-[8px] tracking-[0.15em] uppercase px-2 py-0.5 rounded-full text-cream/25"
                      style={{
                        fontFamily: 'var(--font-heading)',
                        border: '1px solid rgba(240,235,226,0.06)',
                      }}
                    >
                      {hook.emotion}
                    </span>
                    <span
                      className="text-cream/25 text-xs"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {hook.why_it_works}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-center gap-4 flex-wrap pt-2">
              <button
                onClick={copyTop5}
                className="px-5 py-2.5 rounded-xl text-xs tracking-widest uppercase transition-all duration-200"
                style={{
                  fontFamily: 'var(--font-heading)',
                  background: 'rgba(201,168,76,0.1)',
                  border: '1px solid rgba(201,168,76,0.3)',
                  color: copied === 'top5' ? 'var(--color-gold)' : 'rgba(201,168,76,0.6)',
                }}
              >
                {copied === 'top5' ? 'Copied!' : 'Copy Top 5'}
              </button>
              <button
                onClick={copyAll}
                className="px-5 py-2.5 rounded-xl text-xs tracking-widest uppercase transition-all duration-200"
                style={{
                  fontFamily: 'var(--font-heading)',
                  background: 'rgba(240,235,226,0.03)',
                  border: '1px solid rgba(240,235,226,0.08)',
                  color: copied === 'all' ? 'var(--color-gold)' : 'rgba(240,235,226,0.3)',
                }}
              >
                {copied === 'all' ? 'Copied!' : 'Copy All 10'}
              </button>
              <button
                onClick={() => {
                  setResults(null)
                  setFromConcept(null)
                  setForm({ idea: '', platform: '', emotion: '', includeCta: true })
                  saveSession('hooks_results', null)
                  saveSession('hooks_form', null)
                }}
                className="text-[10px] tracking-[0.2em] uppercase text-cream/20 hover:text-cream/40 transition-colors duration-200"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Start over
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
