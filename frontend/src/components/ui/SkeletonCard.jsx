export function SkeletonCard({ className = '' }) {
  return (
    <div className={`card ${className}`}>
      <div className="animate-pulse space-y-3">
        <div className="flex items-start justify-between">
          <div className="h-11 w-11 rounded-xl bg-slate-100" />
          <div className="h-6 w-16 rounded-full bg-slate-100" />
        </div>
        <div className="mt-4 h-7 w-24 rounded-lg bg-slate-100" />
        <div className="h-3 w-32 rounded bg-slate-100" />
      </div>
    </div>
  )
}

export function SkeletonChart({ height = 220, className = '' }) {
  return (
    <div className={`card ${className}`}>
      <div className="animate-pulse">
        <div className="h-4 w-36 rounded bg-slate-100 mb-1" />
        <div className="h-3 w-24 rounded bg-slate-100 mb-5" />
        <div className="rounded-xl bg-slate-100" style={{ height }} />
      </div>
    </div>
  )
}

export function SkeletonRow({ className = '' }) {
  return (
    <div className={`card ${className}`}>
      <div className="animate-pulse space-y-3">
        <div className="h-4 w-40 rounded bg-slate-100" />
        {[80, 65, 90, 55].map((w, i) => (
          <div key={i} className="flex gap-3 items-center">
            <div className="h-3 rounded bg-slate-100" style={{ width: `${w}%` }} />
            <div className="h-3 w-12 rounded bg-slate-100 flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  )
}
