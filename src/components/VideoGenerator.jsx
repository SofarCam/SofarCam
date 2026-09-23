import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { llmFetch } from '../lib/llmFetch'
import {
  saveSession, loadSession,
  getActiveVideoPrompt, clearActiveVideoPrompt,
  addVideoHistoryEntry, getVideoHistory,
} from '../lib/sessionStore'

const PROVIDERS = [
  { id: 'higgsfield', label: 'Higgsfield', sub: 'Cinematic, stylized motion' },
  { id: 'seedance', label: 'Seedance', sub: 'Realistic, fast turnaround' },
]

const ASPECT_RATIOS = [
  { id: '9:16', label: '9:16', sub: 'Reels / TikTok / Shorts' },
  { id: '16:9', label: '16:9', sub: 'YouTube / landscape' },
  { id: '1:1', label: '1:1', sub: 'Feed / square' },
]

const DURATIONS = [5, 10]
const RESOLUTIONS = ['480p', '720p', '1080p']

const EXAMPLE_PROMPTS = [
  'A slow-motion shot of coffee pouring into a cup on a marble counter, soft morning light',
  'A drone shot rising over a foggy mountain ridge at sunrise',
  'Close-up of hands typing on a mechanical keyboard, neon light reflections',
  'A model walking down a rain-slicked city street at night, cinematic lighting',
]

const POLL_INTERVAL_MS = 4000
const MAX_POLL_MS = 4 * 60 * 1000 // give up after 4 minutes

export default function VideoGenerator() {
  const [form, setForm] = useState({ prompt: '', provider: 'higgsfield', aspectRatio: '9:16', duration: 5, resolution: '720p' })
  const [phase, setPhase] = useState('idle') // idle | queued | processing | completed | error
  const [videoUrl, setVideoUrl] = useState(null)
  const [error, setError] = useState(null)
  const [elapsed, setElapsed] = useState(0)
  const [enhancing, setEnhancing] = useState(false)
  const [fromConcept, setFromConcept] = useState(null)
  const [history, setHistory] = useState([])

  const pollTimer = useRef(null)
  const elapsedTimer = useRef(null)
  const pollStart = useRef(null)
  const currentJob = useRef(null)

  useEffect(() => {
    const chainedPrompt = getActiveVideoPrompt()
    if (chainedPrompt) {
      setForm((f) => ({ ...f, prompt: chainedPrompt }))
      setFromConcept(chainedPrompt)
      clearActiveVideoPrompt()
    } else {
      const savedForm = loadSession('video_form')
      const savedUrl = loadSession('video_result')
      if (savedForm) setForm(savedForm)
      if (savedUrl) {
        setVideoUrl(savedUrl)
        setPhase('completed')
      }
    }
    setHistory(getVideoHistory())
    return () => {
      clearInterval(pollTimer.current)
      clearInterval(elapsedTimer.current)
    }
  }, [])

  const ready = form.prompt.trim().length > 0
  const busy = phase === 'queued' || phase === 'processing'

  async function handleEnhance() {
    if (!form.prompt.trim() || enhancing || busy) return
    setEnhancing(true)
    try {
      const styleHint = form.provider === 'higgsfield'
        ? 'Lean cinematic and stylized — bold camera moves, dramatic lighting.'
        : 'Lean photorealistic and grounded — natural lighting, believable physics.'

      const prompt = `You are a prompt engineer for AI video generation models.

Expand this short idea into one detailed, single-shot video prompt: "${form.prompt}"

${styleHint}

Rules:
- One paragraph, 2-3 sentences, under 400 characters
- Describe: subject and action, camera movement/framing, lighting/mood
- No dialogue, no scene numbers, no markdown, no quotes around the output
- Return ONLY the prompt text, nothing else`

      const { text } = await llmFetch(prompt, 200)
      const cleaned = text.trim().replace(/^["']|["']$/g, '')
      setForm((f) => ({ ...f, prompt: cleaned }))
    } catch {
      setError('Could not enhance the prompt right now — try again or write it manually.')
    } finally {
      setEnhancing(false)
    }
  }

  async function handleGenerate() {
    if (!ready || busy) return
    setError(null)
    setVideoUrl(null)
    setPhase('queued')
    setElapsed(0)
    saveSession('video_result', null)

    try {
      const res = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to start generation')

      currentJob.current = data
      saveSession('video_form', form)
      pollStart.current = Date.now()

      elapsedTimer.current = setInterval(() => {
        setElapsed(Math.floor((Date.now() - pollStart.current) / 1000))
      }, 1000)

      pollTimer.current = setInterval(() => pollStatus(data), POLL_INTERVAL_MS)
      pollStatus(data)
    } catch (err) {
      setPhase('error')
      setError(err.message || 'Something went wrong starting the generation.')
    }
  }

  async function pollStatus(job) {
    if (Date.now() - pollStart.current > MAX_POLL_MS) {
      stopPolling()
      setPhase('error')
      setError('This is taking longer than expected. The job may still finish on the provider\'s side — try again in a minute.')
      return
    }

    try {
      const params = new URLSearchParams({
        provider: job.provider,
        jobId: job.jobId,
        ...(job.statusUrl ? { statusUrl: job.statusUrl } : {}),
        ...(job.responseUrl ? { responseUrl: job.responseUrl } : {}),
      })
      const res = await fetch(`/api/video-status?${params}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Status check failed')

      if (data.status === 'completed') {
        stopPolling()
        setPhase('completed')
        setVideoUrl(data.videoUrl)
        saveSession('video_result', data.videoUrl)
        setHistory(addVideoHistoryEntry({
          url: data.videoUrl,
          prompt: form.prompt,
          provider: form.provider,
          aspectRatio: form.aspectRatio,
        }))
      } else {
        setPhase(data.status === 'processing' ? 'processing' : 'queued')
      }
    } catch (err) {
      stopPolling()
      setPhase('error')
      setError(err.message || 'Something went wrong checking generation status.')
    }
  }

  async function handleCancel() {
    const job = currentJob.current
    stopPolling()
    setPhase('idle')
    setError(null)
    if (!job) return
    try {
      await fetch('/api/cancel-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider: job.provider, cancelUrl: job.cancelUrl }),
      })
    } catch {
      // best-effort — polling has already stopped either way
    }
  }

  function stopPolling() {
    clearInterval(pollTimer.current)
    clearInterval(elapsedTimer.current)
  }

  function reset() {
    stopPolling()
    setPhase('idle')
    setVideoUrl(null)
    setError(null)
    setElapsed(0)
    saveSession('video_result', null)
  }

  function loadFromHistory(entry) {
    stopPolling()
    setPhase('completed')
    setVideoUrl(entry.url)
    setError(null)
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
          background: 'rgba(22,19,15,0.8)',
          borderColor: 'rgba(253,248,240,0.07)',
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
                background: 'linear-gradient(135deg, rgba(212,160,74,0.08), rgba(212,160,74,0.06))',
                border: '1px solid rgba(212,160,74,0.2)',
              }}
            >
              <span className="text-base mt-0.5">🎬</span>
              <div>
                <p className="text-[9px] tracking-[0.25em] uppercase mb-1" style={{ fontFamily: 'var(--font-heading)', color: 'rgba(232,196,122,0.7)' }}>
                  Pre-filled from your concept
                </p>
                <p className="text-xs leading-relaxed" style={{ fontFamily: 'var(--font-body)', color: 'rgba(253,248,240,0.5)' }}>
                  {fromConcept}
                </p>
              </div>
              <button
                onClick={() => { setFromConcept(null); setForm((f) => ({ ...f, prompt: '' })) }}
                className="ml-auto text-[9px] tracking-wider uppercase shrink-0"
                style={{ fontFamily: 'var(--font-heading)', color: 'rgba(253,248,240,0.2)' }}
              >
                Clear
              </button>
            </motion.div>
          )}

          {/* Prompt */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-[10px] tracking-[0.25em] uppercase text-cream/40" style={{ fontFamily: 'var(--font-heading)' }}>
                Describe The Video
              </label>
              <button
                onClick={handleEnhance}
                disabled={!form.prompt.trim() || enhancing || busy}
                className="flex items-center gap-1.5 text-[9px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full transition-all duration-200"
                style={{
                  fontFamily: 'var(--font-heading)',
                  background: 'rgba(212,160,74,0.08)',
                  border: '1px solid rgba(212,160,74,0.2)',
                  color: form.prompt.trim() && !enhancing && !busy ? 'var(--color-gold)' : 'rgba(253,248,240,0.2)',
                  cursor: form.prompt.trim() && !enhancing && !busy ? 'pointer' : 'not-allowed',
                }}
              >
                {enhancing ? (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    className="inline-block w-2.5 h-2.5 rounded-full"
                    style={{ border: '1px solid rgba(212,160,74,0.3)', borderTopColor: 'var(--color-gold)' }}
                  />
                ) : <span>✨</span>}
                {enhancing ? 'Enhancing...' : 'Enhance with AI'}
              </button>
            </div>
            <textarea
              value={form.prompt}
              onChange={(e) => setForm((f) => ({ ...f, prompt: e.target.value }))}
              placeholder="e.g. A slow-motion shot of coffee being poured into a cup on a marble counter, soft morning light, cinematic..."
              rows={3}
              disabled={busy}
              className="w-full rounded-xl px-4 py-3 text-sm resize-none outline-none transition-all duration-200"
              style={{
                fontFamily: 'var(--font-body)',
                background: 'rgba(253,248,240,0.04)',
                border: '1px solid rgba(253,248,240,0.08)',
                color: 'rgba(253,248,240,0.8)',
                fontSize: '0.88rem',
                opacity: busy ? 0.5 : 1,
              }}
              onFocus={(e) => (e.target.style.borderColor = 'rgba(212,160,74,0.35)')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(253,248,240,0.08)')}
            />
            {!form.prompt.trim() && !busy && (
              <div className="flex flex-wrap gap-2 mt-3">
                {EXAMPLE_PROMPTS.map((ex, i) => (
                  <button
                    key={i}
                    onClick={() => setForm((f) => ({ ...f, prompt: ex }))}
                    className="text-left px-3 py-1.5 rounded-full text-[10px] leading-tight transition-all duration-200"
                    style={{
                      fontFamily: 'var(--font-body)',
                      background: 'rgba(253,248,240,0.03)',
                      border: '1px solid rgba(253,248,240,0.08)',
                      color: 'rgba(253,248,240,0.35)',
                      maxWidth: '260px',
                    }}
                  >
                    {ex.length > 60 ? ex.slice(0, 57) + '...' : ex}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Provider */}
          <div>
            <label className="block text-[10px] tracking-[0.25em] uppercase text-cream/40 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              Model
            </label>
            <div className="grid grid-cols-2 gap-3">
              {PROVIDERS.map((p) => {
                const sel = form.provider === p.id
                return (
                  <button
                    key={p.id}
                    disabled={busy}
                    onClick={() => setForm((f) => ({ ...f, provider: p.id }))}
                    className="text-left px-4 py-3 rounded-xl transition-all duration-200"
                    style={{
                      background: sel ? 'rgba(212,160,74,0.15)' : 'rgba(253,248,240,0.04)',
                      border: `1px solid ${sel ? 'rgba(212,160,74,0.5)' : 'rgba(253,248,240,0.08)'}`,
                      cursor: busy ? 'not-allowed' : 'pointer',
                    }}
                  >
                    <p className="text-xs font-medium" style={{ fontFamily: 'var(--font-heading)', color: sel ? 'var(--color-gold)' : 'rgba(253,248,240,0.6)' }}>
                      {p.label}
                    </p>
                    <p className="text-[10px] mt-0.5" style={{ fontFamily: 'var(--font-body)', color: 'rgba(253,248,240,0.3)' }}>
                      {p.sub}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Aspect ratio + duration row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] tracking-[0.25em] uppercase text-cream/40 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                Aspect Ratio
              </label>
              <div className="flex flex-wrap gap-2">
                {ASPECT_RATIOS.map((r) => (
                  <button
                    key={r.id}
                    disabled={busy}
                    onClick={() => setForm((f) => ({ ...f, aspectRatio: r.id }))}
                    title={r.sub}
                    className="px-3 py-1.5 rounded-full text-xs transition-all duration-200"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      background: form.aspectRatio === r.id ? 'rgba(212,160,74,0.15)' : 'rgba(253,248,240,0.04)',
                      border: `1px solid ${form.aspectRatio === r.id ? 'rgba(212,160,74,0.5)' : 'rgba(253,248,240,0.08)'}`,
                      color: form.aspectRatio === r.id ? 'var(--color-gold)' : 'rgba(253,248,240,0.4)',
                      cursor: busy ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.25em] uppercase text-cream/40 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                Duration
              </label>
              <div className="flex flex-wrap gap-2">
                {DURATIONS.map((d) => (
                  <button
                    key={d}
                    disabled={busy}
                    onClick={() => setForm((f) => ({ ...f, duration: d }))}
                    className="px-3 py-1.5 rounded-full text-xs transition-all duration-200"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      background: form.duration === d ? 'rgba(212,160,74,0.15)' : 'rgba(253,248,240,0.04)',
                      border: `1px solid ${form.duration === d ? 'rgba(212,160,74,0.5)' : 'rgba(253,248,240,0.08)'}`,
                      color: form.duration === d ? 'var(--color-gold)' : 'rgba(253,248,240,0.4)',
                      cursor: busy ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {d}s
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Resolution — Seedance only */}
          <AnimatePresence>
            {form.provider === 'seedance' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label className="block text-[10px] tracking-[0.25em] uppercase text-cream/40 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                  Resolution
                </label>
                <div className="flex flex-wrap gap-2">
                  {RESOLUTIONS.map((r) => (
                    <button
                      key={r}
                      disabled={busy}
                      onClick={() => setForm((f) => ({ ...f, resolution: r }))}
                      className="px-3 py-1.5 rounded-full text-xs transition-all duration-200"
                      style={{
                        fontFamily: 'var(--font-heading)',
                        background: form.resolution === r ? 'rgba(212,160,74,0.15)' : 'rgba(253,248,240,0.04)',
                        border: `1px solid ${form.resolution === r ? 'rgba(212,160,74,0.5)' : 'rgba(253,248,240,0.08)'}`,
                        color: form.resolution === r ? 'var(--color-gold)' : 'rgba(253,248,240,0.4)',
                        cursor: busy ? 'not-allowed' : 'pointer',
                      }}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Generate / Cancel button */}
          {busy ? (
            <div className="grid grid-cols-1 gap-2">
              <motion.button
                disabled
                className="w-full py-4 rounded-xl text-sm font-medium tracking-widest uppercase"
                style={{
                  fontFamily: 'var(--font-heading)',
                  background: 'rgba(212,160,74,0.12)',
                  border: '1px solid rgba(212,160,74,0.4)',
                  color: 'var(--color-gold)',
                  cursor: 'not-allowed',
                }}
              >
                <span className="flex items-center justify-center gap-3">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    className="inline-block w-3.5 h-3.5 rounded-full"
                    style={{ border: '1.5px solid rgba(212,160,74,0.3)', borderTopColor: 'var(--color-gold)' }}
                  />
                  {phase === 'queued' ? 'Queued...' : 'Rendering...'} {elapsed > 0 ? `(${elapsed}s)` : ''}
                </span>
              </motion.button>
              <button
                onClick={handleCancel}
                className="text-[10px] tracking-[0.2em] uppercase text-cream/25 hover:text-cream/45 transition-colors duration-200 py-1"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <motion.button
              onClick={handleGenerate}
              disabled={!ready}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-xl text-sm font-medium tracking-widest uppercase transition-all duration-300"
              style={{
                fontFamily: 'var(--font-heading)',
                background: ready ? 'rgba(212,160,74,0.12)' : 'rgba(253,248,240,0.03)',
                border: `1px solid ${ready ? 'rgba(212,160,74,0.4)' : 'rgba(253,248,240,0.06)'}`,
                color: ready ? 'var(--color-gold)' : 'rgba(253,248,240,0.2)',
                cursor: ready ? 'pointer' : 'not-allowed',
              }}
            >
              {phase === 'error' ? 'Try Again' : 'Generate Video'}
            </motion.button>
          )}

          {busy && (
            <p className="text-center text-[10px]" style={{ fontFamily: 'var(--font-body)', color: 'rgba(253,248,240,0.25)' }}>
              Video generation usually takes 30 seconds to a few minutes — keep this tab open.
            </p>
          )}
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

      {/* Result */}
      <AnimatePresence>
        {phase === 'completed' && videoUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-xl border p-5 mb-6"
            style={{ background: 'rgba(22,19,15,0.6)', borderColor: 'rgba(212,160,74,0.18)' }}
          >
            <video
              key={videoUrl}
              src={videoUrl}
              controls
              loop
              className="w-full rounded-lg mb-4"
              style={{ maxHeight: '70vh', background: '#000' }}
            />
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <a
                href={videoUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl text-xs tracking-widest uppercase transition-all duration-200"
                style={{
                  fontFamily: 'var(--font-heading)',
                  background: 'rgba(212,160,74,0.1)',
                  border: '1px solid rgba(212,160,74,0.3)',
                  color: 'rgba(212,160,74,0.6)',
                }}
              >
                Download
              </a>
              <button
                onClick={reset}
                className="text-[10px] tracking-[0.2em] uppercase text-cream/20 hover:text-cream/40 transition-colors duration-200"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Start over
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recent generations */}
      {history.length > 0 && (
        <div>
          <p className="text-[9px] tracking-[0.25em] uppercase mb-3 text-center" style={{ fontFamily: 'var(--font-heading)', color: 'rgba(253,248,240,0.25)' }}>
            Recent Generations
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {history.map((entry) => (
              <button
                key={entry.url}
                onClick={() => loadFromHistory(entry)}
                className="rounded-lg overflow-hidden border text-left transition-all duration-200"
                style={{
                  borderColor: videoUrl === entry.url ? 'rgba(212,160,74,0.5)' : 'rgba(253,248,240,0.08)',
                  background: 'rgba(22,19,15,0.6)',
                }}
              >
                <video src={entry.url} muted loop className="w-full aspect-video object-cover" style={{ background: '#000' }} />
                <p className="text-[9px] px-2 py-1.5 truncate" style={{ fontFamily: 'var(--font-body)', color: 'rgba(253,248,240,0.4)' }}>
                  {entry.prompt}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
