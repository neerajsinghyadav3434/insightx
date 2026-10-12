import { useNavigate } from 'react-router-dom'
import {
  Zap, BarChart3, Users, Sparkles, Brain,
  ArrowRight, Upload, TrendingUp, Shield,
  ChevronRight, Database, Cpu,
} from 'lucide-react'

const FEATURES = [
  {
    icon: BarChart3, color: 'text-brand-500', bg: 'bg-brand-50',
    title: 'Smart Analytics',
    desc: 'Instant revenue KPIs, trend lines, and product performance from any dataset.',
  },
  {
    icon: Users, color: 'text-emerald-500', bg: 'bg-emerald-50',
    title: 'Customer Segmentation',
    desc: 'RFM-based K-Means clustering automatically segments customers into VIP, Loyal, At-Risk, and New.',
  },
  {
    icon: Sparkles, color: 'text-amber-500', bg: 'bg-amber-50',
    title: 'Dynamic Insights',
    desc: 'Charts and sections appear only when the data supports them — zero broken UI.',
  },
  {
    icon: Brain, color: 'text-purple-500', bg: 'bg-purple-50',
    title: 'No-Code Experience',
    desc: 'Upload CSV or Excel, the engine detects columns automatically. No config required.',
  },
]

const STEPS = [
  { icon: Upload,    num: '01', title: 'Upload Dataset',   desc: 'Drag & drop your CSV or Excel file. Supports Online Retail, e-commerce exports, and custom formats.' },
  { icon: Cpu,       num: '02', title: 'Auto-Processing',  desc: 'Column detection, RFM scoring, and aggregations run entirely in-browser — instant & private.' },
  { icon: TrendingUp, num: '03', title: 'Explore Insights', desc: 'Dynamic dashboard renders only what your data supports. Every insight is real and actionable.' },
]

const STATS = [
  { value: '1M+',  label: 'Rows Supported'     },
  { value: '4',    label: 'Smart Segments'      },
  { value: '100%', label: 'Client-Side Private' },
  { value: '~1s',  label: 'Processing Time'     },
]

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">

      {/* ── Navbar ── */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl
                            bg-gradient-to-br from-brand-500 to-purple-600 shadow-sm">
              <Zap size={15} className="text-white" />
            </div>
            <span className="font-display font-bold text-slate-800 text-lg">InsightX</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/dashboard')}
                    className="text-sm font-medium text-slate-500 hover:text-slate-800 transition px-3 py-2">
              Dashboard
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-1.5 bg-brand-600 hover:bg-brand-700 text-white
                         text-sm font-semibold px-4 py-2 rounded-xl transition-all shadow-sm
                         hover:shadow-md active:scale-95"
            >
              Launch App <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background gradients */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px]
                          bg-gradient-to-b from-brand-100/60 via-purple-50/40 to-transparent
                          rounded-full blur-3xl" />
          <div className="absolute top-20 right-0 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl" />
          <div className="absolute top-40 left-0 w-64 h-64 bg-brand-200/20 rounded-full blur-3xl" />
          {/* Grid dots */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.035]"
               xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="#6366f1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-200
                          text-brand-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse" />
            AI-Powered Customer Analytics
          </div>

          <h1 className="font-display font-extrabold text-5xl sm:text-6xl text-slate-900
                         leading-[1.1] tracking-tight mb-6">
            Turn Your Data Into{' '}
            <span className="text-gradient">Actionable Insights</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Upload your e-commerce dataset and get instant customer segmentation,
            revenue analytics, and product recommendations — all in your browser.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="group flex items-center gap-2 bg-gradient-to-r from-brand-600 to-purple-600
                         hover:from-brand-700 hover:to-purple-700 text-white font-semibold
                         px-8 py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl
                         active:scale-95 text-base"
            >
              Get Started Free
              <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 text-slate-600 hover:text-brand-700
                         font-semibold px-6 py-3.5 rounded-xl border border-slate-200
                         hover:border-brand-300 bg-white hover:bg-brand-50 transition-all text-base"
            >
              <Database size={15} />
              View Demo Dashboard
            </button>
          </div>

          {/* Mini dashboard preview */}
          <div className="mt-16 relative max-w-3xl mx-auto">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-[0_20px_60px_-15px_rgba(99,91,241,0.2)]
                            overflow-hidden">
              {/* Fake browser bar */}
              <div className="bg-slate-100 border-b border-slate-200 px-4 py-2.5 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-amber-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 bg-white rounded-md h-5 text-[10px] text-slate-400
                               flex items-center justify-center border border-slate-200">
                  localhost:3000/dashboard
                </div>
              </div>
              {/* Fake KPIs */}
              <div className="p-4 bg-surface-soft">
                <div className="grid grid-cols-4 gap-3 mb-4">
                  {[
                    { label: 'Revenue', val: '£947k', color: '#7c5bf1' },
                    { label: 'Customers', val: '4,372', color: '#10b981' },
                    { label: 'Avg Order', val: '£312', color: '#f59e0b' },
                    { label: 'Orders', val: '25.9k', color: '#3b82f6' },
                  ].map(k => (
                    <div key={k.label} className="bg-white rounded-xl p-3 border border-slate-100 shadow-sm">
                      <p className="text-[10px] text-slate-400 mb-1">{k.label}</p>
                      <p className="text-base font-bold" style={{ color: k.color }}>{k.val}</p>
                    </div>
                  ))}
                </div>
                {/* Fake chart bars */}
                <div className="bg-white rounded-xl p-3 border border-slate-100 shadow-sm">
                  <p className="text-[10px] text-slate-400 mb-3">Monthly Revenue</p>
                  <div className="flex items-end gap-1.5 h-14">
                    {[35,52,44,68,59,74,70,82,88,94,110,130].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t-sm"
                           style={{
                             height: `${(h / 130) * 100}%`,
                             background: `linear-gradient(to top, #7c5bf1, #a78bfa)`,
                             opacity: 0.7 + (i / 24),
                           }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Glow underneath */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-10
                            bg-brand-400/20 blur-xl rounded-full" />
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-12 border-y border-slate-100 bg-slate-50/50">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {STATS.map(s => (
            <div key={s.label} className="text-center">
              <p className="font-display font-bold text-3xl text-brand-600 mb-1">{s.value}</p>
              <p className="text-sm text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-widest text-brand-500 uppercase mb-3">Features</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900">
              Everything you need to understand your customers
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {FEATURES.map(f => (
              <div key={f.title}
                   className="bg-white rounded-2xl border border-slate-100 p-6
                              hover:shadow-card-lg hover:border-brand-100 transition-all group">
                <div className={`h-11 w-11 rounded-xl ${f.bg} flex items-center justify-center mb-4
                                group-hover:scale-110 transition-transform`}>
                  <f.icon size={20} className={f.color} />
                </div>
                <h3 className="font-display font-semibold text-slate-800 text-lg mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it Works ── */}
      <section className="py-20 px-6 bg-slate-50/60">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-widest text-brand-500 uppercase mb-3">Process</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900">
              From raw data to insights in seconds
            </h2>
          </div>
          <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Connecting line (desktop) */}
            <div className="hidden sm:block absolute top-10 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)]
                            h-0.5 bg-gradient-to-r from-brand-200 via-brand-400 to-brand-200" />
            {STEPS.map((step, i) => (
              <div key={step.num} className="relative flex flex-col items-center text-center">
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl
                                bg-gradient-to-br from-brand-600 to-purple-600 shadow-lg mb-5">
                  <step.icon size={22} className="text-white" />
                  <span className="absolute -top-2 -right-2 h-5 w-5 bg-white border-2 border-brand-500
                                   rounded-full text-[9px] font-bold text-brand-600 flex items-center
                                   justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-slate-800 mb-2">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r
                          from-brand-700 via-brand-600 to-purple-600 px-8 py-14 text-center">
            <div className="pointer-events-none absolute inset-0 opacity-10"
                 style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, white, transparent 60%)' }} />
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Shield size={16} className="text-brand-200" />
                <span className="text-brand-200 text-sm">100% client-side · Your data never leaves your browser</span>
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4">
                Ready to unlock your customer data?
              </h2>
              <p className="text-brand-200 text-lg mb-8 max-w-xl mx-auto">
                Upload your dataset and get your full analytics dashboard in under a minute.
              </p>
              <button
                onClick={() => navigate('/dashboard')}
                className="inline-flex items-center gap-2 bg-white text-brand-700 font-bold
                           px-8 py-3.5 rounded-xl hover:bg-brand-50 transition-all shadow-lg
                           hover:shadow-xl active:scale-95 text-base"
              >
                Get Started Now <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-100 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg
                            bg-gradient-to-br from-brand-500 to-purple-600">
              <Zap size={12} className="text-white" />
            </div>
            <span className="font-display font-bold text-slate-700">InsightX</span>
          </div>
          <p className="text-slate-400 text-sm">
            E-Commerce Customer Intelligence Platform · Built with React + Tailwind
          </p>
          <p className="text-slate-400 text-sm">
            UCI Online Retail II Dataset
          </p>
        </div>
      </footer>

    </div>
  )
}
