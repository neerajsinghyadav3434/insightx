import { useState } from 'react'
import { Search, User, Calendar, ShoppingBag, DollarSign, RotateCcw } from 'lucide-react'
import SectionCard from '@/components/ui/SectionCard'
import SegmentBadge from '@/components/ui/SegmentBadge'
import { customerProfiles } from '@/data/mockData'

const QUICK_IDS = ['12347', '14688', '16029']

export default function Customers() {
  const [query, setQuery] = useState('')
  const [profile, setProfile] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function lookup(id) {
    const cid = (id || query).trim()
    if (!cid) return
    setLoading(true)
    setError('')
    setProfile(null)
    setTimeout(() => {
      const p = customerProfiles[cid]
      if (p) { setProfile(p) }
      else    { setError(`Customer "${cid}" not found. Try: 12347, 14688 or 16029.`) }
      setLoading(false)
    }, 400)
  }

  const rfmMetrics = profile ? [
    { label: 'Recency',   value: `${profile.recency} days`,        icon: Calendar,     color: 'text-purple-600', bg: 'bg-purple-50'  },
    { label: 'Frequency', value: `${profile.frequency} orders`,    icon: RotateCcw,    color: 'text-emerald-600', bg: 'bg-emerald-50'},
    { label: 'Monetary',  value: `£${profile.monetary.toFixed(2)}`, icon: DollarSign,  color: 'text-amber-600',  bg: 'bg-amber-50'   },
  ] : []

  return (
    <div className="space-y-6 animate-slide-up max-w-4xl">

      {/* Lookup */}
      <SectionCard title="Customer Profile Lookup" subtitle="Enter a CustomerID to view full profile & purchase history">
        <div className="flex gap-3 flex-wrap">
          <div className="flex-1 min-w-[200px] flex items-center gap-2 bg-slate-50 border border-slate-200
                          rounded-xl px-4 py-2.5 focus-within:border-brand-400 focus-within:ring-2
                          focus-within:ring-brand-100 transition-all">
            <Search size={15} className="text-slate-400 flex-shrink-0" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && lookup()}
              placeholder="e.g. 12347"
              className="flex-1 bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none"
            />
          </div>
          <button onClick={() => lookup()} disabled={loading}
                  className="btn-primary flex items-center gap-2 disabled:opacity-60">
            <User size={14} />
            {loading ? 'Looking up…' : 'Lookup'}
          </button>
        </div>

        {/* Quick picks */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-slate-400">Quick demo:</span>
          {QUICK_IDS.map(id => (
            <button key={id} onClick={() => { setQuery(id); lookup(id) }}
                    className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-brand-50 hover:text-brand-700
                               text-xs font-semibold text-slate-600 border border-transparent
                               hover:border-brand-200 transition">
              #{id}
            </button>
          ))}
        </div>

        {error && (
          <p className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-2.5 border border-red-100">{error}</p>
        )}
      </SectionCard>

      {/* Profile result */}
      {profile && (
        <div className="space-y-4 animate-slide-up">

          {/* Header */}
          <div className="card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl font-display font-bold text-xl text-white flex-shrink-0"
                   style={{ background: `linear-gradient(135deg, ${profile.color}, ${profile.color}99)` }}>
                {profile.id.slice(-2)}
              </div>
              <div>
                <p className="font-display font-bold text-slate-800 text-lg leading-none">
                  Customer #{profile.id}
                </p>
                <div className="mt-1.5">
                  <SegmentBadge segment={profile.segment} />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-semibold text-xs">
                RFM Score: {profile.rfm_score}
              </span>
              <span className="bg-brand-50 text-brand-700 px-3 py-1 rounded-full font-semibold text-xs
                               ring-1 ring-brand-200">
                Total: {profile.rfm_total}/12
              </span>
            </div>
          </div>

          {/* RFM metrics */}
          <div className="grid grid-cols-3 gap-4">
            {rfmMetrics.map(m => (
              <div key={m.label} className="card flex items-center gap-3">
                <div className={`h-10 w-10 flex items-center justify-center rounded-xl ${m.bg} flex-shrink-0`}>
                  <m.icon size={18} className={m.color} />
                </div>
                <div>
                  <p className="text-xs text-slate-400">{m.label}</p>
                  <p className="font-display font-bold text-slate-800">{m.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Scores row */}
          <div className="card">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Individual RFM Scores (1–4)
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'R Score', val: profile.r_score, color: '#7c5bf1' },
                { label: 'F Score', val: profile.f_score, color: '#10b981' },
                { label: 'M Score', val: profile.m_score, color: '#f59e0b' },
              ].map(s => (
                <div key={s.label}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-500">{s.label}</span>
                    <span className="font-bold" style={{ color: s.color }}>{s.val}/4</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500"
                         style={{ width: `${(s.val / 4) * 100}%`, background: s.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Purchase history */}
          <SectionCard
            title="Purchase History"
            subtitle={`${profile.history.length} transactions — most recent first`}
            action={
              <span className="text-xs text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full font-medium">
                <ShoppingBag size={11} className="inline mr-1" />
                {profile.history.length} orders
              </span>
            }
          >
            <div className="overflow-x-auto scrollbar-thin -mx-1">
              <table className="w-full text-sm min-w-[500px]">
                <thead>
                  <tr className="border-b border-slate-100">
                    {['Invoice', 'Date', 'Description', 'Qty', 'Unit Price', 'Total'].map(h => (
                      <th key={h} className="text-left py-2.5 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {profile.history.map((row, i) => (
                    <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/60 transition">
                      <td className="py-3 px-3 font-mono text-xs text-brand-600 font-semibold">{row.invoice}</td>
                      <td className="py-3 px-3 text-slate-500 text-xs">{row.date}</td>
                      <td className="py-3 px-3 text-slate-700 font-medium max-w-[200px] truncate">{row.description}</td>
                      <td className="py-3 px-3 text-slate-600">{row.qty}</td>
                      <td className="py-3 px-3 text-slate-500">£{row.price.toFixed(2)}</td>
                      <td className="py-3 px-3 font-semibold text-slate-800">£{row.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </div>
      )}
    </div>
  )
}
