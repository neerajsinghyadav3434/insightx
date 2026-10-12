import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts'
import SectionCard from '@/components/ui/SectionCard'
import ConditionalRenderer from './ConditionalRenderer'
import { SkeletonChart } from '@/components/ui/SkeletonCard'

function ChartTip({ active, payload, label, prefix = '' }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-slate-100 rounded-xl shadow-card-lg px-3 py-2 text-sm">
      <p className="text-xs text-slate-400 mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="font-semibold" style={{ color: p.color || '#7c5bf1' }}>
          {prefix}{typeof p.value === 'number' ? p.value.toLocaleString() : p.value}
        </p>
      ))}
    </div>
  )
}

export default function ChartsSection({ metrics, features, loading = false }) {
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <SkeletonChart height={230} className="xl:col-span-2" />
          <SkeletonChart height={230} />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <SkeletonChart height={220} />
          <SkeletonChart height={220} />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">

      {/* Row 1: Revenue trend + Segment pie */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

        <ConditionalRenderer show={features.hasTimeSeries} label="revenue trend" hideWhenMissing={false}>
          <SectionCard title="Monthly Revenue" subtitle="Revenue over time" className="xl:col-span-2">
            <ResponsiveContainer width="100%" height={230}>
              <LineChart data={metrics.monthlyRevenue || []} margin={{ top: 5, right: 10, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="revLine" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7c5bf1" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="#7c5bf1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false}
                       tickFormatter={v => v >= 1000 ? `£${(v / 1000).toFixed(0)}k` : `£${v}`} />
                <Tooltip content={<ChartTip prefix="£" />} />
                <Line type="monotone" dataKey="revenue" stroke="#7c5bf1" strokeWidth={2.5}
                      dot={{ r: 4, fill: '#7c5bf1', strokeWidth: 0 }}
                      activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </SectionCard>
        </ConditionalRenderer>

        {!features.hasTimeSeries && (
          <ConditionalRenderer show={false} label="revenue trend" />
        )}

        <ConditionalRenderer show={features.hasSegmentation} label="customer segments">
          <SectionCard title="Customer Segments" subtitle="K-Means · 4 clusters">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={metrics.segmentData || []} cx="50%" cy="50%"
                     innerRadius={52} outerRadius={78} paddingAngle={3} dataKey="value">
                  {(metrics.segmentData || []).map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip formatter={(v, name) => [v.toLocaleString(), name]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-1">
              {(metrics.segmentData || []).map(s => (
                <div key={s.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: s.color }} />
                    <span className="text-xs text-slate-600 font-medium">{s.name}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-700">
                    {s.value.toLocaleString()}
                    <span className="text-slate-400 font-normal ml-1">({s.pct})</span>
                  </span>
                </div>
              ))}
            </div>
          </SectionCard>
        </ConditionalRenderer>

      </div>

      {/* Row 2: Top products + Revenue by day */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">

        <ConditionalRenderer show={features.hasProducts && !!(metrics.topProducts?.length)} label="product data">
          <SectionCard title="Top Products by Revenue" subtitle="From uploaded dataset">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={metrics.topProducts || []}
                layout="vertical"
                margin={{ top: 0, right: 16, bottom: 0, left: 0 }}
              >
                <defs>
                  <linearGradient id="prodGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#7c5bf1" />
                    <stop offset="100%" stopColor="#a78bfa" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false}
                       tickFormatter={v => v >= 1000 ? `£${(v / 1000).toFixed(0)}k` : `£${v}`} />
                <YAxis type="category" dataKey="name" width={130}
                       tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTip prefix="£" />} />
                <Bar dataKey="revenue" radius={[0, 6, 6, 0]} fill="url(#prodGrad)" maxBarSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </SectionCard>
        </ConditionalRenderer>

        <ConditionalRenderer show={features.hasTimeSeries} label="day-of-week data">
          <SectionCard title="Revenue by Day of Week" subtitle="Weekly sales pattern">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={metrics.revenueByDay || []} margin={{ top: 0, right: 8, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false}
                       tickFormatter={v => v >= 1000 ? `£${(v / 1000).toFixed(0)}k` : `£${v}`} />
                <Tooltip content={<ChartTip prefix="£" />} />
                <Bar dataKey="revenue" radius={[6, 6, 0, 0]} fill="#10b981" opacity={0.85} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </SectionCard>
        </ConditionalRenderer>

      </div>
    </div>
  )
}
