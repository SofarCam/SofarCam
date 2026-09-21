// /api/video-status.js — Vercel serverless function
// Polls a video generation job started by /api/generate-video and returns a
// normalized shape: { status: 'queued' | 'processing' | 'completed', videoUrl? }
// or throws (502) with a message on failure.
//
// statusUrl/responseUrl are fal.ai queue URLs, not credentials — safe to pass
// through the client as query params. The actual API keys stay server-side.

const HIGGSFIELD_BASE = 'https://platform.higgsfield.ai'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { provider, jobId, statusUrl, responseUrl } = req.query

  if (!provider || !jobId) {
    return res.status(400).json({ error: 'Missing provider or jobId' })
  }

  try {
    const result = provider === 'seedance'
      ? await checkSeedance({ statusUrl, responseUrl })
      : await checkHiggsfield({ jobId })
    return res.status(200).json(result)
  } catch (err) {
    console.error(`[video-status:${provider}]`, err)
    return res.status(502).json({ error: err.message || 'Status check failed' })
  }
}

async function checkSeedance({ statusUrl, responseUrl }) {
  const key = process.env.FAL_KEY
  if (!key) throw new Error('FAL_KEY not configured on the server')
  if (!statusUrl || !responseUrl) throw new Error('Missing statusUrl/responseUrl for Seedance job')

  const statusRes = await fetch(statusUrl, {
    headers: { Authorization: `Key ${key}` },
  })
  const statusData = await statusRes.json().catch(() => ({}))
  if (!statusRes.ok) {
    throw new Error(statusData?.detail || `Seedance status check failed (${statusRes.status})`)
  }

  // fal statuses: IN_QUEUE | IN_PROGRESS | COMPLETED
  if (statusData.status !== 'COMPLETED') {
    return { status: statusData.status === 'IN_PROGRESS' ? 'processing' : 'queued' }
  }

  const resultRes = await fetch(responseUrl, {
    headers: { Authorization: `Key ${key}` },
  })
  const resultData = await resultRes.json().catch(() => ({}))
  if (!resultRes.ok) {
    throw new Error(resultData?.detail || `Seedance result fetch failed (${resultRes.status})`)
  }

  const videoUrl = resultData?.video?.url
  if (!videoUrl) throw new Error('Seedance completed but returned no video URL')

  return { status: 'completed', videoUrl }
}

async function checkHiggsfield({ jobId }) {
  const apiKey = process.env.HIGGSFIELD_API_KEY
  const secret = process.env.HIGGSFIELD_SECRET
  if (!apiKey || !secret) throw new Error('HIGGSFIELD_API_KEY / HIGGSFIELD_SECRET not configured on the server')

  const response = await fetch(`${HIGGSFIELD_BASE}/v1/jobs/${jobId}`, {
    headers: {
      'hf-api-key': apiKey,
      'hf-secret': secret,
    },
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(data?.message || `Higgsfield status check failed (${response.status})`)
  }

  if (data.status === 'failed') {
    throw new Error(data.error || 'Higgsfield generation failed')
  }
  if (data.status !== 'completed') {
    return { status: data.status === 'processing' ? 'processing' : 'queued' }
  }

  const videoUrl = data.results?.[0]?.url || data.output?.url || data.video_url
  if (!videoUrl) throw new Error('Higgsfield completed but returned no video URL')

  return { status: 'completed', videoUrl }
}
