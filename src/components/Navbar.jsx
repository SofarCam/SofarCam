import { useState } from 'react'

const LINKS = [
  { label: 'Tools', href: '/#tools' },
  { label: 'Guides', href: '/guides' },
  { label: 'Services', href: '/#services' },
]

const CALL_HREF = 'mailto:shotbyseven@gmail.com?subject=SofarContent%20discovery%20call'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="container-page">
      <div className="flex items-center justify-between gap-6 py-6">
        <a href="/" className="flex items-baseline gap-3 no-underline">
          <span className="type-display text-[28px] leading-none text-silver">SofarContent</span>
          <span className="hidden text-[14px] text-graphite sm:inline">by Cam Currence</span>
        </a>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a key={l.label} href={l.href} className="text-[16px] text-[#c9c9c4] no-underline hover:text-silver">
              {l.label}
            </a>
          ))}
          <a href={CALL_HREF} className="link-quiet text-[16px] text-silver">
            Book a call
          </a>
        </nav>

        <button
          type="button"
          className="btn-text md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Main" className="grid border-t border-rule pb-4 md:hidden">
          {[...LINKS, { label: 'Book a call', href: CALL_HREF }].map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-rule py-4 text-[18px] text-silver no-underline"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
