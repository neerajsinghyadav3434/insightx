import { useState } from 'react'
import { Search, Sparkles, Star, TrendingUp, Package } from 'lucide-react'
import SectionCard from '@/components/ui/SectionCard'
import { productRecs, productCatalogue, popularProducts } from '@/data/mockData'

// Deterministic fallback: shuffle catalogue by char-code seed, assign declining scores
function generateFallbackRecs(productName) {
  const seed = productName.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  const pool = productCatalogue.filter(p => p !== productName)
  const shuffled = [...pool].sort((a, b) => {
    const ha = (seed * a.length * 31) % 97
    const hb = (seed * b.length * 31) % 97
    return hb - ha
  })
  return shuffled.slice(0, 5).map((product, i) => ({
    product,
    score: Math.max(55, 88 - i * 7),
    count: Math.max(400, 1200 - i * 180 - (seed % 200)),
  }))
}

export default function Recommendations() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const [recs, setRecs] = useState(null)
  const [loading, setLoading] = useState(false)

  const matches = query.trim()
    ? productCatalogue.filter(p => p.toLowerCase().includes(query.toLowerCase().trim()))
    : []

  function loadRecs(product) {
    const name = product.trim().toUpperCase()
    setSelected(name)
    setQuery(name)
    setLoading(true)
    setRecs(null)
    setTimeout(() => {
      // Exact match first, then case-insensitive, then fallback generation
      const exactKey = Object.keys(productRecs).find(
        k => k.toUpperCase() === name
      )
      setRecs(exactKey ? productRecs[exactKey] : generateFallbackRecs(name))
      setLoading(false)
    }, 500)
  }

  function handleRecommend() {
    const trimmed = query.trim()
    if (!trimmed) return
    // If a dropdown match exists, prefer first match; otherwise use whatever is typed
    loadRecs(matches.length > 0 ? matches[0] : trimmed)
  }

  return (
    <div className="space-y-6 animate-slide-up">

      {/* Search */}
      <SectionCard
        title="Product-Based Recommendations"
        subtitle="Type a product name to get 'frequently bought together' suggestions"
      >
        <div className="flex gap-3 flex-wrap">
          <div className="flex-1 min-w-[220px] relative">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200
                            rounded-xl px-4 py-2.5 focus-within:border-brand-400
                            focus-within:ring-2 focus-within:ring-brand-100 transition-all">
              <Search size={15} className="text-slate-400 flex-shrink-0" />
              <input
                value={query}
                onChange={e => { setQuery(e.target.value); setSelected(null); setRecs(null) }}
                placeholder="e.g. WHITE HANGING HEART"
                className="flex-1 bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none"
              />
            </div>
            {matches.length > 0 && !selected && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200
                              rounded-xl shadow-card-lg z-10 overflow-hidden">
                {matches.map(p => (
                  <button key={p} onClick={() => loadRecs(p)}
                          className="w-full text-left px-4 py-2.5 text-sm text-slate-700
                                     hover:bg-brand-50 hover:text-brand-700 transition flex items-center gap-2">
                    <Package size={13} className="text-slate-400 flex-shrink-0" />
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button onClick={handleRecommend} disabled={!query.trim()}
                  className="btn-primary flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed">
            <Sparkles size={14} />
            Recommend
          </button>
        </div>

        {/* Quick samples — show first 6 keys from productRecs (guaranteed to have rich data) */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs text-slate-400">Try:</span>
          {Object.keys(productRecs).slice(0, 6).map(p => (
            <button key={p} onClick={() => loadRecs(p)}
                    className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-brand-50 hover:text-brand-700
                               text-xs font-medium text-slate-600 border border-transparent
                               hover:border-brand-200 transition truncate max-w-[220px]">
              {p.split(' ').slice(0, 3).join(' ')}…
            </button>
          ))}
        </div>
      </SectionCard>

      {/* Results */}
      {loading && (
        <div className="card flex items-center justify-center h-32">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 rounded-full border-2 border-brand-300 border-t-brand-600
                            animate-spin" />
            <p className="text-sm text-slate-400">Building recommendations…</p>
          </div>
        </div>
      )}

      {recs && !loading && (
        <div className="space-y-4 animate-slide-up">
          <SectionCard
            title={`Recommendations for: ${selected}`}
            subtitle={`${recs.length} products frequently bought together`}
            action={
              <span className="text-xs bg-brand-50 text-brand-700 px-2.5 py-1 rounded-full
                              font-semibold ring-1 ring-brand-200">
                Co-occurrence engine
              </span>
            }
          >
            {recs.length === 0 ? (
              <p className="text-sm text-slate-400">No co-purchase data found for this product.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {recs.map((rec, i) => (
                  <div key={i}
                       className="rounded-xl border border-slate-100 bg-slate-50/60 p-4
                                  hover:border-brand-200 hover:bg-brand-50/40 hover:shadow-card
                                  transition-all group cursor-pointer">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg
                                      bg-brand-100 group-hover:bg-brand-200 transition flex-shrink-0">
                        <Sparkles size={14} className="text-brand-600" />
                      </div>
                      <span className="text-xs bg-white border border-slate-200 text-slate-600
                                       px-2 py-0.5 rounded-full font-semibold">
                        #{i + 1}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-slate-800 leading-snug mb-3">
                      {rec.product}
                    </p>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-400">Match Score</span>
                          <span className="font-bold text-brand-600">{rec.score}%</span>
                        </div>
                        <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-purple-400"
                               style={{ width: `${rec.score}%` }} />
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-400">
                        <TrendingUp size={11} />
                        <span>{rec.count.toLocaleString()} co-purchases</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>
        </div>
      )}

      {/* Popular products */}
      <SectionCard
        title="Most Popular Products"
        subtitle="Top sellers by total revenue"
        action={
          <span className="text-xs text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full font-medium">
            <Star size={11} className="inline mr-1" />
            All time
          </span>
        }
      >
        <div className="space-y-3">
          {popularProducts.map((p, i) => (
            <div key={i} className="flex items-center gap-4 py-2 border-b border-slate-50 last:border-0">
              <span className="text-xs font-bold text-slate-400 w-5 flex-shrink-0 text-right">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-700 truncate">{p.name}</p>
                <p className="text-xs text-slate-400">{p.orders.toLocaleString()} orders</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-bold text-slate-800">
                  £{(p.revenue / 1000).toFixed(0)}k
                </p>
                <div className="mt-1 h-1 w-16 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-brand-400 to-purple-400"
                       style={{ width: `${(p.revenue / popularProducts[0].revenue) * 100}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  )
}
