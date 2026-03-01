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
      {/* Top rule */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent mb-20" />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-5 h-px bg-gold/40" />
            <span
              className="text-[10px] tracking-[0.35em] uppercase text-gold/70"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Work With Us
            </span>
            <div className="w-5 h-px bg-gold/40" />
          </div>
          <h2
            className="text-cream mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.2rem, 6vw, 3.5rem)',
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            Here's What We{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--color-gold)' }}>Do For You</span>
          </h2>
          <p
            className="text-cream/30 max-w-lg leading-relaxed"
            style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem' }}
          >
            SofarContent sits between ChatGPT (too generic) and hiring a marketing agency (too expensive).
            We build solutions that feel like expertise you can actually use.
          </p>
        </motion.div>

        {/* Service cards */}
        <div className="space-y-6 mb-16">
          {services.map((s, idx) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="rounded-2xl border p-8"
              style={{
                background: 'rgba(20,20,20,0.6)',
                borderColor: 'rgba(240,235,226,0.07)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div>
                  <p
                    className="text-[9px] tracking-[0.3em] uppercase text-gold/50 mb-2"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {s.name}
                  </p>
                  <h3
                    className="text-cream"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
                      fontWeight: 700,
                      lineHeight: 1.1,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {s.headline}
                  </h3>
                </div>
                <div className="text-right shrink-0">
                  <p
                    className="text-gold font-medium"
                    style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem' }}
                  >
                    {s.price}
                  </p>
                  <p
                    className="text-cream/25 text-xs mt-0.5"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {s.recurring}
                  </p>
                  <p
                    className="text-cream/20 text-xs mt-0.5"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {s.timeline}
                  </p>
                </div>
              </div>

              <p
                className="text-cream/40 mb-6 leading-relaxed"
                style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem' }}
              >
                {s.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {s.includes.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div
                      className="w-1 h-1 rounded-full shrink-0"
                      style={{ background: 'rgba(201,168,76,0.5)' }}
                    />
                    <span
                      className="text-cream/30 text-xs"
                      style={{ fontFamily: 'var(--font-body)' }}
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
            background: 'rgba(201,168,76,0.04)',
            borderColor: 'rgba(201,168,76,0.15)',
          }}
        >
          <p
            className="text-[10px] tracking-[0.3em] uppercase text-gold/50 mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Not sure what you need?
          </p>
          <h3
            className="text-cream mb-3"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.4rem, 4vw, 2rem)',
              fontWeight: 700,
              letterSpacing: '-0.01em',
            }}
          >
            Let's figure it out together.
          </h3>
          <p
            className="text-cream/30 mb-8 max-w-sm mx-auto text-sm leading-relaxed"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Book a free 15-minute discovery call. We'll tell you exactly what you need —
            and if we're not the right fit, we'll say that too.
          </p>
          <a
            href="mailto:shotbyseven@gmail.com?subject=SofarContent%20Discovery%20Call"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-medium tracking-widest uppercase transition-all duration-300 hover:bg-gold/20"
            style={{
              fontFamily: 'var(--font-heading)',
              background: 'rgba(201,168,76,0.12)',
              border: '1px solid rgba(201,168,76,0.35)',
              color: 'var(--color-gold)',
            }}
          >
            Book a Discovery Call
            <HiArrowUpRight size={13} />
          </a>
        </motion.div>
      </div>

      {/* Bottom rule */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent mt-20" />
    </section>
  )
}
