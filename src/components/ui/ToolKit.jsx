import { useId } from 'react'
import GreaseMark from './GreaseMark'

export function Field({ label, hint, children }) {
  return (
    <div className="grid gap-2">
      <span className="tool-label">{label}</span>
      {children}
      {hint && <span className="tool-hint">{hint}</span>}
    </div>
  )
}

export function TextArea({ label, hint, value, onChange, placeholder, rows = 3 }) {
  const id = useId()
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="tool-label">{label}</label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="tool-input resize-none"
      />
      {hint && <span className="tool-hint">{hint}</span>}
    </div>
  )
}

export function TextInput({ label, value, onChange, placeholder, type = 'text', onEnter }) {
  const id = useId()
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="tool-label">{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter' && onEnter) onEnter() }}
        placeholder={placeholder}
        className="tool-input"
      />
    </div>
  )
}

// Single-select chip group; `optional` lets the selected chip toggle off.
export function ChipGroup({ label, options, value, onChange, optional = false }) {
  return (
    <fieldset className="grid gap-2">
      <legend className="tool-label mb-2">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const selected = value === opt
          return (
            <button
              key={opt}
              type="button"
              aria-pressed={selected}
              className="chip"
              onClick={() => onChange(optional && selected ? '' : opt)}
            >
              {opt}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

export function Checkbox({ label, checked, onChange }) {
  return (
    <label className="inline-flex items-center gap-3 text-[15px] text-silver cursor-pointer">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="tool-check" />
      {label}
    </label>
  )
}

export function GenerateButton({ ready, loading, onClick, idleLabel, loadingLabel }) {
  return (
    <div className="flex items-center gap-4 flex-wrap">
      <button type="button" className="btn-gold" onClick={onClick} disabled={!ready || loading}>
        {loading ? loadingLabel : idleLabel}
      </button>
      {!ready && !loading && <span className="tool-hint">Fill in the fields above to continue.</span>}
      {loading && <span className="tool-hint" aria-live="polite">This usually takes 10–20 seconds.</span>}
    </div>
  )
}

export function ErrorText({ children }) {
  if (!children) return null
  return <p role="alert" className="text-[15px] text-[#ff8a7a]">{children}</p>
}

export function FallbackNote({ show }) {
  if (!show) return null
  return <p className="tool-hint">Written with the backup model; results may be a little plainer.</p>
}

// One option in a set of results. The one you copy or use gets its number circled,
// the way a photographer marks the keeper on a contact sheet.
export function ResultRow({ index, picked, children, aside }) {
  return (
    <li className="result-row">
      <span className="result-frame type-frame">
        <span className="relative inline-block px-1.5 py-0.5">
          {index + 1}
          {picked && <GreaseMark seed={11 + index} />}
          {picked && <span className="sr-only"> (your pick)</span>}
        </span>
      </span>
      <div className="min-w-0 grid gap-2">{children}</div>
      {aside && <div className="result-aside">{aside}</div>}
    </li>
  )
}

export function CopyButton({ copied, onClick, label = 'Copy' }) {
  return (
    <button type="button" className="btn-text" onClick={onClick}>
      {copied ? 'Copied' : label}
    </button>
  )
}
