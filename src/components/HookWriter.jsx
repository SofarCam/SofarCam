import { useState, useEffect } from 'react'
import { llmFetch, parseJsonReply } from '../lib/llmFetch'
import { getActiveConcept, clearActiveConcept, saveSession, loadSession } from '../lib/sessionStore'
import { TextArea, ChipGroup, Checkbox, GenerateButton, ErrorText, FallbackNote, ResultRow, CopyButton } from './ui/ToolKit'

const PLATFORMS = ['Instagram', 'TikTok', 'YouTube', 'YouTube Shorts', 'Pinterest', 'Etsy', 'X (Twitter)', 'LinkedIn']
const EMOTIONS = ['Curious', 'Aspirational', 'Urgent', 'Controversial', 'Relatable', 'Engagement Bait']

export default function HookWriter() {
  const [form, setForm] = useState({ idea: '', platform: '', emotion: '', includeCta: true })
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(null)
  const [picked, setPicked] = useState(null)
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
    setPicked(null)

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
      const parsed = parseJsonReply(text)
      setResults(parsed)
      saveSession('hooks_results', parsed)
      saveSession('hooks_form', form)
    } catch {
      setError('The hooks didn’t come back. Try again in a moment.')
    } finally {
      setLoading(false)
    }
  }

  function copyHook(text, idx) {
    navigator.clipboard.writeText(text)
    setCopied(idx)
    setPicked(idx)
    setTimeout(() => setCopied(null), 2000)
  }

  function copyList(count, key) {
    const list = results.hooks.slice(0, count).map((h, i) => `${i + 1}. ${h.hook}`).join('\n\n')
    navigator.clipboard.writeText(list)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  function startOver() {
    setResults(null)
    setPicked(null)
    setFromConcept(null)
    setForm({ idea: '', platform: '', emotion: '', includeCta: true })
    saveSession('hooks_results', null)
    saveSession('hooks_form', null)
  }

  return (
    <div className="grid gap-8">
      {fromConcept && (
        <div className="flex flex-wrap items-baseline justify-between gap-3 border-l-2 border-gold pl-4">
          <p className="text-[15px] text-[#c9c9c4]">Filled in from the post idea you picked.</p>
          <button
            type="button"
            className="btn-text"
            onClick={() => { setFromConcept(null); setForm(f => ({ ...f, idea: '', platform: '' })) }}
          >
            Clear
          </button>
        </div>
      )}

      <TextArea
        label="What’s your post about?"
        value={form.idea}
        onChange={(v) => setForm((f) => ({ ...f, idea: v }))}
        placeholder="e.g. How I grew my Instagram from 0 to 10k in 90 days using AI tools"
      />
      <ChipGroup label="Platform" options={PLATFORMS} value={form.platform} onChange={(v) => setForm((f) => ({ ...f, platform: v }))} />
      <ChipGroup label="Emotion (optional)" options={EMOTIONS} value={form.emotion} optional onChange={(v) => setForm((f) => ({ ...f, emotion: v }))} />
      <Checkbox label="Work a call to action into some hooks" checked={form.includeCta} onChange={(v) => setForm((f) => ({ ...f, includeCta: v }))} />

      <GenerateButton ready={ready} loading={loading} onClick={handleGenerate} idleLabel="Write 10 hooks" loadingLabel="Writing hooks…" />
      <ErrorText>{error}</ErrorText>

      {results && (
        <div className="grid gap-6">
          <FallbackNote show={usedFallback} />
          {results.platform_tips && (
            <div className="grid gap-1">
              <p className="tool-label">Tips for {form.platform}</p>
              <p className="max-w-[62ch] text-[16px] text-[#c9c9c4]">{results.platform_tips}</p>
            </div>
          )}

          <div className="grid gap-2">
            <p className="tool-hint">Ranked by score. Copy the one you want to use.</p>
            <ol className="result-list">
              {results.hooks.map((hook, idx) => (
                <ResultRow
                  key={idx}
                  index={idx}
                  picked={picked === idx}
                  aside={<CopyButton copied={copied === idx} onClick={() => copyHook(hook.hook, idx)} />}
                >
                  <p className="text-[19px] leading-[1.45] text-silver">{hook.hook}</p>
                  <p className="text-[14px] text-graphite">
                    Scored {hook.score} out of 100, {hook.char_count} characters, {hook.format}, {hook.emotion}
                  </p>
                  <p className="text-[15px] text-[#c9c9c4]">{hook.why_it_works}</p>
                </ResultRow>
              ))}
            </ol>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button type="button" className="btn-plain" onClick={() => copyList(5, 'top5')}>
              {copied === 'top5' ? 'Copied the top 5' : 'Copy the top 5'}
            </button>
            <button type="button" className="btn-plain" onClick={() => copyList(10, 'all')}>
              {copied === 'all' ? 'Copied all 10' : 'Copy all 10'}
            </button>
            <button type="button" className="btn-text ml-2" onClick={startOver}>Start over</button>
          </div>
        </div>
      )}
    </div>
  )
}
