/**
 * llmFetch — asks the /api/llm server function to run the prompt.
 * The OpenRouter key and model cascade live on the server; nothing secret ships to the browser.
 *
 * Returns { text, model, tier, usedFallback }
 */
export async function llmFetch(prompt, maxTokens = 1024) {
  const res = await fetch('/api/llm', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, maxTokens }),
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`)
  }
  return data
}
