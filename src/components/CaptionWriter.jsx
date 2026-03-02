import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { llmFetch } from '../lib/llmFetch'

const PLATFORMS = ['Instagram', 'TikTok', 'X (Twitter)', 'LinkedIn', 'YouTube Shorts']
const TONES = ['Bold', 'Casual', 'Professional', 'Inspirational', 'Humorous']

export default function CaptionWriter() {
  const [form, setForm] = useState({ concept: '', platform: '', tone: '', includeCta: true })
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(null)
  const [usedFallback, setUsedFallback] = useState(false)

  const ready = form.concept.trim() && form.platform

  async function handleGenerate() {
    if (!ready || loading) return
    setLoading(true)
    setError(null)
    setResults(null)

    const charLimits = {
      Instagram: '2200 chars max, sweet spot 138–150 for feed posts',
      TikTok: '2200 chars max, but first 125 chars show before "more"',
      'X (Twitter)': '280 chars hard limit — tight, punchy, every word earns its place',
      LinkedIn: '3000 chars max, sweet spot 1300 for algorithm boost',
      'YouTube Shorts': '100 chars max, most viewers never read it — make the first line count',
    }

    const hashtagGuide = {
      Instagram: '5–10 targeted hashtags, mix niche + broad',
      TikTok: '3–5 hashtags only — avoid spam-looking stacks',
      'X (Twitter)': '1–2 hashtags max, or none — they tank reach',
      LinkedIn: '3–5 professional hashtags at the end',
      'YouTube Shorts': '1–3 hashtags, keep it clean',
    }

    const ctaStyles = {
      Instagram: 'Save this, Share with a creator friend, Drop a 🔥 if this helped',
      TikTok: 'Follow for more, Comment your [X], Stitch this',
      'X (Twitter)': 'RT if you agree, Follow for daily [topic], Reply with your take',
      LinkedIn: 'What do you think? Drop a comment, Repost to help a fellow creator',
      'YouTube Shorts': 'Subscribe for more, Comment your biggest takeaway, Watch next:',
    }

    const prompt = `You are an expert social media copywriter who writes captions that convert views into followers in 2026.

Write exactly 5 platform-optimized captions for this content concept on ${form.platform}:
"${form.concept}"

${form.tone ? `Tone: ${form.tone}` : ''}
${form.includeCta ? `Include a CTA in each caption. Best CTAs for ${form.platform}: ${ctaStyles[form.platform]}` : 'No CTA needed.'}

Platform rules for ${form.platform}:
- Character guidance: ${charLimits[form.platform]}
- Hashtag strategy: ${hashtagGuide[form.platform]}

Each caption must:
1. Open with the strongest possible first line (this shows before "more" on most platforms)
2. Match the ${form.tone || 'authentic'} tone throughout
3. Use line breaks strategically for readability
4. Include relevant emojis naturally (not spammy)
5. End with hashtags formatted correctly for the platform

Return ONLY valid JSON, no markdown, no explanation:
{
  "captions": [
    {
      "number": 1,
      "style": "one word describing the vibe e.g. Story-driven | Punchy | Educational | Conversational | Bold",
      "first_line": "the exact opening line — what shows before the fold",
      "full_caption": "the complete caption text including line breaks, emojis, CTA, and hashtags exactly as it should be posted",
      "char_count": 312,
      "why_it_works": "one punchy sentence on the strategy behind this caption"
    }
  ],
  "best_pick": 1,
  "posting_tip": "one specific tip for posting this content on ${form.platform} right now in 2026"
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

  function copyCaption(text, idx) {
    navigator.clipboard.writeText(text)
    setCopied(idx)
    setTimeout(() => setCopied(null), 2000)
  }

  function copyAll() {
    const all = results.captions.map((c, i) => `--- Caption ${i + 1} (${c.style}) ---\n${c.full_caption}`).join('\n\n')
    navigator.clipboard.writeText(all)
    setCopied('all')
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
          {/* Concept input */}
          <div>
            <label
              className="block text-[10px] tracking-[0.25em] uppercase text-cream/40 mb-3"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Your Content Concept
            </label>
            <textarea
              value={form.concept}
              onChange={(e) => setForm((f) => ({ ...f, concept: e.target.value }))}
              placeholder="e.g. How I doubled my engagement by posting at 3am — and the data behind it..."
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

          {/* Platform + Tone row */}
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
                Tone (optional)
              </label>
              <div className="flex flex-wrap gap-2">
                {TONES.map((t) => (
                  <button
                    key={t}
                    onClick={() => setForm((f) => ({ ...f, tone: f.tone === t ? '' : t }))}
                    className="px-3 py-1.5 rounded-full text-xs transition-all duration-200"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      background: form.tone === t ? 'rgba(201,168,76,0.15)' : 'rgba(240,235,226,0.04)',
                      border: `1px solid ${form.tone === t ? 'rgba(201,168,76,0.5)' : 'rgba(240,235,226,0.08)'}`,
                      color: form.tone === t ? 'var(--color-gold)' : 'rgba(240,235,226,0.4)',
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* CTA toggle */}
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
              Include call to action
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
                Writing captions...
              </span>
            ) : 'Generate Captions'}
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

            {/* Posting tip */}
            {results.posting_tip && (
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
                  {form.platform} Tip
                </p>
                <p
                  className="text-cream/40 text-xs leading-relaxed"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {results.posting_tip}
                </p>
              </motion.div>
            )}

            {/* Caption cards */}
            <div className="space-y-4 mb-4">
              {results.captions.map((caption, idx) => {
                const isBest = results.best_pick === caption.number
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.07 }}
                    className="rounded-xl border p-5"
                    style={{
                      background: isBest ? 'rgba(201,168,76,0.04)' : 'rgba(20,20,20,0.6)',
                      borderColor: copied === idx
                        ? 'rgba(201,168,76,0.4)'
                        : isBest
                        ? 'rgba(201,168,76,0.18)'
                        : 'rgba(240,235,226,0.06)',
                    }}
                  >
                    {/* Header row */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        {isBest && (
                          <span className="text-sm">🏆</span>
                        )}
                        <span
                          className="text-[9px] tracking-[0.2em] uppercase"
                          style={{
                            fontFamily: 'var(--font-heading)',
                            color: isBest ? 'rgba(201,168,76,0.8)' : 'rgba(240,235,226,0.3)',
                          }}
                        >
                          {caption.style}
                        </span>
                        {isBest && (
                          <span
                            className="text-[8px] tracking-widest uppercase px-1.5 py-0.5 rounded-full"
                            style={{
                              fontFamily: 'var(--font-heading)',
                              background: 'rgba(201,168,76,0.12)',
                              color: 'rgba(201,168,76,0.7)',
                              border: '1px solid rgba(201,168,76,0.2)',
                            }}
                          >
                            Best Pick
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span
                          className="text-[9px] tracking-[0.15em] uppercase text-cream/20"
                          style={{ fontFamily: 'var(--font-heading)' }}
                        >
                          {caption.char_count} chars
                        </span>
                        <button
                          onClick={() => copyCaption(caption.full_caption, idx)}
                          className="text-[9px] tracking-[0.2em] uppercase transition-colors duration-200 px-2.5 py-1 rounded-lg"
                          style={{
                            fontFamily: 'var(--font-heading)',
                            background: copied === idx ? 'rgba(201,168,76,0.12)' : 'rgba(240,235,226,0.04)',
                            border: `1px solid ${copied === idx ? 'rgba(201,168,76,0.3)' : 'rgba(240,235,226,0.08)'}`,
                            color: copied === idx ? 'var(--color-gold)' : 'rgba(240,235,226,0.3)',
                          }}
                        >
                          {copied === idx ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                    </div>

                    {/* First line highlight */}
                    <p
                      className="text-cream/70 text-xs mb-1"
                      style={{ fontFamily: 'var(--font-heading)', letterSpacing: '0.02em' }}
                    >
                      ↳ <span className="text-cream/90 font-medium">{caption.first_line}</span>
                    </p>

                    {/* Full caption */}
                    <p
                      className="text-cream/50 leading-relaxed text-xs mb-3 whitespace-pre-line"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {caption.full_caption}
                    </p>

                    {/* Why it works */}
                    <p
                      className="text-cream/25 text-xs"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {caption.why_it_works}
                    </p>
                  </motion.div>
                )
              })}
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-center gap-4 flex-wrap pt-2">
              <button
                onClick={copyAll}
                className="px-5 py-2.5 rounded-xl text-xs tracking-widest uppercase transition-all duration-200"
                style={{
                  fontFamily: 'var(--font-heading)',
                  background: 'rgba(201,168,76,0.1)',
                  border: '1px solid rgba(201,168,76,0.3)',
                  color: copied === 'all' ? 'var(--color-gold)' : 'rgba(201,168,76,0.6)',
                }}
              >
                {copied === 'all' ? 'Copied!' : 'Copy All 5'}
              </button>
              <button
                onClick={() => { setResults(null); setForm({ concept: '', platform: '', tone: '', includeCta: true }) }}
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
