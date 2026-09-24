import { useState, useEffect } from 'react'
import { llmFetch, parseJsonReply } from '../lib/llmFetch'
import { saveSession, loadSession } from '../lib/sessionStore'
import { TextArea, ChipGroup, GenerateButton, ErrorText, FallbackNote, ResultRow, CopyButton } from './ui/ToolKit'

const GOALS = ['Attract Clients', 'Build Authority', 'Get Hired', 'Grow Network', 'Drive Traffic']
const INDUSTRIES = ['Photography', 'Tech', 'Marketing', 'Design', 'Consulting', 'Finance', 'Healthcare', 'Real Estate', 'Education', 'Other']
const FORMATS = ['Personal Story', 'Lessons Learned', 'Hot Take', 'How-To', 'Career Milestone']

export default function LinkedInWriter() {
  const [form, setForm] = useState({ topic: '', goal: '', industry: '', format: '' })
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(null)
  const [picked, setPicked] = useState(null)
  const [usedFallback, setUsedFallback] = useState(false)

  // Restore last session on mount
  useEffect(() => {
    const savedForm = loadSession('linkedin_form')
    const savedResults = loadSession('linkedin_results')
    if (savedForm) setForm(savedForm)
    if (savedResults) setResults(savedResults)
  }, [])

  const ready = form.topic.trim() && form.goal && form.industry

  async function handleGenerate() {
    if (!ready || loading) return
    setLoading(true)
    setError(null)
    setResults(null)
    setPicked(null)

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
      const parsed = parseJsonReply(text)
      setResults(parsed)
      saveSession('linkedin_results', parsed)
      saveSession('linkedin_form', form)
    } catch {
      setError('The posts didn’t come back. Try again in a moment.')
    } finally {
      setLoading(false)
    }
  }

  function copyPost(text, idx) {
    navigator.clipboard.writeText(text)
    setCopied(idx)
    setPicked(idx)
    setTimeout(() => setCopied(null), 2000)
  }

  function startOver() {
    setResults(null)
    setPicked(null)
    setForm({ topic: '', goal: '', industry: '', format: '' })
    saveSession('linkedin_results', null)
    saveSession('linkedin_form', null)
  }

  return (
    <div className="grid gap-8">
      <TextArea
        label="What do you want to post about?"
        value={form.topic}
        onChange={(v) => setForm((f) => ({ ...f, topic: v }))}
        placeholder="e.g. How I landed 3 clients from one post, a lesson I learned the hard way, my take on AI in photography"
      />
      <ChipGroup label="Goal" options={GOALS} value={form.goal} onChange={(v) => setForm((f) => ({ ...f, goal: v }))} />
      <ChipGroup label="Industry" options={INDUSTRIES} value={form.industry} onChange={(v) => setForm((f) => ({ ...f, industry: v }))} />
      <ChipGroup label="Format (optional)" options={FORMATS} value={form.format} optional onChange={(v) => setForm((f) => ({ ...f, format: v }))} />

      <GenerateButton ready={ready} loading={loading} onClick={handleGenerate} idleLabel="Write 3 posts" loadingLabel="Writing posts…" />
      <ErrorText>{error}</ErrorText>

      {results && (
        <div className="grid gap-6">
          <FallbackNote show={usedFallback} />
          {results.profile_tip && (
            <div className="grid gap-1">
              <p className="tool-label">Profile tip</p>
              <p className="max-w-[62ch] text-[16px] text-[#c9c9c4]">{results.profile_tip}</p>
            </div>
          )}

          <ol className="result-list">
            {results.posts.map((post, idx) => (
              <ResultRow
                key={idx}
                index={idx}
                picked={picked === idx}
                aside={<CopyButton copied={copied === idx} onClick={() => copyPost(post.full_post, idx)} />}
              >
                <p className="text-[14px] text-graphite">Scored {post.score} out of 100, best for {post.best_for}</p>
                <p className="whitespace-pre-wrap text-[17px] leading-[1.55] text-silver">{post.full_post}</p>
                <p className="text-[15px] text-[#c9c9c4]">{post.why_it_works}</p>
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
