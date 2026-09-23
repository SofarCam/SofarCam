import { useState } from 'react'

const TRENDS = {
  Instagram: [
    { type: 'Format', title: 'Silent “day in my life” Reels', why: 'No voiceover — just captions and b-roll. Getting 3–5x more saves than talking-head videos.' },
    { type: 'Hook', title: '“I used to [bad habit] until I tried this”', why: 'Transformation hooks with a clear before and after are showing up all over Explore.' },
    { type: 'Content', title: 'Carousel “mistakes” posts', why: '“5 things I stopped doing” carousels get shared heavily. Negative framing plus a fix earns saves.' },
    { type: 'Timing', title: 'Post at 7–9am or 6–9pm local', why: 'Posts between 11am and 4pm are underperforming. Early morning and evening slots win.' },
  ],
  TikTok: [
    { type: 'Format', title: 'POV with trending audio', why: 'POV videos paired with currently viral audio are getting pushed hard on For You.' },
    { type: 'Hook', title: 'Bold text hook in the first two seconds', why: 'A text overlay in the opening two seconds noticeably cuts early drop-off.' },
    { type: 'Content', title: 'Teach something in under 30 seconds', why: 'Short tutorials with the payoff in the last three seconds get replayed and shared.' },
    { type: 'Trend', title: 'Duets and stitch reactions', why: 'Stitching a viral video with your take borrows its audience for free.' },
  ],
  YouTube: [
    { type: 'Format', title: '“I tested X so you don’t have to”', why: 'Experiment-style titles and thumbnails win. People want results, not theory.' },
    { type: 'Hook', title: 'Open with the payoff', why: 'Show the result in the first 15 seconds, then explain how. Retention climbs noticeably.' },
    { type: 'Content', title: 'Comparison videos', why: '“A vs B” videos pull steady search traffic from people choosing between options.' },
    { type: 'Timing', title: 'Shorts as a trailer for long-form', why: 'Use a 60-second Short as a teaser and send viewers to the full video.' },
  ],
  Pinterest: [
    { type: 'Format', title: 'Tall pins with text overlays', why: '2:3 pins with three to five lines of text get far more repins than photo-only pins.' },
    { type: 'Hook', title: '“Save this for later” in the pin text', why: 'Asking for the save directly increases saves, and Pinterest rewards saves with reach.' },
    { type: 'Content', title: 'Step-by-step tutorial pins', why: 'How-to pins keep getting found for months instead of days.' },
    { type: 'SEO', title: 'Keywords in the title and description', why: 'Pinterest is a search engine. Two or three keyword phrases in the title keep a pin discoverable.' },
  ],
  'YouTube Shorts': [
    { type: 'Format', title: 'Loopable videos under 15 seconds', why: 'Shorts that loop cleanly rack up watch time, and loop rate reads as a strong signal.' },
    { type: 'Hook', title: 'Start mid-action, no intro', why: 'Skipping the intro and starting with motion in the first frame keeps far more viewers past three seconds.' },
    { type: 'Content', title: 'Surprising facts with visual proof', why: '“Did you know…” plus on-screen evidence is among the most-shared Short formats.' },
  ],
  Etsy: [
    { type: 'Listing', title: 'Lifestyle photos over white backgrounds', why: 'Listings shown in context convert better than plain product shots.' },
    { type: 'SEO', title: 'Long, specific titles', why: '“Handmade ceramic mug gift for coffee lover” beats “ceramic mug” in Etsy search.' },
    { type: 'Content', title: 'Behind-the-scenes process videos', why: 'Showing how you make the item raises add-to-cart rates.' },
    { type: 'Strategy', title: 'Reply to every review', why: 'Replying to reviews signals an active, trusted shop and helps search ranking.' },
  ],
}

const PLATFORMS = Object.keys(TRENDS)

export default function TrendingSection() {
  const [platform, setPlatform] = useState('Instagram')

  return (
    <section id="trending" className="border-t border-rule">
      <div className="container-page grid gap-12 py-20 lg:grid-cols-12 lg:gap-10 lg:py-28">
        <div className="lg:col-span-4">
          <h2 className="type-display text-[clamp(48px,5.4vw,76px)] text-silver">What’s working</h2>
          <p className="mt-5 max-w-[34ch] text-[17px] text-[#c9c9c4]">
            Notes on formats, hooks, and timing for each platform. Last updated March 2026.
          </p>
        </div>

        <div className="lg:col-span-8">
          <div role="group" aria-label="Platform" className="flex flex-wrap gap-x-6 gap-y-3 border-b border-rule pb-4">
            {PLATFORMS.map((p) => (
              <button
                key={p}
                type="button"
                aria-pressed={platform === p}
                onClick={() => setPlatform(p)}
                className={`platform-tab${platform === p ? ' is-active' : ''}`}
              >
                {p}
              </button>
            ))}
          </div>

          <ul className="grid sm:grid-cols-2 sm:gap-x-10">
            {TRENDS[platform].map((t) => (
              <li key={t.title} className="border-b border-rule py-7">
                <p className="text-[14px] text-graphite">{t.type}</p>
                <h3 className="mt-2 text-[21px] font-semibold leading-snug text-silver">{t.title}</h3>
                <p className="mt-2 text-[16px] leading-[1.55] text-[#c9c9c4]">{t.why}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
