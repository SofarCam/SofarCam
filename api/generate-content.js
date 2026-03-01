export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { niche, platform, style } = req.body

  if (!niche || !platform || !style) {
    return res.status(400).json({ error: 'Missing fields' })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' })
  }

  const prompt = `You are a viral content strategist who deeply understands what performs on social media in 2026.

Generate exactly 3 viral content concepts for a ${niche} creator on ${platform} with a ${style} style.

Each concept must be a specific, scroll-stopping idea — not generic advice. Write hooks like a real creator would say them, not like a marketer.

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
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('Anthropic error:', err)
      return res.status(500).json({ error: 'AI generation failed' })
    }

    const data = await response.json()
    const text = data.content?.[0]?.text

    let parsed
    try {
      parsed = JSON.parse(text)
    } catch {
      return res.status(500).json({ error: 'Failed to parse AI response' })
    }

    return res.status(200).json(parsed)
  } catch (err) {
    console.error('Handler error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
