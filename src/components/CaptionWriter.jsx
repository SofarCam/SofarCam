import { useState, useEffect } from 'react'
import { llmFetch } from '../lib/llmFetch'
import { getActiveConcept, clearActiveConcept, saveSession, loadSession } from '../lib/sessionStore'
import { TextArea, ChipGroup, Checkbox, GenerateButton, ErrorText, FallbackNote, ResultRow, CopyButton } from './ui/ToolKit'

const PLATFORMS = ['Instagram', 'TikTok', 'YouTube', 'YouTube Shorts', 'Pinterest', 'Etsy', 'X (Twitter)', 'LinkedIn']
const TONES = ['Bold', 'Casual', 'Professional', 'Inspirational', 'Humorous']

export default function CaptionWriter() {
  const [form, setForm] = useState({ concept: '', platform: '', tone: '', includeCta: true })
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(null)
  const [picked, setPicked] = useState(null)
  const [usedFallback, setUsedFallback] = useState(false)
  const [fromConcept, setFromConcept] = useState(null)

  // On mount: pick up chained concept or restore last session
  useEffect(() => {
    const concept = getActiveConcept()
    if (concept) {
      const text = concept.hook
        ? `${concept.hook}${concept.angle ? ` — ${concept.angle}` : ''}`
        : ''
      setForm(f => ({ ...f, concept: text, platform: concept.platform || f.platform }))
      setFromConcept(concept)
      clearActiveConcept()
    } else {
      const savedForm = loadSession('captions_form')
      const savedResults = loadSession('captions_results')
      if (savedForm) setForm(savedForm)
      if (savedResults) setResults(savedResults)
    }
  }, [])

  const ready = form.concept.trim() && form.platform

  async function handleGenerate() {
    if (!ready || loading) return
    setLoading(true)
    setError(null)
    setResults(null)
    setPicked(null)

    const charLimits = {
      Instagram: '2200 chars max, sweet spot 138–150 for feed posts',
      TikTok: '2200 chars max, but first 125 chars show before "more"',
      'X (Twitter)': '280 chars hard limit — tight, punchy, every word earns its place',
      LinkedIn: '3000 chars max, sweet spot 1300 for algorithm boost',
      'YouTube Shorts': '100 chars max, most viewers never read it — make the first line count',
      YouTube: '5000 chars max — use first 157 for SEO snippet, structure with sections',
      Pinterest: '500 chars max — keyword-rich description, search-optimized',
      Etsy: '160 chars for listing title, use all 13 tags, front-load keywords',
    }

    const hashtagGuide = {
      Instagram: '5–10 targeted hashtags, mix niche + broad',
      TikTok: '3–5 hashtags only — avoid spam-looking stacks',
      'X (Twitter)': '1–2 hashtags max, or none — they tank reach',
      LinkedIn: '3–5 professional hashtags at the end',
      'YouTube Shorts': '1–3 hashtags, keep it clean',
      YouTube: '3–5 hashtags in description, match your video tags',
      Pinterest: 'No hashtags — use keywords naturally in the description instead',
      Etsy: 'No hashtags — use all 13 listing tags with buyer-intent keywords',
    }

    const ctaStyles = {
      Instagram: 'Save this, Share with a creator friend, Drop a 🔥 if this helped',
      TikTok: 'Follow for more, Comment your [X], Stitch this',
      'X (Twitter)': 'RT if you agree, Follow for daily [topic], Reply with your take',
      LinkedIn: 'What do you think? Drop a comment, Repost to help a fellow creator',
      'YouTube Shorts': 'Subscribe for more, Comment your biggest takeaway, Watch next:',
      YouTube: 'Subscribe for weekly [topic], Comment your question below, Watch this next:',
      Pinterest: 'Save this pin, Visit the link for the full tutorial, Follow for more ideas',
      Etsy: 'Add to favorites, Message me for custom orders, Check my shop for more',
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
      saveSession('captions_results', parsed)
      saveSession('captions_form', form)
    } catch {
      setError('The captions didn’t come back. Try again in a moment.')
    } finally {
      setLoading(false)
    }
  }

  function copyCaption(text, idx) {
    navigator.clipboard.writeText(text)
    setCopied(idx)
    setPicked(idx)
    setTimeout(() => setCopied(null), 2000)
  }

  function copyAll() {
    const all = results.captions.map((c, i) => `--- Caption ${i + 1} (${c.style}) ---\n${c.full_caption}`).join('\n\n')
    navigator.clipboard.writeText(all)
    setCopied('all')
    setTimeout(() => setCopied(null), 2000)
  }

  function startOver() {
    setResults(null)
    setPicked(null)
    setFromConcept(null)
    setForm({ concept: '', platform: '', tone: '', includeCta: true })
    saveSession('captions_results', null)
    saveSession('captions_form', null)
  }

  return (
    <div className="grid gap-8">
      {fromConcept && (
        <div className="flex flex-wrap items-baseline justify-between gap-3 border-l-2 border-gold pl-4">
          <p className="text-[15px] text-[#c9c9c4]">Filled in from the post idea you picked.</p>
          <button
            type="button"
            className="btn-text"
            onClick={() => { setFromConcept(null); setForm(f => ({ ...f, concept: '', platform: '' })) }}
          >
            Clear
          </button>
        </div>
      )}

      <TextArea
        label="What’s the post?"
        value={form.concept}
        onChange={(v) => setForm((f) => ({ ...f, concept: v }))}
        placeholder="e.g. Behind the scenes of a studio portrait session with flower-covered boots"
      />
      <ChipGroup label="Platform" options={PLATFORMS} value={form.platform} onChange={(v) => setForm((f) => ({ ...f, platform: v }))} />
      <ChipGroup label="Tone (optional)" options={TONES} value={form.tone} optional onChange={(v) => setForm((f) => ({ ...f, tone: v }))} />
      <Checkbox label="End each caption with a call to action" checked={form.includeCta} onChange={(v) => setForm((f) => ({ ...f, includeCta: v }))} />

      <GenerateButton ready={ready} loading={loading} onClick={handleGenerate} idleLabel="Write 5 captions" loadingLabel="Writing captions…" />
      <ErrorText>{error}</ErrorText>

      {results && (
        <div className="grid gap-6">
          <FallbackNote show={usedFallback} />
          {results.posting_tip && (
            <div className="grid gap-1">
              <p className="tool-label">Posting tip for {form.platform}</p>
              <p className="max-w-[62ch] text-[16px] text-[#c9c9c4]">{results.posting_tip}</p>
            </div>
          )}

          <ol className="result-list">
            {results.captions.map((caption, idx) => {
              const isSuggested = results.best_pick === caption.number
              return (
                <ResultRow
                  key={idx}
                  index={idx}
                  picked={picked === idx}
                  aside={<CopyButton copied={copied === idx} onClick={() => copyCaption(caption.full_caption, idx)} />}
                >
                  <p className="text-[14px] text-graphite">
                    {caption.style}, {caption.char_count} characters{isSuggested ? ', suggested pick' : ''}
                  </p>
                  <p className="whitespace-pre-line text-[17px] leading-[1.55] text-silver">{caption.full_caption}</p>
                  <p className="text-[15px] text-[#c9c9c4]">{caption.why_it_works}</p>
                </ResultRow>
              )
            })}
          </ol>

          <div className="flex flex-wrap items-center gap-3">
            <button type="button" className="btn-plain" onClick={copyAll}>
              {copied === 'all' ? 'Copied all 5' : 'Copy all 5'}
            </button>
            <button type="button" className="btn-text ml-2" onClick={startOver}>Start over</button>
          </div>
        </div>
      )}
    </div>
  )
}
