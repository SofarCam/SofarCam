import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TRENDS = {
  Instagram: [
    {
      type: '🎬 Format',
      title: 'Silent "Day in my life" Reels',
      why: 'No voiceover — just captions + aesthetic b-roll. Getting 3–5x more saves than talking-head format.',
      fire: 97,
    },
    {
      type: '🪝 Hook',
      title: '"I used to [bad habit] until I tried this"',
      why: 'Transformation hooks with a clear before/after are dominating the Explore page right now.',
      fire: 91,
    },
    {
      type: '📌 Content',
      title: 'Carousel "mistakes" posts',
      why: '"5 things I stopped doing" carousels are getting shared heavily. Negative framing + solution = saves.',
      fire: 88,
    },
    {
      type: '⏰ Timing',
      title: 'Post at 7–9am or 6–9pm local',
      why: 'Instagram\'s algorithm is punishing posts between 11am–4pm. Early morning + evening slots win.',
      fire: 84,
    },
  ],
  TikTok: [
    {
      type: '🎬 Format',
      title: 'POV + trending audio combo',
      why: 'POV videos paired with currently viral audio are getting boosted heavily by the For You algorithm.',
      fire: 98,
    },
    {
      type: '🪝 Hook',
      title: '"Story time" with a bold text hook in first 2s',
      why: 'Bold text overlay in the first 2 seconds has been shown to cut bounce rate by 40%.',
      fire: 94,
    },
    {
      type: '📌 Content',
      title: 'Teach something in under 30 seconds',
      why: 'Ultra-short tutorials with a payoff in the last 3 seconds are getting replayed and shared massively.',
      fire: 90,
    },
    {
      type: '🔁 Trend',
      title: 'Duet + stitch reactions',
      why: 'Stitching viral videos with your take is a free distribution hack — you inherit their audience.',
      fire: 86,
    },
  ],
  YouTube: [
    {
      type: '🎬 Format',
      title: '"I tested X so you don\'t have to"',
      why: 'Experiment-style thumbnails and titles are crushing it. People want results, not theory.',
      fire: 95,
    },
    {
      type: '🪝 Hook',
      title: 'Open with the payoff first',
      why: 'Show the result in the first 15 seconds, then explain how. Retention jumps 30%+ with this structure.',
      fire: 92,
    },
    {
      type: '📌 Content',
      title: 'Comparison videos',
      why: '"A vs B" videos get 2x more search traffic. People are always looking for the best option.',
      fire: 87,
    },
    {
      type: '⏰ Timing',
      title: 'Shorts → Long-form funnel',
      why: 'Use a 60s Short as a teaser, drive traffic to full video. Channels doing this are 4x-ing subscribers.',
      fire: 83,
    },
  ],
  Pinterest: [
    {
      type: '🎬 Format',
      title: 'Tall idea pins with text overlays',
      why: '2:3 ratio pins with 3–5 line text overlays are getting 60% more repins than photo-only pins.',
      fire: 93,
    },
    {
      type: '🪝 Hook',
      title: '"Save this for later" CTA in pin text',
      why: 'Explicitly asking people to save increases saves by 40%. Pinterest rewards saves with distribution.',
      fire: 89,
    },
    {
      type: '📌 Content',
      title: 'Step-by-step tutorial pins',
      why: 'How-to content on Pinterest has 80% longer shelf life than on any other platform. It compounds.',
      fire: 91,
    },
    {
      type: '🔑 SEO',
      title: 'Keywords in pin title + description',
      why: 'Pinterest is a search engine. Pins with 2–3 keyword phrases in the title get found for months.',
      fire: 96,
    },
  ],
  'YouTube Shorts': [
    {
      type: '🎬 Format',
      title: 'Loopable videos under 15 seconds',
      why: 'Shorts that loop seamlessly rack up 2x watch time. Algorithm reads loop rate as a strong signal.',
      fire: 96,
    },
    {
      type: '🪝 Hook',
      title: 'Start mid-action, no intro',
      why: 'Shorts that skip all intro and start with action in frame 1 retain 70% more viewers past 3 seconds.',
      fire: 93,
    },
    {
      type: '📌 Content',
      title: 'Surprising facts with visual proof',
      why: '"Did you know..." + on-screen visual evidence is the highest-shared Short format right now.',
      fire: 88,
    },
  ],
  Etsy: [
    {
      type: '📸 Listing',
      title: 'Lifestyle photos over white-background',
      why: 'Listings with in-context lifestyle photos convert 2.3x better than plain product shots.',
      fire: 95,
    },
    {
      type: '🔑 SEO',
      title: 'Long-tail keywords in title (13 words)',
      why: 'Etsy search rewards very specific titles. "handmade ceramic mug gift for coffee lover" beats "ceramic mug".',
      fire: 92,
    },
    {
      type: '📌 Content',
      title: 'Behind-the-scenes process videos',
      why: 'Etsy sellers sharing their craft process in listings are seeing 35% higher add-to-cart rates.',
      fire: 87,
    },
    {
      type: '⭐ Strategy',
      title: 'Reply to every review',
      why: 'Sellers who reply to 100% of reviews rank higher in Etsy search. It signals active, trusted shop.',
      fire: 84,
    },
  ],
}

const PLATFORMS = Object.keys(TRENDS)

function FireBar({ score }) {
  const pct = Math.min(100, score)
  const color = pct >= 90 ? '#f97316' : pct >= 80 ? '#f59e0b' : '#6366f1'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-0.5 rounded-full overflow-hidden" style={{ background: 'rgba(244,244,245,0.06)' }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
      <span className="text-[9px] shrink-0" style={{ color, fontFamily: 'var(--font-heading)', minWidth: '2rem' }}>
        {pct}
      </span>
    </div>
  )
}

export default function TrendingSection() {
  const [activePlatform, setActivePlatform] = useState('Instagram')
  const trends = TRENDS[activePlatform] || []

  return (
    <section id="trending" className="relative py-24 px-6 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 55% 40% at 50% 0%, rgba(249,115,22,0.06) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div
            className="inline-flex items-center gap-2 mb-5 px-3 py-1 rounded-full"
            style={{ background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)' }}
          >
            <span
              className="text-[10px] tracking-[0.25em] uppercase"
              style={{ color: '#f97316', fontFamily: 'var(--font-heading)' }}
            >
              🔥 What's Working Right Now
            </span>
          </div>
          <h2
            className="mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: '#f4f4f5',
            }}
          >
            Trends updated{' '}
            <span style={{ color: '#f97316' }}>weekly.</span>
          </h2>
          <p
            className="max-w-md mx-auto leading-relaxed"
            style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'rgba(244,244,245,0.4)' }}
          >
            No guessing. Real signals from what's actually performing across platforms right now.
          </p>
        </motion.div>

        {/* Platform tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {PLATFORMS.map((p) => (
            <button
              key={p}
              onClick={() => setActivePlatform(p)}
              className="px-4 py-2 rounded-full text-xs font-bold tracking-wide uppercase transition-all duration-200"
              style={{
                fontFamily: 'var(--font-heading)',
                background: activePlatform === p ? 'rgba(249,115,22,0.15)' : 'rgba(244,244,245,0.04)',
                border: `1px solid ${activePlatform === p ? 'rgba(249,115,22,0.4)' : 'rgba(244,244,245,0.08)'}`,
                color: activePlatform === p ? '#f97316' : 'rgba(244,244,245,0.4)',
                boxShadow: activePlatform === p ? '0 0 16px rgba(249,115,22,0.2)' : 'none',
              }}
            >
              {p}
            </button>
          ))}
        </motion.div>

        {/* Trend cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePlatform}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {trends.map((trend, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.07 }}
                className="rounded-xl border p-6 transition-all duration-300"
                style={{
                  background: 'rgba(17,17,22,0.85)',
                  borderColor: 'rgba(249,115,22,0.1)',
                  backdropFilter: 'blur(10px)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(249,115,22,0.25)'
                  e.currentTarget.style.boxShadow = '0 0 24px rgba(249,115,22,0.08)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(249,115,22,0.1)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <span
                    className="text-[9px] tracking-[0.2em] uppercase px-2 py-1 rounded-full"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      background: 'rgba(249,115,22,0.08)',
                      border: '1px solid rgba(249,115,22,0.15)',
                      color: '#f97316',
                    }}
                  >
                    {trend.type}
                  </span>
                </div>

                <h3
                  className="mb-2 leading-snug"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    color: 'rgba(244,244,245,0.9)',
                  }}
                >
                  {trend.title}
                </h3>

                <p
                  className="text-xs leading-relaxed mb-4"
                  style={{ fontFamily: 'var(--font-body)', color: 'rgba(244,244,245,0.4)' }}
                >
                  {trend.why}
                </p>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className="text-[8px] tracking-[0.2em] uppercase"
                      style={{ fontFamily: 'var(--font-heading)', color: 'rgba(249,115,22,0.5)' }}
                    >
                      Momentum score
                    </span>
                    <span
                      className="text-[9px]"
                      style={{ fontFamily: 'var(--font-heading)', color: 'rgba(244,244,245,0.2)' }}
                    >
                      {trend.fire}/100
                    </span>
                  </div>
                  <FireBar score={trend.fire} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8 text-[10px] tracking-[0.2em] uppercase"
          style={{ fontFamily: 'var(--font-heading)', color: 'rgba(244,244,245,0.15)' }}
        >
          Signals updated weekly by Seven AI · Last update: March 2026
        </motion.p>
      </div>
    </section>
  )
}
