// /api/cancel-video.js — Vercel serverless function
// Cancels an in-flight Seedance (fal.ai) job so the user isn't billed for a
// render they no longer want. Higgsfield has no documented cancel endpoint,
// so for that provider this just acknowledges the request — the client stops
// polling, but the job may still finish (and be billed) on Higgsfield's side.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { provider, cancelUrl } = req.body || {}

  if (provider !== 'seedance') {
    return res.status(200).json({ ok: true, cancelled: false })
  }

  if (!cancelUrl) {
    return res.status(400).json({ error: 'Missing cancelUrl' })
  }

  const key = process.env.FAL_KEY
  if (!key) return res.status(500).json({ error: 'FAL_KEY not configured on the server' })

  try {
    const response = await fetch(cancelUrl, {
      method: 'PUT',
      headers: { Authorization: `Key ${key}` },
    })
    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      return res.status(502).json({ error: data?.detail || `Cancel failed (${response.status})`, cancelled: false })
    }
    return res.status(200).json({ ok: true, cancelled: true })
  } catch (err) {
    console.error('[cancel-video:seedance]', err)
    return res.status(502).json({ error: err.message || 'Cancel failed', cancelled: false })
  }
}
