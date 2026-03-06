export default function SectionDivider({ color = 'violet' }) {
  const gradients = {
    violet: 'linear-gradient(90deg, transparent 0%, rgba(124,58,237,0.35) 50%, transparent 100%)',
    cyan: 'linear-gradient(90deg, transparent 0%, rgba(6,182,212,0.35) 50%, transparent 100%)',
    pink: 'linear-gradient(90deg, transparent 0%, rgba(236,72,153,0.35) 50%, transparent 100%)',
  }

  return (
    <div className="px-6 py-2">
      <div className="max-w-4xl mx-auto">
        <div className="w-full h-px" style={{ background: gradients[color] ?? gradients.violet }} />
      </div>
    </div>
  )
}
