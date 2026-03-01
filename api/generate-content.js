export const config = { runtime: 'edge' }

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  let body
  try {
    body = await req.json()
  } catch {
    return new Response('Invalid JSON', { status: 400 })
  }

  const { niche, platform, style } = body

  if (!niche || !platform || !style) {
    return new Response(JSON.stringify({ error: 'Missing fields' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const prompt = `You are a viral content strategist who deeply understands what performs on social media in 2026.

Generate exactly 3 viral content concepts for a ${niche} creator on ${platform} with a ${style} style.

Each concept must be a proven format that stops the scroll and drives real engagement.

Return ONLY valid JSON in this exact format, no markdown, no explanation:
{
  "concepts": [
    {
      "hook": "The exact opening line or visual hook (first 3 seconds). Make it impossible to scroll past.",
      "format": "The specific content format (e.g. POV, before/after, day in the life, storytime, tutorial reveal)",
      "angle": "Why this works right now — the psychological or trend-based reason it goes viral",
      "cta": "The call to action that drives saves, shares, or follows"
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

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API key not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

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
      return new Response(JSON.stringify({ error: 'AI generation failed' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const data = await response.json()
    const text = data.content?.[0]?.text

    let parsed
    try {
      parsed = JSON.parse(text)
    } catch {
      return new Response(JSON.stringify({ error: 'Failed to parse AI response' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify(parsed), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (err) {
    console.error('Handler error:', err)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
