import { useData } from '@/context/DataContext'
import UploadSection from '@/components/upload/UploadSection'
import KPISection from '@/components/dashboard/KPISection'
import ChartsSection from '@/components/dashboard/ChartsSection'
import SectionCard from '@/components/ui/SectionCard'
import SegmentBadge from '@/components/ui/SegmentBadge'
import EmptyState from '@/components/ui/EmptyState'
import { AlertTriangle, RefreshCw, Upload, CheckCircle2 } from 'lucide-react'

// ── Segment summary table (from computed segmentData) ─────────────────────────
function SegmentTable({ segmentData }) {
  if (!segmentData?.length) return null
  const maxVal = Math.max(...segmentData.map(s => s.value))
  return (
    <SectionCard title="Segment Overview" subtitle="Distribution from uploaded dataset">
      <div className="overflow-x-auto scrollbar-thin -mx-1">
        <table className="w-full text-sm min-w-[420px]">
          <thead>
            <tr className="border-b border-slate-100">
              {['Segment', 'Customers', 'Share', 'Weight'].map(h => (
                <th key={h} className="text-left py-2.5 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {segmentData.map((row) => (
              <tr key={row.name} className="border-b border-slate-50 hover:bg-slate-50/60 transition">
                <td className="py-3 px-3"><SegmentBadge segment={row.name} size="sm" /></td>
                <td className="py-3 px-3 font-semibold text-slate-700">{row.value.toLocaleString()}</td>
                <td className="py-3 px-3 text-slate-500">{row.pct}</td>
                <td className="py-3 px-3">
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${(row.value / maxVal) * 100}%`, background: row.color }} />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  )
}

// ── Error banner ──────────────────────────────────────────────────────────────
function ErrorBanner({ message, onReset }) {
  return (
    <div className="card border-red-100 bg-red-50 flex items-start gap-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 flex-shrink-0">
        <AlertTriangle size={18} className="text-red-500" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-red-700 text-sm">Processing failed</p>
        <p className="text-xs text-red-500 mt-0.5 break-words">{message}</p>
      </div>
      <button onClick={onReset}
              className="flex items-center gap-1.5 text-xs font-semibold text-red-600
                         hover:text-red-800 border border-red-200 bg-white px-3 py-1.5
                         rounded-lg hover:bg-red-50 transition flex-shrink-0">
        <RefreshCw size={12} /> Try again
      </button>
    </div>
  )
}

// ── Main Dashboard ────────────────────────────────────────────────────────────
export default function Dashboard() {
  const { status, fileName, rowCount, metrics, features, error, reset } = useData()
  const loading = status === 'uploading' || status === 'processing'

  return (
    <div className="space-y-6 animate-slide-up">

      {/* ── Welcome banner ── */}
      <div className="rounded-2xl bg-gradient-to-r from-brand-700 via-brand-600 to-purple-600
                      px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4
                      shadow-card-lg overflow-hidden relative">
        <div className="pointer-events-none absolute inset-0 opacity-10"
             style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, white, transparent 60%)' }} />
        <div className="relative z-10">
          <h2 className="text-white font-display font-bold text-xl leading-snug">
            {status === 'ready' ? `Analysing: ${fileName}` : 'Customer Intelligence Dashboard'}
          </h2>
          <p className="text-brand-200 text-sm mt-1">
            {status === 'ready'
              ? `${rowCount.toLocaleString()} rows processed · insights rendered from your data`
              : 'Upload a dataset below to unlock dynamic analytics.'}
          </p>
        </div>
        <div className="relative z-10 flex gap-2 flex-shrink-0 flex-wrap">
          {status === 'ready' ? (
            <>
              <span className="bg-emerald-500/20 text-emerald-100 text-xs font-semibold px-3 py-1.5 rounded-full
                              backdrop-blur ring-1 ring-emerald-400/30 flex items-center gap-1.5">
                <CheckCircle2 size={11} /> Live Data
              </span>
              <button onClick={reset}
                      className="bg-white/15 hover:bg-white/25 text-white text-xs font-semibold
                                 px-3 py-1.5 rounded-full ring-1 ring-white/20 flex items-center gap-1.5
                                 transition backdrop-blur">
                <Upload size={11} /> Upload New
              </button>
            </>
          ) : (
            <span className="bg-white/15 text-white text-xs font-semibold px-3 py-1.5 rounded-full
                            backdrop-blur ring-1 ring-white/20">
              No data loaded
            </span>
          )}
        </div>
      </div>

      {/* ── Error state ── */}
      {status === 'error' && <ErrorBanner message={error} onReset={reset} />}

      {/* ── Idle — show upload section ── */}
      {status === 'idle' && <UploadSection />}

      {/* ── Loading / ready — show KPIs + charts ── */}
      {(loading || status === 'ready') && (
        <>
          <KPISection metrics={metrics} features={features} loading={loading} />
          <ChartsSection metrics={metrics} features={features} loading={loading} />
          {status === 'ready' && features.hasSegmentation && (
            <SegmentTable segmentData={metrics.segmentData} />
          )}
          {status === 'ready' && !features.hasRevenue && !features.hasCustomers && (
            <div className="card">
              <EmptyState
                message="No recognisable columns detected"
                hint="Ensure your file contains columns like CustomerID, Quantity, UnitPrice, InvoiceDate, or Description."
              />
            </div>
          )}
        </>
      )}

    </div>
  )
}
