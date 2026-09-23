import { useState, useEffect, useRef } from 'react'
import HookWriter from './HookWriter'
import CaptionWriter from './CaptionWriter'
import LinkedInWriter from './LinkedInWriter'
import ContentAnalyzer from './ContentAnalyzer'
import { llmFetch } from '../lib/llmFetch'
import { saveSession, loadSession, setActiveConcept } from '../lib/sessionStore'
import { TOOL_IDS } from '../lib/openTool'
import { ChipGroup, GenerateButton, ErrorText, FallbackNote, ResultRow, CopyButton } from './ui/ToolKit'

const NICHES = ['Photography', 'Fitness', 'Fashion', 'Food', 'Travel', 'Music', 'Art', 'Business', 'Gaming', 'Lifestyle']
const PLATFORMS = ['Instagram', 'TikTok', 'YouTube', 'YouTube Shorts', 'Pinterest', 'Etsy']
const STYLES = ['Educational', 'Raw & Real', 'Aesthetic', 'Funny', 'Motivational', 'Behind the Scenes']

const TOOLS = [
  {
    id: 'concepts',
    name: 'Concept Generator',
    yields: '3 post ideas',
    desc: 'Pick your niche, platform, and style. Get three post ideas, each with an opening line, a format, and a call to action.',
  },
  {
    id: 'hooks',
    name: 'Hook Writer',
    yields: '10 hooks, scored',
    desc: 'Describe your post. Get ten opening lines, scored and ranked, with a note on why each one works.',
  },
  {
    id: 'captions',
    name: 'Caption Writer',
    yields: '5 captions',
    desc: 'Get five captions written for the platform you pick, with line breaks, hashtags, and a call to action.',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn Writer',
    yields: '3 posts',
    desc: 'Turn a story, lesson, or opinion into three LinkedIn posts, each written a different way.',
  },
  {
    id: 'analyzer',
    name: 'Content Analyzer',
    yields: '1 breakdown',
    desc: 'Paste a YouTube or X link. See what works in the post, what it misses, and how you could remake it.',
  },
]

function ConceptGenerator({ onUseConcept }) {
  const [form, setForm] = useState({ niche: '', platform: '', style: '' })
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(null)
  const [picked, setPicked] = useState(null)
  const [usedFallback, setUsedFallback] = useState(false)

  useEffect(() => {
    const saved = loadSession('concepts_results')
    if (saved) setResults(saved)
    const savedForm = loadSession('concepts_form')
    if (savedForm) setForm(savedForm)
  }, [])

  const ready = form.niche && form.platform && form.style

  async function handleGenerate() {
    if (!ready || loading) return
    setLoading(true)
    setError(null)
    setResults(null)
    setPicked(null)

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
      saveSession('concepts_results', parsed.concepts)
      saveSession('concepts_form', form)
    } catch {
      setError('The ideas didn’t come back. Try again in a moment.')
    } finally {
      setLoading(false)
    }
  }

  function handleCopy(concept, idx) {
    navigator.clipboard.writeText(`Hook: ${concept.hook}\n\nFormat: ${concept.format}\n\nWhy it works: ${concept.angle}\n\nCTA: ${concept.cta}`)
    setCopied(idx)
    setPicked(idx)
    setTimeout(() => setCopied(null), 2000)
  }

  function handleUse(concept, idx, target) {
    setPicked(idx)
    setActiveConcept({ hook: concept.hook, format: concept.format, angle: concept.angle, platform: form.platform })
    onUseConcept(target)
  }

  function startOver() {
    setResults(null)
    setPicked(null)
    setForm({ niche: '', platform: '', style: '' })
    saveSession('concepts_results', null)
    saveSession('concepts_form', null)
  }

  return (
    <div className="grid gap-8">
      <ChipGroup label="Your niche" options={NICHES} value={form.niche} onChange={(v) => setForm((f) => ({ ...f, niche: v }))} />
      <ChipGroup label="Platform" options={PLATFORMS} value={form.platform} onChange={(v) => setForm((f) => ({ ...f, platform: v }))} />
      <ChipGroup label="Style" options={STYLES} value={form.style} onChange={(v) => setForm((f) => ({ ...f, style: v }))} />
      <GenerateButton
        ready={ready}
        loading={loading}
        onClick={handleGenerate}
        idleLabel="Write 3 ideas"
        loadingLabel="Writing ideas…"
      />
      <ErrorText>{error}</ErrorText>

      {results && (
        <div className="grid gap-4">
          <FallbackNote show={usedFallback} />
          <ol className="result-list">
            {results.map((c, idx) => (
              <ResultRow
                key={idx}
                index={idx}
                picked={picked === idx}
                aside={<CopyButton copied={copied === idx} onClick={() => handleCopy(c, idx)} />}
              >
                <p className="text-[19px] leading-[1.45] text-silver">{c.hook}</p>
                <dl className="grid gap-1 text-[15px] leading-[1.5]">
                  <div><dt className="inline text-graphite">Format: </dt><dd className="inline text-[#c9c9c4]">{c.format}</dd></div>
                  <div><dt className="inline text-graphite">Why it works: </dt><dd className="inline text-[#c9c9c4]">{c.angle}</dd></div>
                  <div><dt className="inline text-graphite">Call to action: </dt><dd className="inline text-[#c9c9c4]">{c.cta}</dd></div>
                </dl>
                <div className="mt-2 flex flex-wrap gap-3">
                  <button type="button" className="btn-plain" onClick={() => handleUse(c, idx, 'hooks')}>
                    Write hooks for this
                  </button>
                  <button type="button" className="btn-plain" onClick={() => handleUse(c, idx, 'captions')}>
                    Write a caption for this
                  </button>
                </div>
              </ResultRow>
            ))}
          </ol>
          <div>
            <button type="button" className="btn-text" onClick={startOver}>Start over</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function SofarContent() {
  const [active, setActive] = useState('concepts')
  const sectionRef = useRef(null)
  const panelRef = useRef(null)
  const tabRefs = useRef({})
  const tool = TOOLS.find((t) => t.id === active)

  useEffect(() => {
    function open(id) {
      if (!TOOL_IDS.includes(id)) return
      setActive(id)
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    const fromHash = () => open(window.location.hash.slice(1))
    const fromEvent = (e) => open(e.detail)
    fromHash()
    window.addEventListener('hashchange', fromHash)
    window.addEventListener('open-tool', fromEvent)
    return () => {
      window.removeEventListener('hashchange', fromHash)
      window.removeEventListener('open-tool', fromEvent)
    }
  }, [])

  // On narrow screens the panel sits below the list, so bring it into view.
  function selectTab(id) {
    setActive(id)
    if (window.matchMedia('(max-width: 1023px)').matches) {
      requestAnimationFrame(() => panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
    }
  }

  function onTabKey(e, idx) {
    const delta = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0
    if (!delta) return
    e.preventDefault()
    const next = TOOLS[(idx + delta + TOOLS.length) % TOOLS.length]
    setActive(next.id)
    tabRefs.current[next.id]?.focus()
  }

  return (
    <section id="tools" ref={sectionRef} className="scroll-mt-6 border-t border-rule">
      <div className="container-page grid gap-12 py-20 lg:grid-cols-12 lg:gap-10 lg:py-28">
        <div className="lg:col-span-4">
          <h2 className="type-display text-[clamp(48px,5.4vw,76px)] text-silver">The tools</h2>
          <p className="mt-5 max-w-[36ch] text-[17px] text-[#c9c9c4]">
            Five of them, all free. Each one gives you a handful of options. You keep the one that fits.
          </p>

          <div role="tablist" aria-label="Tools" aria-orientation="vertical" className="mt-10 border-t border-rule">
            {TOOLS.map((t, idx) => {
              const selected = t.id === active
              return (
                <button
                  key={t.id}
                  ref={(el) => { tabRefs.current[t.id] = el }}
                  role="tab"
                  id={`tab-${t.id}`}
                  aria-selected={selected}
                  aria-controls="tool-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => selectTab(t.id)}
                  onKeyDown={(e) => onTabKey(e, idx)}
                  className={`tool-tab${selected ? ' is-active' : ''}`}
                >
                  <span className="tool-tab-name">{t.name}</span>
                  <span className="tool-tab-yield">{t.yields}</span>
                </button>
              )
            })}
          </div>
          <p className="mt-6 text-[15px] text-graphite">Coming next: a bio writer and a 30-day content calendar.</p>
        </div>

        <div id="tool-panel" ref={panelRef} role="tabpanel" aria-label={tool.name} className="scroll-mt-6 lg:col-span-8">
          <h3 className="text-[28px] font-semibold leading-tight text-silver">{tool.name}</h3>
          <p className="mt-2 mb-10 max-w-[60ch] text-[17px] text-[#c9c9c4]">{tool.desc}</p>
          {active === 'concepts' && <ConceptGenerator onUseConcept={setActive} />}
          {active === 'hooks' && <HookWriter />}
          {active === 'captions' && <CaptionWriter />}
          {active === 'linkedin' && <LinkedInWriter />}
          {active === 'analyzer' && <ContentAnalyzer />}
        </div>
      </div>
    </section>
  )
}
