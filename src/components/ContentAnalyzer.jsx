import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { llmFetch } from '../lib/llmFetch'

// Color theme for the analyzer tab
const COLOR = '#fb923c'
const COLOR_RGB = '251,146,60'

// Platform icons (text-based, no extra deps)
const PLATFORM_ICONS = {
  youtube: '▶',
  twitter: '✕',
  instagram: '◈',
}

const PLATFORM_LABELS = {
  youtube: 'YouTube',
  twitter: 'X / Twitter',
  instagram: 'Instagram',
}

export default function ContentAnalyzer() {
  const [url, setUrl] = useState('')
  const [manualText, setManualText] = useState('')
  const [fetching, setFetching] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [contentData, setContentData] = useState(null)
  const [analysis, setAnalysis] = useState(null)
  const [fetchError, setFetchError] = useState(null)
  const [copied, setCopied] = useState(null)
  const [step, setStep] = useState('input') // 'input' | 'preview' | 'results'

  function reset() {
    setUrl('')
    setManualText('')
    setFetching(false)
    setAnalyzing(false)
    setContentData(null)
    setAnalysis(null)
    setFetchError(null)
    setCopied(null)
    setStep('input')
  }

  async function handleFetch() {
    if (!url.trim() || fetching) return
    setFetching(true)
    setFetchError(null)
    setContentData(null)
    setAnalysis(null)

    try {
      const res = await fetch('/api/fetch-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      })
      const data = await res.json()

      if (!res.ok) {
        setFetchError(data.error || 'Failed to fetch content')
        return
      }

      setContentData(data)
      setStep('preview')
    } catch {
      setFetchError('Network error. Check your connection and try again.')
    } finally {
      setFetching(false)
    }
  }

  async function handleAnalyze() {
    if (analyzing) return
    setAnalyzing(true)
    setAnalysis(null)

    // Build context string from fetched data or manual input
    let context = ''
    if (contentData) {
      if (contentData.platform === 'youtube') {
        context = `Platform: YouTube\nTitle: ${contentData.title}\nCreator: ${contentData.author}\nURL: ${contentData.watchUrl}`
      } else if (contentData.platform === 'twitter') {
        context = `Platform: X/Twitter\nAuthor: ${contentData.author} (@${contentData.handle})\nTweet: ${contentData.text}\nLikes: ${contentData.likes?.toLocaleString() || 0} | Retweets: ${contentData.retweets?.toLocaleString() || 0} | Views: ${contentData.views?.toLocaleString() || 0}`
      } else if (contentData.platform === 'instagram') {
        context = `Platform: Instagram\nURL: ${contentData.url}\nCaption/Description: ${manualText || '(none provided)'}`
      }
    } else if (manualText) {
      context = `Content: ${manualText}`
    }

    const prompt = `You are a viral content strategist and social media analyst. Analyze this piece of content and give a sharp, honest breakdown that helps a creator understand what makes it work (or not work) and how to replicate it.

CONTENT TO ANALYZE:
${context}

Return ONLY valid JSON, no markdown, no explanation:
{
  "verdict": "One punchy sentence — does this content work and why?",
  "score": 7,
  "scoreReason": "1-2 sentences explaining the score (1-10)",
  "strengths": [
    "Specific strength #1",
    "Specific strength #2",
    "Specific strength #3"
  ],
  "weaknesses": [
    "Specific weakness or missed opportunity #1",
    "Specific weakness or missed opportunity #2"
  ],
  "hook": "The strongest possible opening hook for a remake of this content",
  "remakeAngles": [
    {
      "angle": "Angle name",
      "description": "How to remake this with a fresh twist that could outperform the original"
    },
    {
      "angle": "Angle name",
      "description": "Another approach, different format or platform"
    }
  ],
  "bestPlatforms": ["Platform1", "Platform2"],
  "viralTrigger": "The core psychological reason this type of content spreads (or why it doesn't)"
}`

    try {
      const { text } = await llmFetch(prompt, 1200)
      const parsed = JSON.parse(text)
      setAnalysis(parsed)
      setStep('results')
    } catch {
      setFetchError('Analysis failed. Try again.')
    } finally {
      setAnalyzing(false)
    }
  }

  function handleCopy(text, key) {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div>
      <AnimatePresence mode="wait">

        {/* ── Step 1: URL Input ── */}
        {step === 'input' && (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <div
              className="rounded-2xl border p-8"
              style={{
                background: 'rgba(17,17,22,0.9)',
                borderColor: `rgba(${COLOR_RGB},0.15)`,
                backdropFilter: 'blur(12px)',
              }}
            >
              <p
                className="text-[10px] tracking-[0.25em] uppercase mb-6"
                style={{ fontFamily: 'var(--font-heading)', color: `rgba(${COLOR_RGB},0.6)` }}
              >
                Paste a URL to analyze
              </p>

              {/* URL input */}
              <div className="relative mb-3">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleFetch()}
                  placeholder="https://youtube.com/watch?v=... or x.com/..."
                  className="w-full rounded-xl px-4 py-3.5 text-sm outline-none transition-all duration-200"
                  style={{
                    fontFamily: 'var(--font-body)',
                    background: 'rgba(244,244,245,0.04)',
                    border: `1px solid rgba(${COLOR_RGB},0.15)`,
                    color: '#f4f4f5',
                    caretColor: COLOR,
                  }}
                />
              </div>

              {/* Platform badges */}
              <div className="flex items-center gap-3 mb-6">
                {[
                  { icon: '▶', label: 'YouTube', color: '#ef4444' },
                  { icon: '✕', label: 'X / Twitter', color: '#f4f4f5' },
                  { icon: '◈', label: 'Instagram*', color: '#ec4899' },
                ].map(({ icon, label, color }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5 text-[10px]"
                    style={{ fontFamily: 'var(--font-body)', color: 'rgba(244,244,245,0.3)' }}
                  >
                    <span style={{ color }}>{icon}</span>
                    {label}
                  </span>
                ))}
              </div>

              {/* Error */}
              <AnimatePresence>
                {fetchError && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs mb-4 px-3 py-2 rounded-lg"
                    style={{
                      fontFamily: 'var(--font-body)',
                      color: 'rgba(255,100,100,0.8)',
                      background: 'rgba(255,100,100,0.05)',
                      border: '1px solid rgba(255,100,100,0.1)',
                    }}
                  >
                    {fetchError}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Fetch button */}
              <motion.button
                onClick={handleFetch}
                disabled={!url.trim() || fetching}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl text-sm font-bold tracking-wide uppercase transition-all duration-300"
                style={{
                  fontFamily: 'var(--font-heading)',
                  background:
                    url.trim() && !fetching
                      ? `linear-gradient(135deg, ${COLOR}, #ec4899)`
                      : 'rgba(244,244,245,0.04)',
                  border: `1px solid ${url.trim() && !fetching ? 'transparent' : 'rgba(244,244,245,0.06)'}`,
                  color: url.trim() && !fetching ? '#fff' : 'rgba(244,244,245,0.2)',
                  cursor: url.trim() && !fetching ? 'pointer' : 'not-allowed',
                  boxShadow: url.trim() && !fetching ? `0 0 30px rgba(${COLOR_RGB},0.25)` : 'none',
                }}
              >
                {fetching ? (
                  <span className="flex items-center justify-center gap-3">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      className="inline-block w-4 h-4 rounded-full"
                      style={{ border: `2px solid rgba(${COLOR_RGB},0.3)`, borderTopColor: COLOR }}
                    />
                    Fetching content...
                  </span>
                ) : (
                  'Fetch & Analyze →'
                )}
              </motion.button>

              <p
                className="text-center text-[10px] mt-4"
                style={{ fontFamily: 'var(--font-body)', color: 'rgba(244,244,245,0.15)' }}
              >
                *Instagram requires manual caption paste after fetch
              </p>
            </div>
          </motion.div>
        )}

        {/* ── Step 2: Preview fetched content ── */}
        {step === 'preview' && contentData && (
          <motion.div
            key="preview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            {/* Content preview card */}
            <div
              className="rounded-2xl border p-6"
              style={{
                background: 'rgba(17,17,22,0.9)',
                borderColor: `rgba(${COLOR_RGB},0.15)`,
                backdropFilter: 'blur(12px)',
              }}
            >
              {/* Platform badge */}
              <div className="flex items-center justify-between mb-5">
                <span
                  className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase px-3 py-1 rounded-full"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    color: COLOR,
                    background: `rgba(${COLOR_RGB},0.1)`,
                    border: `1px solid rgba(${COLOR_RGB},0.2)`,
                  }}
                >
                  {PLATFORM_ICONS[contentData.platform]} {PLATFORM_LABELS[contentData.platform]}
                </span>
                <button
                  onClick={reset}
                  className="text-[10px] tracking-[0.2em] uppercase transition-colors duration-200"
                  style={{ fontFamily: 'var(--font-heading)', color: 'rgba(244,244,245,0.25)' }}
                >
                  ← New URL
                </button>
              </div>

              {/* YouTube preview */}
              {contentData.platform === 'youtube' && (
                <div>
                  <img
                    src={contentData.thumbnail}
                    onError={(e) => { e.target.src = contentData.thumbnailFallback }}
                    alt={contentData.title}
                    className="w-full rounded-xl mb-4 object-cover"
                    style={{ maxHeight: '220px' }}
                  />
                  <p
                    className="font-semibold mb-1 leading-snug"
                    style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: '#f4f4f5' }}
                  >
                    {contentData.title}
                  </p>
                  <p
                    className="text-xs"
                    style={{ fontFamily: 'var(--font-body)', color: 'rgba(244,244,245,0.4)' }}
                  >
                    {contentData.author}
                  </p>
                </div>
              )}

              {/* Twitter preview */}
              {contentData.platform === 'twitter' && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    {contentData.avatar && (
                      <img
                        src={contentData.avatar}
                        alt={contentData.author}
                        className="w-10 h-10 rounded-full"
                        style={{ border: '1px solid rgba(244,244,245,0.1)' }}
                      />
                    )}
                    <div>
                      <p
                        className="font-semibold text-sm"
                        style={{ fontFamily: 'var(--font-heading)', color: '#f4f4f5' }}
                      >
                        {contentData.author}
                      </p>
                      <p
                        className="text-xs"
                        style={{ fontFamily: 'var(--font-body)', color: 'rgba(244,244,245,0.35)' }}
                      >
                        @{contentData.handle}
                      </p>
                    </div>
                  </div>
                  <p
                    className="text-sm leading-relaxed mb-4"
                    style={{ fontFamily: 'var(--font-body)', color: 'rgba(244,244,245,0.8)' }}
                  >
                    {contentData.text}
                  </p>
                  <div className="flex items-center gap-5">
                    {[
                      { label: 'Views', val: contentData.views },
                      { label: 'Likes', val: contentData.likes },
                      { label: 'RTs', val: contentData.retweets },
                      { label: 'Replies', val: contentData.replies },
                    ].map(({ label, val }) => (
                      <div key={label} className="text-center">
                        <p
                          className="text-sm font-bold"
                          style={{ fontFamily: 'var(--font-heading)', color: '#f4f4f5' }}
                        >
                          {val?.toLocaleString() || '—'}
                        </p>
                        <p
                          className="text-[9px] uppercase tracking-widest"
                          style={{ fontFamily: 'var(--font-heading)', color: 'rgba(244,244,245,0.25)' }}
                        >
                          {label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Instagram — manual paste */}
              {contentData.platform === 'instagram' && (
                <div>
                  <p
                    className="text-sm mb-4 leading-relaxed"
                    style={{ fontFamily: 'var(--font-body)', color: 'rgba(244,244,245,0.5)' }}
                  >
                    {contentData.message}
                  </p>
                  <textarea
                    value={manualText}
                    onChange={(e) => setManualText(e.target.value)}
                    placeholder="Paste the caption, description, or text from the post..."
                    rows={5}
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none transition-all duration-200"
                    style={{
                      fontFamily: 'var(--font-body)',
                      background: 'rgba(244,244,245,0.04)',
                      border: `1px solid rgba(${COLOR_RGB},0.15)`,
                      color: '#f4f4f5',
                      caretColor: COLOR,
                    }}
                  />
                </div>
              )}
            </div>

            {/* Analyze button */}
            <motion.button
              onClick={handleAnalyze}
              disabled={analyzing || (contentData.platform === 'instagram' && !manualText.trim())}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-xl text-sm font-bold tracking-wide uppercase transition-all duration-300"
              style={{
                fontFamily: 'var(--font-heading)',
                background:
                  !analyzing && (contentData.platform !== 'instagram' || manualText.trim())
                    ? `linear-gradient(135deg, ${COLOR}, #ec4899)`
                    : 'rgba(244,244,245,0.04)',
                border: `1px solid ${!analyzing ? 'transparent' : 'rgba(244,244,245,0.06)'}`,
                color: !analyzing ? '#fff' : 'rgba(244,244,245,0.2)',
                cursor: !analyzing ? 'pointer' : 'not-allowed',
                boxShadow: !analyzing ? `0 0 30px rgba(${COLOR_RGB},0.25)` : 'none',
              }}
            >
              {analyzing ? (
                <span className="flex items-center justify-center gap-3">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    className="inline-block w-4 h-4 rounded-full"
                    style={{ border: `2px solid rgba(${COLOR_RGB},0.3)`, borderTopColor: COLOR }}
                  />
                  Analyzing...
                </span>
              ) : (
                'Run Analysis →'
              )}
            </motion.button>

            <AnimatePresence>
              {fetchError && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-xs"
                  style={{ color: 'rgba(255,100,100,0.7)', fontFamily: 'var(--font-body)' }}
                >
                  {fetchError}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ── Step 3: Analysis results ── */}
        {step === 'results' && analysis && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {/* Header row */}
            <div className="flex items-center justify-between">
              <p
                className="text-[10px] tracking-[0.3em] uppercase"
                style={{ fontFamily: 'var(--font-heading)', color: `rgba(${COLOR_RGB},0.5)` }}
              >
                Analysis complete
              </p>
              <button
                onClick={reset}
                className="text-[10px] tracking-[0.2em] uppercase transition-colors duration-200"
                style={{ fontFamily: 'var(--font-heading)', color: 'rgba(244,244,245,0.25)' }}
              >
                ← Analyze another
              </button>
            </div>

            {/* Verdict + Score */}
            <div
              className="rounded-2xl border p-6"
              style={{
                background: `rgba(${COLOR_RGB},0.05)`,
                borderColor: `rgba(${COLOR_RGB},0.2)`,
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{
                    background: `rgba(${COLOR_RGB},0.1)`,
                    border: `1px solid rgba(${COLOR_RGB},0.2)`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.5rem',
                      fontWeight: 800,
                      color: COLOR,
                    }}
                  >
                    {analysis.score}
                  </span>
                </div>
                <div className="flex-1">
                  <p
                    className="font-semibold leading-snug mb-1"
                    style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: '#f4f4f5' }}
                  >
                    {analysis.verdict}
                  </p>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ fontFamily: 'var(--font-body)', color: 'rgba(244,244,245,0.4)' }}
                  >
                    {analysis.scoreReason}
                  </p>
                </div>
              </div>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                className="rounded-xl border p-5"
                style={{ background: 'rgba(34,197,94,0.04)', borderColor: 'rgba(34,197,94,0.15)' }}
              >
                <p
                  className="text-[9px] tracking-[0.25em] uppercase mb-3"
                  style={{ fontFamily: 'var(--font-heading)', color: 'rgba(34,197,94,0.6)' }}
                >
                  What Works
                </p>
                <ul className="space-y-2">
                  {analysis.strengths?.map((s, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span style={{ color: '#22c55e', fontSize: '0.6rem', marginTop: '0.25rem' }}>●</span>
                      <span
                        className="text-xs leading-relaxed"
                        style={{ fontFamily: 'var(--font-body)', color: 'rgba(244,244,245,0.55)' }}
                      >
                        {s}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="rounded-xl border p-5"
                style={{ background: 'rgba(239,68,68,0.04)', borderColor: 'rgba(239,68,68,0.15)' }}
              >
                <p
                  className="text-[9px] tracking-[0.25em] uppercase mb-3"
                  style={{ fontFamily: 'var(--font-heading)', color: 'rgba(239,68,68,0.6)' }}
                >
                  Missed Opportunities
                </p>
                <ul className="space-y-2">
                  {analysis.weaknesses?.map((w, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span style={{ color: '#ef4444', fontSize: '0.6rem', marginTop: '0.25rem' }}>●</span>
                      <span
                        className="text-xs leading-relaxed"
                        style={{ fontFamily: 'var(--font-body)', color: 'rgba(244,244,245,0.55)' }}
                      >
                        {w}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Viral Trigger */}
            <div
              className="rounded-xl border p-5"
              style={{
                background: `rgba(${COLOR_RGB},0.04)`,
                borderColor: `rgba(${COLOR_RGB},0.15)`,
              }}
            >
              <p
                className="text-[9px] tracking-[0.25em] uppercase mb-2"
                style={{ fontFamily: 'var(--font-heading)', color: `rgba(${COLOR_RGB},0.6)` }}
              >
                Viral Trigger
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ fontFamily: 'var(--font-body)', color: 'rgba(244,244,245,0.6)' }}
              >
                {analysis.viralTrigger}
              </p>
            </div>

            {/* Strongest Hook — copyable */}
            {analysis.hook && (
              <motion.div
                onClick={() => handleCopy(analysis.hook, 'hook')}
                className="rounded-xl border p-5 cursor-pointer transition-all duration-200"
                style={{
                  background: copied === 'hook' ? 'rgba(124,58,237,0.08)' : 'rgba(124,58,237,0.04)',
                  borderColor: copied === 'hook' ? 'rgba(167,139,250,0.4)' : 'rgba(124,58,237,0.15)',
                }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <p
                    className="text-[9px] tracking-[0.25em] uppercase"
                    style={{ fontFamily: 'var(--font-heading)', color: 'rgba(167,139,250,0.6)' }}
                  >
                    Strongest Hook for a Remake
                  </p>
                  <span
                    className="text-[9px] tracking-[0.2em] uppercase transition-colors duration-200"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      color: copied === 'hook' ? '#a78bfa' : 'rgba(244,244,245,0.2)',
                    }}
                  >
                    {copied === 'hook' ? 'Copied!' : 'Tap to copy'}
                  </span>
                </div>
                <p
                  className="text-sm leading-relaxed font-medium"
                  style={{ fontFamily: 'var(--font-body)', color: 'rgba(244,244,245,0.8)' }}
                >
                  "{analysis.hook}"
                </p>
              </motion.div>
            )}

            {/* Remake Angles */}
            {analysis.remakeAngles?.length > 0 && (
              <div>
                <p
                  className="text-[9px] tracking-[0.25em] uppercase mb-3"
                  style={{ fontFamily: 'var(--font-heading)', color: 'rgba(244,244,245,0.25)' }}
                >
                  Remake Angles
                </p>
                <div className="space-y-3">
                  {analysis.remakeAngles.map((angle, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border p-4"
                      style={{
                        background: 'rgba(17,17,22,0.8)',
                        borderColor: 'rgba(244,244,245,0.07)',
                      }}
                    >
                      <p
                        className="text-xs font-semibold mb-1"
                        style={{ fontFamily: 'var(--font-heading)', color: COLOR }}
                      >
                        {angle.angle}
                      </p>
                      <p
                        className="text-xs leading-relaxed"
                        style={{ fontFamily: 'var(--font-body)', color: 'rgba(244,244,245,0.45)' }}
                      >
                        {angle.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Best Platforms */}
            {analysis.bestPlatforms?.length > 0 && (
              <div className="flex items-center gap-3 flex-wrap">
                <p
                  className="text-[9px] tracking-[0.2em] uppercase"
                  style={{ fontFamily: 'var(--font-heading)', color: 'rgba(244,244,245,0.25)' }}
                >
                  Best on:
                </p>
                {analysis.bestPlatforms.map((p) => (
                  <span
                    key={p}
                    className="text-[10px] px-3 py-1 rounded-full"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      background: `rgba(${COLOR_RGB},0.08)`,
                      border: `1px solid rgba(${COLOR_RGB},0.2)`,
                      color: COLOR,
                    }}
                  >
                    {p}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}
