export default function SectionCard({ title, subtitle, action, children, className = '' }) {
  return (
    <div className={`card flex flex-col gap-4 ${className}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display font-semibold text-slate-800 text-sm leading-snug">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
          )}
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
      {children}
    </div>
  )
}
