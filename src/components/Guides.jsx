import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiCalendarDays,
  HiAcademicCap,
  HiPencilSquare,
  HiBriefcase,
  HiSparkles,
  HiBanknotes,
  HiLockClosed,
  HiArrowUpRight,
} from 'react-icons/hi2'
import Navbar from './Navbar'
import Footer from './Footer'

// NOTE: index.css has an unlayered `* { margin: 0; padding: 0; }` reset that
// (per CSS cascade layer rules) silently wins over every Tailwind spacing
// utility site-wide. Hero.jsx works around it with inline styles for its top
// padding — this file does the same throughout rather than touching the
// shared reset, since fixing it globally would visibly change the rest of
// the already-live site.
const STORAGE_KEY = 'sofarcam_guides_unlocked'

const GUIDES = [
  {
    id: 'daily-planning',
    icon: HiCalendarDays,
    color: '#E8C47A',
    colorRgb: '212,160,74',
    title: 'Claude for Daily Planning & Decisions',
    teaser: 'Turn a scattered brain dump into a clear list of what actually matters today.',
    tips: [
      {
        label: 'Brain dump, then sort',
        body: 'Paste everything on your mind — tasks, worries, ideas — and ask Claude to sort it by urgency and energy required. You make the final call, it just clears the fog.',
      },
      {
        label: 'Steelman before you decide',
        body: 'Stuck between two options? Ask Claude to argue the strongest case for each side before you choose. Seeing both fully argued beats seeing your own bias reflected back.',
      },
      {
        label: 'Weekly reset',
        body: 'Paste your calendar or notes export at the end of the week and ask what to drop, delegate, or actually schedule for next week.',
      },
    ],
    prompt: "Here's everything on my plate this week: [paste it]. Sort this by what actually matters vs. what just feels urgent, and tell me what I can drop.",
  },
  {
    id: 'learning',
    icon: HiAcademicCap,
    color: '#E8C47A',
    colorRgb: '212,160,74',
    title: 'Claude for Learning Anything Faster',
    teaser: 'Turn Claude into a tutor that explains, then checks you actually understood.',
    tips: [
      {
        label: 'Explain, then quiz',
        body: 'Ask Claude to explain a concept, then immediately quiz you on it. Passive reading feels like progress — getting quizzed is what actually sticks.',
      },
      {
        label: '"I\'m rusty on this"',
        body: "Instead of starting from zero, tell Claude what you used to know and where you get fuzzy. It'll calibrate instead of re-teaching things you already have.",
      },
      {
        label: 'Build the sequence',
        body: 'Ask for the prerequisite chain before diving into something hard — what to learn first so the hard thing actually makes sense.',
      },
    ],
    prompt: 'Teach me [topic], assuming I already know [related thing] but nothing else. Quiz me after each section before moving on.',
  },
  {
    id: 'writing',
    icon: HiPencilSquare,
    color: '#E8C47A',
    colorRgb: '212,160,74',
    title: 'Claude for Writing & Hard Conversations',
    teaser: "Draft the message you're avoiding, then practice how the other person might respond.",
    tips: [
      {
        label: 'Draft the hard email first',
        body: 'Client pushback, a price increase, a boundary you need to set — draft it rough, then ask Claude to tighten the tone without softening the actual message.',
      },
      {
        label: 'Roleplay the reaction',
        body: 'Ask Claude to play the other person and push back the way they realistically would, so you walk in prepared instead of hoping it goes well.',
      },
      {
        label: 'Edit your own voice',
        body: "Paste your own draft and ask what's unclear or what to cut — not \"make it sound better.\" You want your writing sharper, not replaced.",
      },
    ],
    prompt: "Here's a message I want to send to a client who's asking for a refund I don't think they deserve. Help me sound firm without sounding rude.",
  },
  {
    id: 'freelance',
    icon: HiBriefcase,
    color: '#E8C47A',
    colorRgb: '212,160,74',
    title: 'Claude for Freelance & Client Work',
    teaser: 'Catch scope creep, draft proposals, and read contracts before you sign anything.',
    tips: [
      {
        label: 'Scope-creep check',
        body: "Paste the client's new ask next to your original quote and ask if it's actually in scope — and how to respond either way.",
      },
      {
        label: 'Tailored proposals',
        body: 'For each Upwork or cold-outreach pitch, paste the job post and ask for a proposal that responds to their actual words, not a generic template.',
      },
      {
        label: 'First-pass contract read',
        body: "Not legal advice — but a plain-English pass on a contract before you sign catches things you'd otherwise skim past.",
      },
    ],
    prompt: "Here's a project brief and my original quote. The client just asked for [X] — is that in scope? Help me respond.",
  },
  {
    id: 'content',
    icon: HiSparkles,
    color: '#E8C47A',
    colorRgb: '212,160,74',
    title: 'Claude for Content Creators',
    teaser: 'Turn one idea into a week of angles, and figure out why your best post actually worked.',
    tips: [
      {
        label: 'One idea, five angles',
        body: 'Give Claude your raw idea and ask for five different ways to frame it — before/after, myth-busting, storytime, tutorial, hot take.',
      },
      {
        label: 'Reverse-engineer your winners',
        body: 'Paste the caption or script from your best-performing post and ask what pattern it followed, so you can repeat it on purpose instead of by accident.',
      },
      {
        label: 'Batch it',
        body: 'Feed Claude context on 5 shoots or ideas in one sitting and get captions for all of them at once — faster than writing one at a time.',
      },
    ],
    prompt: 'Already live on this site — the Concept Generator, Hook Writer, and Caption Writer above are the fast version of this.',
    ctaHref: '/#sofarcontent',
    ctaLabel: 'Try the free tools →',
  },
  {
    id: 'money',
    icon: HiBanknotes,
    color: '#E8C47A',
    colorRgb: '212,160,74',
    title: 'Claude for Getting Your Finances Organized',
    teaser: 'Turn a messy bank export into a clear picture of where your money actually goes.',
    tips: [
      {
        label: 'Spending breakdown',
        body: "Export a month of transactions, redact account numbers, and ask for a category breakdown — you'll usually be surprised by one category.",
      },
      {
        label: 'A budget that fits your numbers',
        body: 'Ask for a 50/30/20-style budget built around your actual income and fixed costs, not a generic template.',
      },
      {
        label: 'Pressure-test a purchase',
        body: 'Before a big purchase or a subscription audit, ask Claude for the questions you should be asking yourself — not the answer, the right questions.',
      },
    ],
    prompt: "Here's my spending for the last month by category: [paste it]. What's out of line with a 50/30/20 budget, and what's actually fine?",
    note: 'Not financial, tax, or legal advice — just a faster way to organize your own thinking before you decide.',
  },
]

function useUnlocked() {
  const [unlocked, setUnlocked] = useState(false)

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === '1') setUnlocked(true)
    } catch {
      // private browsing / blocked storage — just leave it locked
    }
  }, [])

  function unlock() {
    setUnlocked(true)
    try {
      localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // non-fatal — unlock still works for this session
    }
  }

  return [unlocked, unlock]
}

function UnlockForm({ onUnlocked, inputRef }) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!isValid || loading) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'Guides Page' }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Failed to unlock')
      }
      onUnlocked()
    } catch (err) {
      setError(err.message || 'Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row"
        style={{ gap: '12px', maxWidth: '448px', margin: '0 auto' }}
      >
        <input
          ref={inputRef}
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 rounded-xl text-sm outline-none transition-all duration-200"
          style={{
            fontFamily: 'var(--font-body)',
            background: 'rgba(253,248,240,0.05)',
            border: `1px solid ${isValid ? 'rgba(232,196,122,0.35)' : 'rgba(253,248,240,0.08)'}`,
            color: 'rgba(253,248,240,0.85)',
            fontSize: '0.9rem',
            padding: '14px 20px',
          }}
        />
        <motion.button
          type="submit"
          disabled={!isValid || loading}
          whileTap={{ scale: 0.97 }}
          className="rounded-xl text-sm font-bold tracking-wide uppercase transition-all duration-300 shrink-0"
          style={{
            fontFamily: 'var(--font-heading)',
            background: isValid && !loading ? 'linear-gradient(135deg, #D4A04A, #B8862E)' : 'rgba(253,248,240,0.04)',
            border: `1px solid ${isValid && !loading ? 'transparent' : 'rgba(253,248,240,0.06)'}`,
            color: isValid && !loading ? '#0D0B09' : 'rgba(253,248,240,0.2)',
            cursor: isValid && !loading ? 'pointer' : 'not-allowed',
            boxShadow: isValid && !loading ? '0 0 24px rgba(212,160,74,0.35)' : 'none',
            padding: '14px 24px',
          }}
        >
          {loading ? 'Unlocking...' : 'Unlock All Guides →'}
        </motion.button>
      </form>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-xs text-center"
            style={{ color: 'rgba(255,100,100,0.6)', fontFamily: 'var(--font-body)', marginTop: '12px' }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
      <p
        className="text-[10px] tracking-[0.15em] uppercase text-center"
        style={{ fontFamily: 'var(--font-heading)', color: 'rgba(253,248,240,0.2)', marginTop: '16px' }}
      >
        Free forever. No spam. Unsubscribe anytime.
      </p>
    </div>
  )
}

function GuideCard({ guide, unlocked, index, onLockedClick }) {
  const Icon = guide.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.08 }}
      className="relative rounded-2xl flex flex-col overflow-hidden"
      style={{
        background: 'rgba(22,19,15,0.85)',
        border: `1px solid ${guide.color}25`,
        backdropFilter: 'blur(12px)',
        padding: '28px',
        gap: '16px',
      }}
    >
      <div className="flex items-center" style={{ gap: '12px' }}>
        <div
          className="flex items-center justify-center rounded-xl shrink-0"
          style={{ background: `rgba(${guide.colorRgb},0.12)`, border: `1px solid ${guide.color}30`, width: '40px', height: '40px' }}
        >
          <Icon size={18} color={guide.color} />
        </div>
        <h3
          className="text-base font-bold leading-snug"
          style={{ fontFamily: 'var(--font-heading)', color: guide.color, textShadow: `0 0 16px ${guide.color}40` }}
        >
          {guide.title}
        </h3>
      </div>

      <p className="text-sm leading-relaxed" style={{ fontFamily: 'var(--font-body)', color: 'rgba(253,248,240,0.55)' }}>
        {guide.teaser}
      </p>

      <div className="relative">
        <div className={unlocked ? '' : 'pointer-events-none select-none'} style={unlocked ? {} : { filter: 'blur(5px)', opacity: 0.5 }}>
          <div className="flex flex-col" style={{ gap: '12px', paddingTop: '4px' }}>
            {guide.tips.map(tip => (
              <div key={tip.label}>
                <p
                  className="text-[10px] tracking-[0.15em] uppercase font-semibold"
                  style={{ fontFamily: 'var(--font-heading)', color: guide.color, marginBottom: '4px' }}
                >
                  {tip.label}
                </p>
                <p className="text-xs leading-relaxed" style={{ fontFamily: 'var(--font-body)', color: 'rgba(253,248,240,0.5)' }}>
                  {tip.body}
                </p>
              </div>
            ))}
          </div>

          <div
            className="rounded-lg"
            style={{ background: `rgba(${guide.colorRgb},0.06)`, border: `1px solid ${guide.color}20`, padding: '12px', marginTop: '16px' }}
          >
            <p
              className="text-[9px] tracking-[0.2em] uppercase font-semibold"
              style={{ fontFamily: 'var(--font-heading)', color: `${guide.color}`, marginBottom: '4px' }}
            >
              Try this prompt
            </p>
            <p className="text-xs leading-relaxed italic" style={{ fontFamily: 'var(--font-body)', color: 'rgba(253,248,240,0.6)' }}>
              "{guide.prompt}"
            </p>
          </div>

          {guide.note && (
            <p className="text-[10px] leading-relaxed" style={{ fontFamily: 'var(--font-body)', color: 'rgba(253,248,240,0.3)', marginTop: '12px' }}>
              {guide.note}
            </p>
          )}

          {guide.ctaHref && (
            <a
              href={guide.ctaHref}
              className="inline-flex items-center text-xs font-bold tracking-wide uppercase no-underline"
              style={{ fontFamily: 'var(--font-heading)', color: guide.color, gap: '4px', marginTop: '16px' }}
            >
              {guide.ctaLabel} <HiArrowUpRight size={12} />
            </a>
          )}
        </div>

        {!unlocked && (
          <button
            onClick={onLockedClick}
            className="absolute inset-0 flex flex-col items-center justify-center rounded-xl"
            style={{ background: 'rgba(13,11,9,0.35)', gap: '8px' }}
          >
            <HiLockClosed size={18} color="rgba(253,248,240,0.6)" />
            <span
              className="text-[10px] tracking-[0.2em] uppercase font-semibold rounded-full"
              style={{
                fontFamily: 'var(--font-heading)',
                color: '#0D0B09',
                background: 'linear-gradient(135deg, #D4A04A, #B8862E)',
                boxShadow: '0 0 20px rgba(212,160,74,0.4)',
                padding: '6px 12px',
              }}
            >
              Unlock free
            </span>
          </button>
        )}
      </div>
    </motion.div>
  )
}

export default function Guides() {
  const [unlocked, unlock] = useUnlocked()
  const emailRef = useRef(null)

  useEffect(() => {
    const prevTitle = document.title
    document.title = 'Free Guides — Claude for Real Life | Cam'
    return () => { document.title = prevTitle }
  }, [])

  function scrollToUnlock() {
    emailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    emailRef.current?.focus()
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen" style={{ paddingTop: 'clamp(96px, 16vh, 140px)', paddingBottom: '96px', paddingLeft: '24px', paddingRight: '24px' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center"
          style={{ maxWidth: '672px', margin: '0 auto', marginBottom: '56px' }}
        >
          <div
            className="inline-flex items-center rounded-full"
            style={{ background: 'rgba(212,160,74,0.1)', border: '1px solid rgba(232,196,122,0.2)', gap: '8px', padding: '4px 12px', marginBottom: '24px' }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#E8C47A' }} />
            <span className="text-[10px] tracking-[0.25em] uppercase" style={{ color: '#E8C47A', fontFamily: 'var(--font-heading)' }}>
              6 Free Guides
            </span>
          </div>
          <h1
            className="heading-glow"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 6vw, 3.8rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: '#FDF8F0',
              marginBottom: '20px',
            }}
          >
            Claude, for <span className="gradient-text-glow">real life.</span>
          </h1>
          <p
            className="leading-relaxed"
            style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'rgba(253,248,240,0.45)', marginBottom: '40px' }}
          >
            Not another "10 AI prompts" list. Actual ways to use Claude for planning,
            learning, hard conversations, freelance work, content, and getting your
            money organized — with prompts you can copy right now.
          </p>

          {!unlocked && <UnlockForm onUnlocked={unlock} inputRef={emailRef} />}

          {unlocked && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm font-semibold"
              style={{ fontFamily: 'var(--font-heading)', color: '#6b6b6b' }}
            >
              ✓ Unlocked — all 6 guides below.
            </motion.p>
          )}
        </motion.div>

        {/* Guides grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ maxWidth: '1024px', margin: '0 auto', gap: '24px' }}>
          {GUIDES.map((guide, i) => (
            <GuideCard key={guide.id} guide={guide} unlocked={unlocked} index={i} onLockedClick={scrollToUnlock} />
          ))}
        </div>
      </main>

      <Footer />
    </>
  )
}
