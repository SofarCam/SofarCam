import { useId, useState } from 'react'

export default function EmailCapture() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const inputId = useId()

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
        body: JSON.stringify({ email, source: 'Homepage' }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'That email didn’t go through. Check it and try again.')
      }
      setSubmitted(true)
    } catch (err) {
      setError(err.message || 'That email didn’t go through. Check it and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="waitlist" className="border-t border-rule">
      <div className="container-page grid gap-10 py-20 lg:grid-cols-12 lg:gap-10 lg:py-28">
        <div className="lg:col-span-5">
          <h2 className="type-display text-[clamp(48px,5.4vw,76px)] text-silver">New tools, when they ship</h2>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          {submitted ? (
            <div role="status">
              <p className="text-[21px] font-semibold text-silver">You’re subscribed.</p>
              <p className="mt-2 text-[17px] text-[#c9c9c4]">The next email goes to {email}.</p>
            </div>
          ) : (
            <>
              <p className="max-w-[46ch] text-[17px] text-[#c9c9c4]">
                One email when a new tool goes live, plus the occasional note on what’s working. Unsubscribe any time.
              </p>
              <form onSubmit={handleSubmit} className="mt-8 grid gap-3 sm:grid-cols-[1fr_auto]">
                <label htmlFor={inputId} className="sr-only">Email address</label>
                <input
                  id={inputId}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="tool-input"
                />
                <button type="submit" className="btn-gold justify-center" disabled={!isValid || loading}>
                  {loading ? 'Subscribing…' : 'Subscribe'}
                </button>
              </form>
              {error && <p role="alert" className="mt-3 text-[15px] text-[#ff8a7a]">{error}</p>}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
