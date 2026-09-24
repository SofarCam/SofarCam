// /api/llm.js — Vercel serverless function
// Calls OpenRouter on behalf of the browser so the API key never ships to visitors.

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'

// Tried in order until one answers: cheapest first, then premium. No ":free" models —
// OpenRouter keeps retiring them, and each dead one added a failed call to every request.
const MODEL_CASCADE = [
  { id: 'deepseek/deepseek-v3.2', label: 'DeepSeek V3.2', tier: 1 },
  { id: 'google/gemini-2.5-flash', label: 'Gemini 2.5 Flash', tier: 1 },
  { id: 'openai/gpt-4.1-mini', label: 'GPT-4.1 Mini', tier: 2 },
  { id: 'meta-llama/llama-3.3-70b-instruct', label: 'Llama 3.3 70B', tier: 2 },
  { id: 'moonshotai/kimi-k2', label: 'Kimi K2', tier: 2 },
  { id: 'anthropic/claude-haiku-4.5', label: 'Claude Haiku', tier: 3 },
]

const MAX_PROMPT_CHARS = 12000
const MAX_TOKENS = 2000
// Stay under the 60s maxDuration set in vercel.json; one slow model can't eat the whole budget.
const TOTAL_BUDGET_MS = 55000
const PER_MODEL_MS = 25000

// Browsers always send Origin on POST. Requiring it to match this deployment's own host
// stops other sites from using this endpoint (and your credits) from their pages.
function isSameOrigin(req) {
  const origin = req.headers.origin
  if (!origin) return false
  try {
    return new URL(origin).host === req.headers.host
  } catch {
    return false
  }
}

async function callModel(key, model, prompt, maxTokens, timeoutMs) {
  const res = await fetch(OPENROUTER_URL, {
    method: 'POST',
    signal: AbortSignal.timeout(timeoutMs),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`,
      'HTTP-Referer': 'https://sofarcam.vercel.app',
      'X-Title': 'SofarContent',
    },
    body: JSON.stringify({
      model: model.id,
      max_tokens: maxTokens,
      temperature: 0.85,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(`${model.label} error: ${data?.error?.message || res.status}`)
  }

  const data = await res.json()
  const choice = data.choices?.[0]
  const text = choice?.message?.content ?? ''
  if (!text) throw new Error(`${model.label} returned empty response`)
  // A reply cut off at max_tokens is half a JSON object, which no tool can use.
  if (choice.finish_reason === 'length') throw new Error(`${model.label} reply was cut off`)
  return text
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  if (!isSameOrigin(req)) {
    return res.status(403).json({ error: 'Forbidden' })
  }

  const { prompt, maxTokens } = req.body || {}
  if (typeof prompt !== 'string' || !prompt.trim() || prompt.length > MAX_PROMPT_CHARS) {
    return res.status(400).json({ error: 'Invalid prompt' })
  }
  const tokens = Math.min(MAX_TOKENS, Math.max(1, Number(maxTokens) || 1024))

  // OpenRouterKey is the name the key is saved under in Vercel. VITE_OPENROUTER_API_KEY is the
  // name the old client-side code read; accept it so a key saved under that name still works.
  const key =
    process.env.OPENROUTER_API_KEY ||
    process.env.OpenRouterKey ||
    process.env.VITE_OPENROUTER_API_KEY
  if (!key) {
    console.error('[llm] OPENROUTER_API_KEY is not set')
    return res.status(503).json({ error: 'The writing tools are not configured yet.' })
  }

  const deadline = Date.now() + TOTAL_BUDGET_MS
  const primary = MODEL_CASCADE[0]
  const errors = []
  for (const model of MODEL_CASCADE) {
    const remaining = deadline - Date.now()
    if (remaining < 3000) break
    try {
      const text = await callModel(key, model, prompt, tokens, Math.min(PER_MODEL_MS, remaining))
      return res.status(200).json({
        text,
        model: model.label,
        tier: model.tier,
        usedFallback: model.id !== primary.id,
      })
    } catch (err) {
      console.warn(`[llm] ${model.label} (tier ${model.tier}) failed:`, err.message)
      errors.push(`${model.label}: ${err.message}`)
    }
  }

  console.error('[llm] no model succeeded:', errors.join(' | '))
  return res.status(502).json({ error: 'All models failed' })
}
