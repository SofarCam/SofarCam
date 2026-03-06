/**
 * llmFetch — Multi-model cascade via OpenRouter
 * Tries each model in order until one succeeds.
 * Models are free-tier or very cheap on OpenRouter.
 *
 * Returns { text: string, model: string }
 */

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'

/**
 * Model cascade — ordered by quality/speed preference.
 * All available on OpenRouter free tier or near-free.
 */
const MODEL_CASCADE = [
  { id: 'google/gemini-2.5-flash-preview',     label: 'Gemini 2.5 Flash'  },
  { id: 'x-ai/grok-3-mini-beta',               label: 'Grok 3 Mini'       },
  { id: 'moonshotai/kimi-k2.5',                label: 'Kimi K2.5'         },
  { id: 'openai/gpt-4.1-mini',                 label: 'GPT-4.1 Mini'      },
  { id: 'meta-llama/llama-4-maverick:free',    label: 'Llama 4 Maverick'  },
  { id: 'mistralai/mistral-small-3.2-24b-instruct:free', label: 'Mistral Small' },
]

async function callModel(modelId, prompt, maxTokens) {
  const key = import.meta.env.VITE_OPENROUTER_API_KEY
  if (!key) throw new Error('No VITE_OPENROUTER_API_KEY set')

  const res = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`,
      'HTTP-Referer': 'https://sofar-cam.vercel.app',
      'X-Title': 'SofarContent',
    },
    body: JSON.stringify({
      model: modelId,
      max_tokens: maxTokens,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(`${modelId} failed: ${data?.error?.message || res.status}`)
  }

  const data = await res.json()
  const text = data.choices?.[0]?.message?.content ?? ''
  if (!text) throw new Error(`${modelId} returned empty response`)
  return text
}

/**
 * @param {string} prompt
 * @param {number} maxTokens
 * @returns {Promise<{ text: string, usedFallback: boolean, model: string }>}
 */
export async function llmFetch(prompt, maxTokens = 1024) {
  const errors = []

  for (const model of MODEL_CASCADE) {
    try {
      const text = await callModel(model.id, prompt, maxTokens)
      return {
        text,
        model: model.label,
        usedFallback: model.id !== MODEL_CASCADE[0].id,
      }
    } catch (err) {
      console.warn(`[llmFetch] ${model.label} failed:`, err.message)
      errors.push(`${model.label}: ${err.message}`)
    }
  }

  // All models failed
  throw new Error(`All models failed:\n${errors.join('\n')}`)
}
