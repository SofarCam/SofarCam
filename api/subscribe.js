// /api/subscribe.js — Vercel serverless function
// Adds email to Resend audience (free contact list)
// Resend dashboard: https://resend.com/audiences

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email } = req.body || {}

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email' })
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY
  const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID

  if (!RESEND_API_KEY) {
    // Graceful fallback — still succeed so UI isn't broken
    console.warn('RESEND_API_KEY not set — email not saved to audience')
    return res.status(200).json({ ok: true, fallback: true })
  }

  try {
    // Add contact to Resend audience
    const body = { email, unsubscribed: false }
    if (AUDIENCE_ID) {
      const response = await fetch(`https://api.resend.com/audiences/${AUDIENCE_ID}/contacts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      if (!response.ok) {
        const err = await response.json().catch(() => ({}))
        // 409 = already subscribed — treat as success
        if (response.status !== 409) {
          console.error('Resend error:', err)
          return res.status(500).json({ error: 'Failed to subscribe' })
        }
      }
    }

    // Also send a welcome notification to yourself
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'SofarContent <onboarding@resend.dev>',
        to: ['camcurrence@gmail.com'],
        subject: `🎉 New SofarContent subscriber: ${email}`,
        html: `<p>New waitlist signup on sofarcam.vercel.app</p><p><strong>${email}</strong></p><p><em>${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} ET</em></p>`,
      }),
    }).catch(() => {}) // non-blocking, don't fail the response

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Subscribe error:', err)
    return res.status(500).json({ error: 'Server error' })
  }
}
