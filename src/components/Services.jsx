import { motion } from 'framer-motion'
import { HiArrowUpRight } from 'react-icons/hi2'

const services = [
  {
    id: 'agent-setup',
    headline: 'Stop Learning AI. Start Using It.',
    name: 'AI Agent Setup',
    price: '$500–1,500',
    recurring: '+ $150–300/mo',
    timeline: '1–2 weeks',
    color: '#a78bfa',
    colorRgb: '124,58,237',
    description:
      'We build and deploy custom AI agents for your business. Sales follow-up? Customer support? Content brainstorming? We configure systems that handle repetitive work while you focus on growth.',
    includes: [
      'Discovery call (1 hour)',
      'Custom agent configuration (3–5 tools)',
      'Training session (2 hours)',
      '30-day support',
      'Monthly optimization + retainer',
    ],
  },
  {
    id: 'strategy',
    headline: 'Stop Buying AI Tools. Start Using Them.',
    name: 'AI Implementation Strategy',
    price: '$500–2,000',
    recurring: 'One-time',
    timeline: '5 business days',
    color: '#67e8f9',
    colorRgb: '6,182,212',
    description:
      "You've got 12 AI subscriptions and nothing to show for it. We audit your stack, identify what's actually moving your business forward, and build a 90-day implementation roadmap you can execute.",
    includes: [
      'Full AI stack audit',
      'Competitive analysis',
      'Personalized tool recommendations',
      'Implementation SOPs + workflows',
      '60-minute strategy call',
    ],
  },
  {
    id: 'website',
    headline: 'Your Website That Markets Itself.',
    name: 'Custom AI Website',
    price: '$1,500–5,000+',
    recurring: '90-day support',
    timeline: '2–4 weeks',
    color: '#f9a8d4',
    colorRgb: '236,72,153',
    description:
      'Static sites are dead. We build AI-powered websites that generate content, integrate your tools automatically, and turn visitors into leads without extra work on your end.',
    includes: [
      'Full site design + build',
      'AI tool integration (concept gen, lead magnet, etc.)',
      'Analytics + performance tracking',
      'React + Vite + Tailwind stack',
      '90-day support',
    ],
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-5 px-3 py-1 rounded-full" style={{ background: 'rgba(236,72,153,0.08)', border: '1px solid rgba(249,168,212,0.2)' }}>
            <span className="text-[10px] tracking-[0.25em] uppercase" style={{ color: '#f9a8d4', fontFamily: 'var(--font-heading)' }}>
              Work With Us
            </span>
          </div>
          <h2
            className="mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.2rem, 6vw, 3.5rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: '#f4f4f5',
            }}
          >
            Here is What We{' '}
            <span className="gradient-text-warm">Do For You</span>
          </h2>
          <p
            className="max-w-lg leading-relaxed"
            style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'rgba(244,244,245,0.35)' }}
          >
            SofarContent sits between ChatGPT (too generic) and hiring a marketing agency (too expensive).
            We build solutions that feel like expertise you can actually use.
          </p>
        </motion.div>

        {/* Service cards */}
        <div className="space-y-5 mb-16">
          {services.map((s, idx) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="rounded-2xl border p-8"
              style={{
                background: `rgba(${s.colorRgb},0.04)`,
                borderColor: `${s.color}20`,
                backdropFilter: 'blur(8px)',
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div>
                  <p
                    className="text-[9px] tracking-[0.3em] uppercase mb-2"
                    style={{ fontFamily: 'var(--font-heading)', color: `${s.color}80` }}
                  >
                    {s.name}
                  </p>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
                      fontWeight: 700,
                      lineHeight: 1.1,
                      letterSpacing: '-0.01em',
                      color: '#f4f4f5',
                    }}
                  >
                    {s.headline}
                  </h3>
                </div>
                <div className="text-right shrink-0">
                  <p
                    className="font-bold"
                    style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: s.color }}
                  >
                    {s.price}
                  </p>
                  <p className="text-xs mt-0.5" style={{ fontFamily: 'var(--font-body)', color: 'rgba(244,244,245,0.3)' }}>
                    {s.recurring}
                  </p>
                  <p className="text-xs mt-0.5" style={{ fontFamily: 'var(--font-body)', color: 'rgba(244,244,245,0.2)' }}>
                    {s.timeline}
                  </p>
                </div>
              </div>

              <p
                className="mb-6 leading-relaxed"
                style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'rgba(244,244,245,0.45)' }}
              >
                {s.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {s.includes.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: s.color, opacity: 0.6 }}
                    />
                    <span
                      className="text-xs"
                      style={{ fontFamily: 'var(--font-body)', color: 'rgba(244,244,245,0.35)' }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Book a call CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-2xl border p-10 text-center"
          style={{
            background: 'rgba(124,58,237,0.06)',
            borderColor: 'rgba(124,58,237,0.2)',
          }}
        >
          <p
            className="text-[10px] tracking-[0.3em] uppercase mb-4"
            style={{ fontFamily: 'var(--font-heading)', color: 'rgba(167,139,250,0.5)' }}
          >
            Not sure what you need?
          </p>
          <h3
            className="mb-3"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.4rem, 4vw, 2rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: '#f4f4f5',
            }}
          >
            Let's figure it out together.
          </h3>
          <p
            className="mb-8 max-w-sm mx-auto text-sm leading-relaxed"
            style={{ fontFamily: 'var(--font-body)', color: 'rgba(244,244,245,0.35)' }}
          >
            Book a free 15-minute discovery call. We'll tell you exactly what you need —
            and if we're not the right fit, we'll say that too.
          </p>
          <a
            href="mailto:shotbyseven@gmail.com?subject=SofarContent%20Discovery%20Call"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold tracking-wide uppercase transition-all duration-300"
            style={{
              fontFamily: 'var(--font-heading)',
              background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
              color: '#fff',
              boxShadow: '0 0 30px rgba(124,58,237,0.3)',
            }}
          >
            Book a Discovery Call
            <HiArrowUpRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
