/**
 * llmFetch — tries Anthropic first, falls back to OpenRouter (gpt-4.1-mini, free tier)
 * Returns { text: string, usedFallback: boolean }
 */

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages'
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'

// Anthropic credit-exhausted error codes
const CREDIT_ERROR_CODES = ['billing', 'credit_limit_exceeded', 'insufficient_quota']

async function callAnthropic(prompt, maxTokens) {
  const res = await fetch(ANTHROPIC_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: maxTokens,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  const data = await res.json()

  // Credit-exhausted → signal to fall back
  if (!res.ok) {
    const errType = data?.error?.type || ''
    const errMsg = data?.error?.message || ''
    const isCreditError =
      CREDIT_ERROR_CODES.includes(errType) ||
      errMsg.toLowerCase().includes('credit balance') ||
      errMsg.toLowerCase().includes('billing')
    if (isCreditError) {
      throw new CreditError('Anthropic credits exhausted')
    }
    throw new Error(`Anthropic error: ${errMsg || res.status}`)
  }

  return data.content?.[0]?.text ?? ''
}

async function callOpenRouter(prompt, maxTokens) {
  const res = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
      'HTTP-Referer': 'https://sofar-cam.vercel.app',
      'X-Title': 'SofarContent',
    },
    body: JSON.stringify({
      model: 'moonshotai/kimi-k2.5',
      max_tokens: maxTokens,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(`OpenRouter error: ${data?.error?.message || res.status}`)
  }

  const data = await res.json()
  return data.choices?.[0]?.message?.content ?? ''
}

class CreditError extends Error {
  constructor(msg) {
    super(msg)
    this.name = 'CreditError'
  }
}

/**
 * @param {string} prompt
 * @param {number} maxTokens
 * @returns {Promise<{ text: string, usedFallback: boolean }>}
 */
export async function llmFetch(prompt, maxTokens = 1024) {
  // 1. Try Anthropic
  try {
    const text = await callAnthropic(prompt, maxTokens)
    return { text, usedFallback: false }
  } catch (err) {
    if (!(err instanceof CreditError)) throw err
    // Credit error → fall through to OpenRouter
  }

  // 2. Fallback: OpenRouter gpt-4.1-mini (free tier)
  const text = await callOpenRouter(prompt, maxTokens)
  return { text, usedFallback: true }
}
