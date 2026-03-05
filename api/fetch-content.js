/**
 * /api/fetch-content
 * Fetches metadata from YouTube, X/Twitter, or detects Instagram
 * Returns structured data for the ContentAnalyzer component
 */

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { url } = req.body
  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'URL is required' })
  }

  const trimmed = url.trim()

  try {
    // ── YouTube ──────────────────────────────────────────────────────────────
    if (isYouTube(trimmed)) {
      const videoId = extractYouTubeId(trimmed)
      if (!videoId) return res.status(400).json({ error: 'Could not parse YouTube video ID' })

      // oEmbed gives us title, author, thumbnail (no key needed)
      const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
      const oembedRes = await fetch(oembedUrl)

      if (!oembedRes.ok) {
        return res.status(400).json({ error: 'YouTube video not found or private' })
      }

      const oembed = await oembedRes.json()

      return res.status(200).json({
        platform: 'youtube',
        videoId,
        title: oembed.title,
        author: oembed.author_name,
        authorUrl: oembed.author_url,
        thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        thumbnailFallback: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        embedUrl: `https://www.youtube.com/embed/${videoId}`,
        watchUrl: `https://www.youtube.com/watch?v=${videoId}`,
        width: oembed.width,
        height: oembed.height,
      })
    }

    // ── X / Twitter ──────────────────────────────────────────────────────────
    if (isTwitter(trimmed)) {
      const match = trimmed.match(/(?:twitter\.com|x\.com)\/([^/]+)\/status\/(\d+)/)
      if (!match) return res.status(400).json({ error: 'Could not parse tweet URL' })

      const [, username, tweetId] = match
      const fxRes = await fetch(`https://api.fxtwitter.com/${username}/status/${tweetId}`, {
        headers: { 'User-Agent': 'SofarContent/1.0' },
      })

      if (!fxRes.ok) {
        return res.status(400).json({ error: 'Tweet not found or account is private' })
      }

      const fx = await fxRes.json()
      const tweet = fx.tweet

      return res.status(200).json({
        platform: 'twitter',
        tweetId,
        text: tweet.text,
        author: tweet.author?.name,
        handle: tweet.author?.screen_name,
        avatar: tweet.author?.avatar_url,
        likes: tweet.likes,
        retweets: tweet.retweets,
        replies: tweet.replies,
        views: tweet.views,
        bookmarks: tweet.bookmarks,
        createdAt: tweet.created_at,
        media: tweet.media?.photos?.map((p) => p.url) || [],
        videoThumb: tweet.media?.videos?.[0]?.thumbnail_url || null,
        hasVideo: (tweet.media?.videos?.length || 0) > 0,
        url: `https://x.com/${username}/status/${tweetId}`,
      })
    }

    // ── Instagram ─────────────────────────────────────────────────────────────
    if (isInstagram(trimmed)) {
      return res.status(200).json({
        platform: 'instagram',
        url: trimmed,
        limited: true,
        message:
          "Instagram requires authentication to access post data. Paste the caption or description below and I'll analyze it for you.",
      })
    }

    return res.status(400).json({ error: 'Unsupported platform. Paste a YouTube, X/Twitter, or Instagram URL.' })
  } catch (err) {
    console.error('fetch-content error:', err)
    return res.status(500).json({ error: 'Failed to fetch content. Check the URL and try again.' })
  }
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function isYouTube(url) {
  return /(?:youtube\.com|youtu\.be)/i.test(url)
}

function isTwitter(url) {
  return /(?:twitter\.com|x\.com)/i.test(url)
}

function isInstagram(url) {
  return /instagram\.com/i.test(url)
}

function extractYouTubeId(url) {
  // Handles: watch?v=, youtu.be/, /shorts/, /live/
  const patterns = [
    /[?&]v=([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /\/(?:shorts|live|embed)\/([a-zA-Z0-9_-]{11})/,
  ]
  for (const p of patterns) {
    const m = url.match(p)
    if (m) return m[1]
  }
  return null
}
