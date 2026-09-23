import { useState, useEffect, useRef, useId } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const STORAGE_KEY = 'sofarcam_guides_unlocked'

const GUIDES = [
  {
    id: 'daily-planning',
    title: 'Planning your day and making decisions',
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
    title: 'Learning anything faster',
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
    title: 'Writing and hard conversations',
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
    title: 'Freelance and client work',
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
    title: 'Making content',
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
    prompt: "Here's my post idea: [idea]. Give me five ways to frame it — a before-and-after, a myth-bust, a story, a tutorial, and a hot take.",
    ctaHref: '/#concepts',
    ctaLabel: 'Try the free tools',
  },
  {
    id: 'money',
    title: 'Getting your money organized',
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

function readUnlocked() {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false // private browsing / blocked storage — just leave it locked
  }
}

function useUnlocked() {
  const [unlocked, setUnlocked] = useState(readUnlocked)

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
        throw new Error(data.error || 'That email didn’t go through. Check it and try again.')
      }
      onUnlocked()
    } catch (err) {
      setError(err.message || 'That email didn’t go through. Check it and try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputId = useId()
  return (
    <div className="grid gap-3">
      <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <label htmlFor={inputId} className="sr-only">Email address</label>
        <input
          id={inputId}
          ref={inputRef}
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          required
          className="tool-input"
        />
        <button type="submit" className="btn-gold justify-center" disabled={!isValid || loading}>
          {loading ? 'Unlocking…' : 'Unlock all six'}
        </button>
      </form>
      {error && <p role="alert" className="text-[15px] text-[#ff8a7a]">{error}</p>}
      <p className="tool-hint">Free. You’ll also get an email when new guides or tools go up. Unsubscribe any time.</p>
    </div>
  )
}

function GuideItem({ guide, unlocked, onLockedClick }) {
  return (
    <li className="grid gap-4 border-b border-rule py-10">
      <div className="grid gap-2">
        <h2 className="text-[26px] font-semibold leading-tight text-silver">{guide.title}</h2>
        <p className="max-w-[56ch] text-[17px] text-[#c9c9c4]">{guide.teaser}</p>
      </div>

      <div className="relative">
        <div
          aria-hidden={!unlocked}
          className={unlocked ? 'grid gap-5' : 'grid gap-5 select-none pointer-events-none blur-[5px] opacity-40'}
        >
          <ul className="grid gap-4">
            {guide.tips.map(tip => (
              <li key={tip.label} className="grid gap-1">
                <p className="text-[16px] font-semibold text-silver">{tip.label}</p>
                <p className="max-w-[62ch] text-[16px] leading-[1.55] text-[#c9c9c4]">{tip.body}</p>
              </li>
            ))}
          </ul>
          <div className="grid gap-1 border-l-2 border-gold pl-4">
            <p className="text-[14px] text-graphite">Try this prompt</p>
            <p className="max-w-[62ch] text-[17px] leading-[1.5] text-silver">{guide.prompt}</p>
          </div>
          {guide.note && <p className="text-[14px] text-graphite">{guide.note}</p>}
          {guide.ctaHref && (
            <p><a href={guide.ctaHref} className="link-quiet text-[16px] text-silver">{guide.ctaLabel}</a></p>
          )}
        </div>

        {!unlocked && (
          <div className="absolute inset-0 flex items-center">
            <button type="button" className="btn-plain bg-film" onClick={onLockedClick}>
              Unlock with your email to read this
            </button>
          </div>
        )}
      </div>
    </li>
  )
}

export default function Guides() {
  const [unlocked, unlock] = useUnlocked()
  const emailRef = useRef(null)

  useEffect(() => {
    const prevTitle = document.title
    document.title = 'Claude, for real life — six free guides from SofarContent'
    return () => { document.title = prevTitle }
  }, [])

  function scrollToUnlock() {
    emailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    emailRef.current?.focus()
  }

  return (
    <>
      <Navbar />
      <main>
        <section className="container-page grid gap-12 pt-10 pb-16 md:pt-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <h1 className="type-display text-[clamp(60px,8vw,112px)] text-silver">
              <span className="block text-balance">Claude, for real life.</span>
            </h1>
            <p className="mt-8 max-w-[44ch] text-[19px] leading-[1.5] text-[#c9c9c4]">
              Six short guides on using Claude for planning, learning, hard conversations, freelance work,
              content, and money — each with a prompt you can copy.
            </p>
          </div>
          <div className="lg:col-span-5 lg:self-end">
            {unlocked ? (
              <p role="status" className="text-[17px] text-silver">All six guides are unlocked below.</p>
            ) : (
              <UnlockForm onUnlocked={unlock} inputRef={emailRef} />
            )}
          </div>
        </section>

        <section className="container-page pb-24">
          <ul className="border-t border-rule lg:w-8/12">
            {GUIDES.map((guide) => (
              <GuideItem key={guide.id} guide={guide} unlocked={unlocked} onLockedClick={scrollToUnlock} />
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  )
}
