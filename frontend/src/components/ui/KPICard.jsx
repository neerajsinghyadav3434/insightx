import { TrendingUp, TrendingDown } from 'lucide-react'
import clsx from 'clsx'

export default function KPICard({ label, value, trend, icon: Icon, accent = '#7c5bf1', accentBg = '#f5f3ff' }) {
  const positive = trend >= 0

  return (
    <div className="card-hover group animate-slide-up">
      <div className="flex items-start justify-between">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl transition-transform
                     duration-200 group-hover:scale-110"
          style={{ background: accentBg }}
        >
          <Icon size={20} style={{ color: accent }} />
        </div>

        <span
          className={clsx(
            'flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full',
            positive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500',
          )}
        >
          {positive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
          {Math.abs(trend)}%
        </span>
      </div>

      <div className="mt-4">
        <p className="text-2xl font-display font-bold text-slate-800 leading-none">{value}</p>
        <p className="text-sm text-slate-400 mt-1.5 font-medium">{label}</p>
      </div>

      {/* Subtle bottom accent bar */}
      <div
        className="mt-4 h-0.5 rounded-full opacity-30 transition-opacity group-hover:opacity-70"
        style={{ background: `linear-gradient(to right, ${accent}, transparent)` }}
      />
    </div>
  )
}
