const CALL_HREF = 'mailto:shotbyseven@gmail.com?subject=SofarContent%20discovery%20call'

const SERVICES = [
  {
    name: 'AI agent setup',
    price: '$500–1,500',
    priceNote: 'plus $150–300 a month',
    timeline: '1–2 weeks',
    desc: 'I build and set up AI agents that take repetitive work off your plate — sales follow-up, customer support, content brainstorming — so you can spend your time on the parts only you can do.',
    includes: ['1-hour discovery call', 'Agent setup across 3–5 of your tools', '2-hour training session', '30 days of support', 'Monthly tune-ups on retainer'],
  },
  {
    name: 'AI implementation strategy',
    price: '$500–2,000',
    priceNote: 'one time',
    timeline: '5 business days',
    desc: 'Paying for a pile of AI subscriptions and not getting much from them? I audit what you have, find what’s actually helping, and hand you a 90-day plan you can follow.',
    includes: ['Full audit of your AI tools', 'Competitive analysis', 'Tool recommendations for your business', 'Step-by-step workflows', '60-minute strategy call'],
  },
  {
    name: 'Custom AI website',
    price: '$1,500–5,000+',
    priceNote: 'includes 90 days of support',
    timeline: '2–4 weeks',
    desc: 'A site that does more than sit there: built-in tools like the ones on this page, lead capture, and analytics so you can see what’s working.',
    includes: ['Full design and build', 'AI tools built in (idea generator, lead magnet, and more)', 'Analytics and performance tracking', 'Built with React, Vite, and Tailwind', '90 days of support'],
  },
]

export default function Services() {
  return (
    <section id="services" className="paper scroll-mt-6">
      <div className="container-page grid gap-12 py-20 lg:grid-cols-12 lg:gap-10 lg:py-28">
        <div className="lg:col-span-4">
          <h2 className="type-display text-[clamp(48px,5.4vw,76px)]">Work with me</h2>
          <p className="mt-5 max-w-[36ch] text-[17px] text-smoke">
            Somewhere between ChatGPT, which is too generic, and a marketing agency, which is too expensive.
            I set up the AI your business actually needs and show you how to use it.
          </p>
          <div className="mt-10">
            <a href={CALL_HREF} className="btn-gold">Book a free 15-minute call</a>
            <p className="mt-4 max-w-[34ch] text-[15px] text-smoke">
              Not sure which of these you need? That’s what the call is for. If I’m not the right fit, I’ll say so.
            </p>
          </div>
        </div>

        <ol className="lg:col-span-8 border-t border-black">
          {SERVICES.map((s) => (
            <li key={s.name} className="grid gap-4 border-b border-rule-paper py-9 sm:grid-cols-[1fr_auto] sm:gap-x-10">
              <div className="grid gap-3">
                <h3 className="text-[26px] font-semibold leading-tight">{s.name}</h3>
                <p className="max-w-[58ch] text-[17px] leading-[1.55] text-[#2b2b29]">{s.desc}</p>
                <p className="max-w-[62ch] text-[15px] leading-[1.6] text-smoke">
                  Includes: {s.includes.join('; ')}.
                </p>
              </div>
              <div className="sm:text-right">
                <p className="type-frame text-[26px] leading-tight">{s.price}</p>
                <p className="mt-1 text-[15px] text-smoke">{s.priceNote}</p>
                <p className="text-[15px] text-smoke">{s.timeline}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
