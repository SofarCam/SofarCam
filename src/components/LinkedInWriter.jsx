import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { llmFetch } from '../lib/llmFetch'

const GOALS = ['Attract Clients', 'Build Authority', 'Get Hired', 'Grow Network', 'Drive Traffic']
const INDUSTRIES = ['Photography', 'Tech', 'Marketing', 'Design', 'Consulting', 'Finance', 'Healthcare', 'Real Estate', 'Education', 'Other']
const FORMATS = ['Personal Story', 'Lessons Learned', 'Hot Take', 'How-To', 'Career Milestone']

export default function LinkedInWriter() {
  const [form, setForm] = useState({ topic: '', goal: '', industry: '', format: '' })
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(null)
  const [usedFallback, setUsedFallback] = useState(false)
  const [activePost, setActivePost] = useState(0)

  const ready = form.topic.trim() && form.goal && form.industry

  async function handleGenerate() {
    if (!ready || loading) return
    setLoading(true)
    setError(null)
    setResults(null)
    setActivePost(0)

    const prompt = `You are a LinkedIn content strategist who understands what builds authority and attracts clients in 2026.

Generate exactly 3 high-performing LinkedIn posts for:
- Topic: "${form.topic}"
- Goal: ${form.goal}
- Industry: ${form.industry}
- Format preference: ${form.format || 'Any'}

LinkedIn post rules:
- First line is everything — make it impossible to skip past "...see more"
- Short paragraphs (1-2 lines max). White space = readability = engagement.
- End with a question or clear CTA that drives comments
- No hashtag spam — max 3 relevant hashtags at the end
- Tone: professional but human. Not corporate. Not cringe. Real.

Scoring criteria (auto-score each post 0-100):
- Hook strength (35pts): Does the first line stop the scroll?
- Value delivery (35pts): Does it teach, inspire, or provoke thought?
- Engagement trigger (20pts): Does it make people want to comment?
- Brevity (10pts): Tight and punchy, no fluff?

Return ONLY valid JSON, no markdown, no explanation:
{
  "posts": [
    {
      "rank": 1,
      "score": 94,
      "hook": "The first line only",
      "full_post": "The complete post text including hook, body, CTA, and hashtags",
      "why_it_works": "One punchy sentence",
      "best_for": "e.g. morning post, thought leadership, story day"
    }
  ],
  "profile_tip": "One specific tip to make their LinkedIn profile stronger for their goal"
}`

    try {
      const { text, usedFallback: fb } = await llmFetch(prompt, 2000)
      setUsedFallback(fb)
      const parsed = JSON.parse(text)
      setResults(parsed)
    } catch {
      setError('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  function copyPost(text, idx) {
    navigator.clipboard.writeText(text)
    setCopied(idx)
    setTimeout(() => setCopied(null), 2000)
  }

  const RANK_MEDALS = ['🥇', '🥈', '🥉']
  // LinkedIn blue-ish accent color
  const accent = '#60a5fa'
  const accentRgb = '96,165,250'

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
          borderColor: `rgba(${accentRgb},0.12)`,
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="grid gap-5">
          {/* Topic */}
          <div>
            <label
              className="block text-[10px] tracking-[0.25em] uppercase mb-3"
              style={{ fontFamily: 'var(--font-heading)', color: `rgba(${accentRgb},0.5)` }}
            >
              What do you want to post about?
            </label>
            <textarea
              value={form.topic}
              onChange={(e) => setForm((f) => ({ ...f, topic: e.target.value }))}
              placeholder="e.g. How I landed 3 clients from one LinkedIn post, a lesson I learned the hard way, my take on AI in photography..."
              rows={3}
              className="w-full rounded-xl px-4 py-3 text-sm resize-none outline-none transition-all duration-200"
              style={{
                fontFamily: 'var(--font-body)',
                background: 'rgba(240,235,226,0.04)',
                border: '1px solid rgba(240,235,226,0.08)',
                color: 'rgba(240,235,226,0.8)',
                fontSize: '0.88rem',
              }}
              onFocus={(e) => (e.target.style.borderColor = `rgba(${accentRgb},0.35)`)}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(240,235,226,0.08)')}
            />
          </div>

          {/* Goal + Industry row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                className="block text-[10px] tracking-[0.25em] uppercase mb-3"
                style={{ fontFamily: 'var(--font-heading)', color: `rgba(${accentRgb},0.5)` }}
              >
                Goal
              </label>
              <div className="flex flex-wrap gap-2">
                {GOALS.map((g) => (
                  <button
                    key={g}
                    onClick={() => setForm((f) => ({ ...f, goal: g }))}
                    className="px-3 py-1.5 rounded-full text-xs transition-all duration-200"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      background: form.goal === g ? `rgba(${accentRgb},0.15)` : 'rgba(240,235,226,0.04)',
                      border: `1px solid ${form.goal === g ? `rgba(${accentRgb},0.5)` : 'rgba(240,235,226,0.08)'}`,
                      color: form.goal === g ? accent : 'rgba(240,235,226,0.4)',
                    }}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                className="block text-[10px] tracking-[0.25em] uppercase mb-3"
                style={{ fontFamily: 'var(--font-heading)', color: `rgba(${accentRgb},0.5)` }}
              >
                Industry
              </label>
              <div className="flex flex-wrap gap-2">
                {INDUSTRIES.map((i) => (
                  <button
                    key={i}
                    onClick={() => setForm((f) => ({ ...f, industry: i }))}
                    className="px-3 py-1.5 rounded-full text-xs transition-all duration-200"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      background: form.industry === i ? `rgba(${accentRgb},0.15)` : 'rgba(240,235,226,0.04)',
                      border: `1px solid ${form.industry === i ? `rgba(${accentRgb},0.5)` : 'rgba(240,235,226,0.08)'}`,
                      color: form.industry === i ? accent : 'rgba(240,235,226,0.4)',
                    }}
                  >
                    {i}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Format (optional) */}
          <div>
            <label
              className="block text-[10px] tracking-[0.25em] uppercase mb-3"
              style={{ fontFamily: 'var(--font-heading)', color: `rgba(${accentRgb},0.5)` }}
            >
              Format (optional)
            </label>
            <div className="flex flex-wrap gap-2">
              {FORMATS.map((f) => (
                <button
                  key={f}
                  onClick={() => setForm((prev) => ({ ...prev, format: prev.format === f ? '' : f }))}
                  className="px-3 py-1.5 rounded-full text-xs transition-all duration-200"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    background: form.format === f ? `rgba(${accentRgb},0.15)` : 'rgba(240,235,226,0.04)',
                    border: `1px solid ${form.format === f ? `rgba(${accentRgb},0.5)` : 'rgba(240,235,226,0.08)'}`,
                    color: form.format === f ? accent : 'rgba(240,235,226,0.4)',
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Generate button */}
          <motion.button
            onClick={handleGenerate}
            disabled={!ready || loading}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 rounded-xl text-sm font-medium tracking-widest uppercase transition-all duration-300"
            style={{
              fontFamily: 'var(--font-heading)',
              background: ready && !loading ? `rgba(${accentRgb},0.12)` : 'rgba(240,235,226,0.03)',
              border: `1px solid ${ready && !loading ? `rgba(${accentRgb},0.4)` : 'rgba(240,235,226,0.06)'}`,
              color: ready && !loading ? accent : 'rgba(240,235,226,0.2)',
              cursor: ready && !loading ? 'pointer' : 'not-allowed',
            }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  className="inline-block w-3.5 h-3.5 rounded-full"
                  style={{ border: `1.5px solid rgba(${accentRgb},0.3)`, borderTopColor: accent }}
                />
                Writing posts...
              </span>
            ) : 'Generate LinkedIn Posts'}
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
            {/* Fallback badge */}
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

            {/* Profile tip */}
            {results.profile_tip && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="rounded-xl border p-4 mb-5"
                style={{
                  background: `rgba(${accentRgb},0.04)`,
                  borderColor: `rgba(${accentRgb},0.12)`,
                }}
              >
                <p
                  className="text-[9px] tracking-[0.25em] uppercase mb-1"
                  style={{ fontFamily: 'var(--font-heading)', color: `rgba(${accentRgb},0.5)` }}
                >
                  Profile Tip
                </p>
                <p
                  className="text-cream/40 text-xs leading-relaxed"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {results.profile_tip}
                </p>
              </motion.div>
            )}

            {/* Post selector tabs */}
            <div className="flex gap-2 mb-4">
              {results.posts.map((post, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePost(idx)}
                  className="flex-1 py-2.5 rounded-xl text-xs transition-all duration-200"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    background: activePost === idx ? `rgba(${accentRgb},0.12)` : 'rgba(240,235,226,0.03)',
                    border: `1px solid ${activePost === idx ? `rgba(${accentRgb},0.4)` : 'rgba(240,235,226,0.06)'}`,
                    color: activePost === idx ? accent : 'rgba(240,235,226,0.3)',
                  }}
                >
                  {RANK_MEDALS[idx]} {post.score}/100
                </button>
              ))}
            </div>

            {/* Active post */}
            {results.posts[activePost] && (
              <motion.div
                key={activePost}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-xl border p-6 mb-4"
                style={{
                  background: 'rgba(20,20,20,0.6)',
                  borderColor: `rgba(${accentRgb},0.1)`,
                }}
              >
                {/* Meta row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{RANK_MEDALS[activePost]}</span>
                    <span
                      className="text-[9px] tracking-[0.2em] uppercase"
                      style={{ fontFamily: 'var(--font-heading)', color: `rgba(${accentRgb},0.5)` }}
                    >
                      {results.posts[activePost].score}/100 · {results.posts[activePost].best_for}
                    </span>
                  </div>
                  <button
                    onClick={() => copyPost(results.posts[activePost].full_post, activePost)}
                    className="text-[9px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-lg transition-all duration-200"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      background: copied === activePost ? `rgba(${accentRgb},0.15)` : 'rgba(240,235,226,0.04)',
                      border: `1px solid ${copied === activePost ? `rgba(${accentRgb},0.4)` : 'rgba(240,235,226,0.08)'}`,
                      color: copied === activePost ? accent : 'rgba(240,235,226,0.3)',
                    }}
                  >
                    {copied === activePost ? 'Copied!' : 'Copy Post'}
                  </button>
                </div>

                {/* Full post text */}
                <div
                  className="rounded-lg p-4 mb-3 whitespace-pre-wrap text-sm leading-relaxed"
                  style={{
                    fontFamily: 'var(--font-body)',
                    background: 'rgba(240,235,226,0.03)',
                    border: '1px solid rgba(240,235,226,0.05)',
                    color: 'rgba(240,235,226,0.75)',
                    fontSize: '0.88rem',
                  }}
                >
                  {results.posts[activePost].full_post}
                </div>

                {/* Why it works */}
                <p
                  className="text-[10px] leading-relaxed"
                  style={{ fontFamily: 'var(--font-body)', color: 'rgba(240,235,226,0.25)' }}
                >
                  ✦ {results.posts[activePost].why_it_works}
                </p>
              </motion.div>
            )}

            {/* Start over */}
            <div className="flex justify-center pt-2">
              <button
                onClick={() => { setResults(null); setForm({ topic: '', goal: '', industry: '', format: '' }); setActivePost(0) }}
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
