const LINKS = [
  { label: 'Instagram', detail: '@sofar.cam', href: 'https://instagram.com/sofar.cam' },
  { label: 'Shot by Seven', detail: 'Portrait studio', href: 'https://shotbyseven.com' },
  { label: 'YouTube', detail: 'sofarcam', href: 'https://youtube.com/sofarcam' },
  { label: 'Email', detail: 'shotbyseven@gmail.com', href: 'mailto:shotbyseven@gmail.com' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-rule">
      <div className="container-page grid gap-10 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="type-display text-[40px] text-silver">SofarContent</p>
          <p className="mt-3 max-w-[32ch] text-[16px] text-graphite">
            Made by Cam Currence in Charlotte, North Carolina.
          </p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 md:col-span-7">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="group grid no-underline"
                {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <span className="text-[17px] text-silver underline decoration-1 underline-offset-4 group-hover:decoration-gold">
                  {l.label}
                </span>
                <span className="text-[15px] text-graphite">{l.detail}</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="text-[14px] text-graphite md:col-span-12">© {year} Cam Currence</p>
      </div>
    </footer>
  )
}
