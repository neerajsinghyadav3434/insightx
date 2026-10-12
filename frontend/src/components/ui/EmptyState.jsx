import { BarChart2 } from 'lucide-react'

export default function EmptyState({
  icon: Icon = BarChart2,
  message = 'Data not available for this section',
  hint = null,
  compact = false,
}) {
  if (compact) {
    return (
      <div className="flex items-center gap-2 text-slate-400 py-4 justify-center">
        <Icon size={14} />
        <span className="text-xs">{message}</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center py-10 gap-3 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
        <Icon size={20} className="text-slate-400" />
      </div>
      <p className="text-sm font-semibold text-slate-500">{message}</p>
      {hint && <p className="text-xs text-slate-400 max-w-xs">{hint}</p>}
    </div>
  )
}
