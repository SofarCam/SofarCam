import { useState, useEffect } from 'react'
import { llmFetch } from '../lib/llmFetch'
import { saveSession, loadSession } from '../lib/sessionStore'
import { TextInput, TextArea, ErrorText, ResultRow, CopyButton } from './ui/ToolKit'

const PLATFORM_LABELS = {
  youtube: 'YouTube',
  twitter: 'X',
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

  // Restore last analysis session on mount
  useEffect(() => {
    const savedAnalysis = loadSession('analyzer_results')
    const savedContent = loadSession('analyzer_content')
    if (savedAnalysis && savedContent) {
      setAnalysis(savedAnalysis)
      setContentData(savedContent)
      setStep('results')
    }
  }, [])

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
    saveSession('analyzer_results', null)
    saveSession('analyzer_content', null)
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
      setFetchError('Couldn’t reach that link. Check your connection and try again.')
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
      saveSession('analyzer_results', parsed)
      saveSession('analyzer_content', contentData)
    } catch {
      setFetchError('The analysis didn’t come back. Try again in a moment.')
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

  const canAnalyze = !analyzing && (contentData?.platform !== 'instagram' || manualText.trim())

  return (
    <div className="grid gap-8">
      {step === 'input' && (
        <>
          <div className="grid gap-2">
            <TextInput
              label="Link to a post"
              type="url"
              value={url}
              onChange={setUrl}
              onEnter={handleFetch}
              placeholder="https://youtube.com/watch?v=… or https://x.com/…"
            />
            <span className="tool-hint">Works with YouTube and X. For Instagram, you’ll paste the caption after the link loads.</span>
          </div>
          <ErrorText>{fetchError}</ErrorText>
          <div>
            <button type="button" className="btn-gold" onClick={handleFetch} disabled={!url.trim() || fetching}>
              {fetching ? 'Loading the post…' : 'Load the post'}
            </button>
          </div>
        </>
      )}

      {step === 'preview' && contentData && (
        <>
          <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-rule pb-4">
            <p className="tool-label">{PLATFORM_LABELS[contentData.platform]} post</p>
            <button type="button" className="btn-text" onClick={reset}>Use a different link</button>
          </div>

          {contentData.platform === 'youtube' && (
            <div className="grid gap-3">
              <img
                src={contentData.thumbnail}
                onError={(e) => { e.target.src = contentData.thumbnailFallback }}
                alt={contentData.title}
                className="w-full max-h-[320px] object-cover"
              />
              <p className="text-[21px] font-semibold leading-snug text-silver">{contentData.title}</p>
              <p className="text-[15px] text-graphite">{contentData.author}</p>
            </div>
          )}

          {contentData.platform === 'twitter' && (
            <div className="grid gap-4">
              <div className="flex items-center gap-3">
                {contentData.avatar && <img src={contentData.avatar} alt="" className="h-10 w-10 rounded-full" />}
                <div>
                  <p className="text-[16px] font-semibold text-silver">{contentData.author}</p>
                  <p className="text-[14px] text-graphite">@{contentData.handle}</p>
                </div>
              </div>
              <p className="text-[17px] leading-[1.55] text-silver">{contentData.text}</p>
              <p className="text-[14px] text-graphite">
                {[
                  ['views', contentData.views],
                  ['likes', contentData.likes],
                  ['reposts', contentData.retweets],
                  ['replies', contentData.replies],
                ].map(([label, val]) => `${val?.toLocaleString() ?? '—'} ${label}`).join(', ')}
              </p>
            </div>
          )}

          {contentData.platform === 'instagram' && (
            <div className="grid gap-4">
              <p className="text-[16px] text-[#c9c9c4]">{contentData.message}</p>
              <TextArea
                label="Caption or text from the post"
                value={manualText}
                onChange={setManualText}
                placeholder="Paste the caption, description, or on-screen text"
                rows={5}
              />
            </div>
          )}

          <div className="flex flex-wrap items-center gap-4">
            <button type="button" className="btn-gold" onClick={handleAnalyze} disabled={!canAnalyze}>
              {analyzing ? 'Analyzing…' : 'Analyze this post'}
            </button>
            {analyzing && <span className="tool-hint" aria-live="polite">This usually takes 10–20 seconds.</span>}
          </div>
          <ErrorText>{fetchError}</ErrorText>
        </>
      )}

      {step === 'results' && analysis && (
        <>
          <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-rule pb-4">
            <p className="tool-label">Analysis</p>
            <button type="button" className="btn-text" onClick={reset}>Analyze another post</button>
          </div>

          <div className="grid gap-5 sm:grid-cols-[auto_1fr] sm:gap-8">
            <p className="type-display text-[88px] leading-none text-silver">
              {analysis.score}<span className="text-[32px] text-graphite">/10</span>
            </p>
            <div className="grid gap-2">
              <p className="text-[22px] font-semibold leading-snug text-silver">{analysis.verdict}</p>
              <p className="text-[16px] text-[#c9c9c4]">{analysis.scoreReason}</p>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div className="grid gap-3">
              <p className="tool-label">What works</p>
              <ul className="grid gap-2 border-t border-rule pt-3">
                {analysis.strengths?.map((s, i) => (
                  <li key={i} className="text-[16px] leading-[1.5] text-[#c9c9c4]">{s}</li>
                ))}
              </ul>
            </div>
            <div className="grid gap-3">
              <p className="tool-label">What it misses</p>
              <ul className="grid gap-2 border-t border-rule pt-3">
                {analysis.weaknesses?.map((w, i) => (
                  <li key={i} className="text-[16px] leading-[1.5] text-[#c9c9c4]">{w}</li>
                ))}
              </ul>
            </div>
          </div>

          {analysis.viralTrigger && (
            <div className="grid gap-2">
              <p className="tool-label">Why this kind of post spreads</p>
              <p className="max-w-[62ch] text-[16px] text-[#c9c9c4]">{analysis.viralTrigger}</p>
            </div>
          )}

          {analysis.hook && (
            <div className="grid gap-2 border-l-2 border-gold pl-4">
              <p className="tool-label">An opening line for your remake</p>
              <p className="text-[19px] leading-[1.45] text-silver">{analysis.hook}</p>
              <div>
                <CopyButton copied={copied === 'hook'} onClick={() => handleCopy(analysis.hook, 'hook')} label="Copy this line" />
              </div>
            </div>
          )}

          {analysis.remakeAngles?.length > 0 && (
            <div className="grid gap-2">
              <p className="tool-label">Ways to remake it</p>
              <ol className="result-list">
                {analysis.remakeAngles.map((angle, idx) => (
                  <ResultRow key={idx} index={idx}>
                    <p className="text-[18px] font-semibold text-silver">{angle.angle}</p>
                    <p className="text-[16px] text-[#c9c9c4]">{angle.description}</p>
                  </ResultRow>
                ))}
              </ol>
            </div>
          )}

          {analysis.bestPlatforms?.length > 0 && (
            <p className="text-[16px] text-[#c9c9c4]">
              <span className="text-graphite">Best suited to: </span>
              {analysis.bestPlatforms.join(', ')}
            </p>
          )}
        </>
      )}
    </div>
  )
}
