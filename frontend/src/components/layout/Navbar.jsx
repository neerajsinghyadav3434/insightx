import { useState } from 'react'
import { Search, Bell, ChevronDown, Upload, CheckCircle2, Loader2 } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useData } from '@/context/DataContext'

const PAGE_TITLES = {
  '/dashboard':       { title: 'Dashboard',         subtitle: 'Overview & key metrics' },
  '/customers':       { title: 'Customers',          subtitle: 'Customer profiles & history' },
  '/segmentation':    { title: 'Segmentation',       subtitle: 'RFM analysis & K-Means clusters' },
  '/recommendations': { title: 'Recommendations',    subtitle: 'Product recommendation engine' },
  '/insights':        { title: 'Deep-Dive Insights', subtitle: 'Trends, patterns & raw data' },
}

export default function Navbar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const meta = PAGE_TITLES[pathname] ?? { title: 'InsightX', subtitle: '' }
  const [query, setQuery] = useState('')
  const { status, fileName, reset } = useData()
  const isProcessing = status === 'uploading' || status === 'processing'

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between
                        bg-white/80 backdrop-blur border-b border-slate-100
                        px-6 gap-4">

      {/* Page title */}
      <div className="min-w-0">
        <h1 className="text-base font-display font-bold text-slate-800 leading-none truncate">
          {meta.title}
        </h1>
        <p className="text-xs text-slate-400 mt-0.5 truncate">{meta.subtitle}</p>
      </div>

      {/* Search + actions */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {/* Search */}
        <div className="hidden sm:flex items-center gap-2 bg-slate-50 border border-slate-200
                        rounded-xl px-3 py-1.5 w-52 focus-within:border-brand-400
                        focus-within:ring-2 focus-within:ring-brand-100 transition-all">
          <Search size={13} className="text-slate-400 flex-shrink-0" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search…"
            className="bg-transparent text-sm text-slate-700 placeholder-slate-400
                       outline-none w-full"
          />
        </div>

        {/* Data status chip */}
        {isProcessing ? (
          <span className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-brand-600
                          bg-brand-50 border border-brand-200 px-2.5 py-1 rounded-full">
            <Loader2 size={11} className="animate-spin" /> Processing…
          </span>
        ) : status === 'ready' ? (
          <button onClick={() => { reset(); navigate('/dashboard') }}
                  title={`${fileName} loaded · click to re-upload`}
                  className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-emerald-700
                             bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full
                             hover:bg-emerald-100 transition max-w-[160px]">
            <CheckCircle2 size={11} /> <span className="truncate">{fileName}</span>
          </button>
        ) : (
          <button onClick={() => navigate('/dashboard')}
                  className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-500
                             bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-full
                             hover:bg-brand-50 hover:text-brand-700 hover:border-brand-200 transition">
            <Upload size={11} /> Upload Data
          </button>
        )}

        {/* Notifications */}
        <button className="relative flex h-9 w-9 items-center justify-center rounded-xl
                           border border-slate-200 bg-white hover:bg-slate-50 transition">
          <Bell size={15} className="text-slate-500" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full
                           bg-brand-500 ring-2 ring-white" />
        </button>

        {/* User */}
        <button className="flex items-center gap-2 rounded-xl border border-slate-200
                           bg-white px-3 py-1.5 hover:bg-slate-50 transition">
          <div className="flex h-7 w-7 items-center justify-center rounded-full
                          bg-gradient-to-br from-brand-500 to-purple-500 text-white
                          text-xs font-bold flex-shrink-0">
            NY
          </div>
          <span className="hidden md:block text-sm font-medium text-slate-700">Neeraj</span>
          <ChevronDown size={13} className="text-slate-400 hidden md:block" />
        </button>
      </div>
    </header>
  )
}
