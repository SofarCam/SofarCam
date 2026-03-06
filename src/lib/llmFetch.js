/**
 * llmFetch — Multi-model cascade via OpenRouter
 *
 * Strategy:
 *   Tier 1 (Free, high quality) — try these first, zero cost
 *   Tier 2 (Paid, ultra-cheap) — fallback, pennies per 1000 calls
 *   Tier 3 (Paid, premium)     — last resort, still cheap
 *
 * Returns { text, model, usedFallback }
 */

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'

const MODEL_CASCADE = [
  // ── TIER 1: Free, high quality ─────────────────────────────────────────
  // Best free creative writing model on OpenRouter (400B MoE, 13B active)
  { id: 'arcee-ai/trinity-large-preview:free',      label: 'Trinity Large',     tier: 1 },
  // Gemini Flash — fast, free tier, Google-quality
  { id: 'google/gemini-2.5-flash:free',             label: 'Gemini 2.5 Flash',  tier: 1 },
  // Llama 3.3 70B — "GPT-4 level" open model, very reliable
  { id: 'meta-llama/llama-3.3-70b-instruct:free',   label: 'Llama 3.3 70B',    tier: 1 },
  // DeepSeek V3 — strong creative output when available
  { id: 'deepseek/deepseek-v3:free',                label: 'DeepSeek V3',       tier: 1 },
  // Gemini 2.0 Flash — 1M context, stable free tier
  { id: 'google/gemini-2.0-flash-exp:free',         label: 'Gemini 2.0 Flash',  tier: 1 },
  // Kimi — good at structured JSON output
  { id: 'moonshotai/kimi-k2:free',                  label: 'Kimi K2',           tier: 1 },

  // ── TIER 2: Paid but near-free ($0.25–$1.60 / 1M tokens) ─────────────
  // DeepSeek V3.2 paid — frontier quality at $0.25/$0.38 per 1M
  { id: 'deepseek/deepseek-v3.2',                   label: 'DeepSeek V3.2',     tier: 2 },
  // GPT-4.1 Mini — reliable JSON, good tone control
  { id: 'openai/gpt-4.1-mini',                      label: 'GPT-4.1 Mini',      tier: 2 },
  // Gemini 3 Flash — production speed + near-Pro quality
  { id: 'google/gemini-2.5-flash',                  label: 'Gemini Flash Pro',  tier: 2 },

  // ── TIER 3: Premium fallback ──────────────────────────────────────────
  // Claude Haiku — human-sounding copy, brand-safe, low latency
  { id: 'anthropic/claude-haiku-4-5',               label: 'Claude Haiku',      tier: 3 },
  // Grok 3 Mini — creative, punchy, good for hooks
  { id: 'x-ai/grok-3-mini-beta',                   label: 'Grok 3 Mini',       tier: 3 },
]

async function callModel(model, prompt, maxTokens) {
  const key = import.meta.env.VITE_OPENROUTER_API_KEY
  if (!key) throw new Error('No VITE_OPENROUTER_API_KEY — add it to Vercel env vars')

  const res = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`,
      'HTTP-Referer': 'https://sofar-cam.vercel.app',
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
  const text = data.choices?.[0]?.message?.content ?? ''
  if (!text) throw new Error(`${model.label} returned empty response`)
  return text
}

/**
 * @param {string} prompt
 * @param {number} maxTokens
 * @returns {Promise<{ text: string, model: string, usedFallback: boolean, tier: number }>}
 */
export async function llmFetch(prompt, maxTokens = 1024) {
  const errors = []
  const primary = MODEL_CASCADE[0]

  for (const model of MODEL_CASCADE) {
    try {
      const text = await callModel(model, prompt, maxTokens)
      return {
        text,
        model: model.label,
        tier: model.tier,
        usedFallback: model.id !== primary.id,
      }
    } catch (err) {
      console.warn(`[llmFetch] ${model.label} (tier ${model.tier}) failed:`, err.message)
      errors.push(`${model.label}: ${err.message}`)
    }
  }

  throw new Error(`All models failed:\n${errors.join('\n')}`)
}
