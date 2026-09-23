// /api/generate-video.js — Vercel serverless function
// Submits a text-to-video generation job to Higgsfield or Seedance (via fal.ai).
// Video generation takes 30s–3min, well past a serverless function's timeout,
// so this only *starts* the job — the client polls /api/video-status for the
// result and can call /api/cancel-video to stop a Seedance job early.
//
// Required env vars (Vercel → Settings → Environment Variables):
//   FAL_KEY               — from fal.ai dashboard (used for Seedance)
//   HIGGSFIELD_API_KEY    — from platform.higgsfield.ai
//   HIGGSFIELD_SECRET     — from platform.higgsfield.ai
//
// NOTE: field names below match each provider's documented API as of early
// 2026. Video APIs iterate quickly — if a submit call starts failing, check
// the provider's current docs for renamed fields before assuming this code
// is broken.

const FAL_SEEDANCE_MODEL = 'fal-ai/bytedance/seedance/v1/lite/text-to-video'
const HIGGSFIELD_BASE = 'https://platform.higgsfield.ai'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { prompt, provider, aspectRatio = '16:9', duration = 5, resolution = '720p' } = req.body || {}

  if (!prompt || !prompt.trim()) {
    return res.status(400).json({ error: 'Missing prompt' })
  }
  if (!['higgsfield', 'seedance'].includes(provider)) {
    return res.status(400).json({ error: 'Invalid provider' })
  }

  try {
    const job = provider === 'seedance'
      ? await submitSeedance({ prompt, aspectRatio, duration, resolution })
      : await submitHiggsfield({ prompt, aspectRatio, duration })
    return res.status(200).json(job)
  } catch (err) {
    console.error(`[generate-video:${provider}]`, err)
    return res.status(502).json({ error: err.message || 'Video generation failed to start' })
  }
}

async function submitSeedance({ prompt, aspectRatio, duration, resolution }) {
  const key = process.env.FAL_KEY
  if (!key) throw new Error('FAL_KEY not configured on the server')

  const response = await fetch(`https://queue.fal.ai/${FAL_SEEDANCE_MODEL}`, {
    method: 'POST',
    headers: {
      Authorization: `Key ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt,
      aspect_ratio: aspectRatio,
      duration: String(duration),
      resolution,
    }),
  })

  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(data?.detail?.[0]?.msg || data?.detail || data?.error || `Seedance submit failed (${response.status})`)
  }

  // fal queue response: { request_id, status_url, response_url, cancel_url }
  if (!data.request_id || !data.status_url || !data.response_url) {
    throw new Error('Seedance returned an unexpected response shape')
  }

  return {
    provider: 'seedance',
    jobId: data.request_id,
    statusUrl: data.status_url,
    responseUrl: data.response_url,
    cancelUrl: data.cancel_url,
  }
}

async function submitHiggsfield({ prompt, aspectRatio, duration }) {
  const apiKey = process.env.HIGGSFIELD_API_KEY
  const secret = process.env.HIGGSFIELD_SECRET
  if (!apiKey || !secret) throw new Error('HIGGSFIELD_API_KEY / HIGGSFIELD_SECRET not configured on the server')

  const response = await fetch(`${HIGGSFIELD_BASE}/v1/text2video`, {
    method: 'POST',
    headers: {
      'hf-api-key': apiKey,
      'hf-secret': secret,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt,
      aspect_ratio: aspectRatio,
      duration,
    }),
  })

  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(data?.message || data?.error || `Higgsfield submit failed (${response.status})`)
  }

  const jobId = data.id || data.job_id
  if (!jobId) throw new Error('Higgsfield returned an unexpected response shape')

  return { provider: 'higgsfield', jobId }
}
