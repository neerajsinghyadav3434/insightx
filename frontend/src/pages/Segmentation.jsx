import { useState } from 'react'
import {
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip,
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ZAxis,
} from 'recharts'
import SectionCard from '@/components/ui/SectionCard'
import SegmentBadge from '@/components/ui/SegmentBadge'
import { segmentData, segmentStats } from '@/data/mockData'

const METRICS = ['Monetary', 'Frequency', 'Recency']

// Simulated scatter data per segment
const SCATTER = [
  ...Array.from({ length: 80 }, (_, i) => ({ x: Math.random() * 30 + 1, y: Math.random() * 300 + 100, z: 2, seg: '🌟 VIP' })),
  ...Array.from({ length: 180 }, (_, i) => ({ x: Math.random() * 60 + 20, y: Math.random() * 120 + 40, z: 2, seg: '💚 Loyal' })),
  ...Array.from({ length: 200 }, (_, i) => ({ x: Math.random() * 200 + 80, y: Math.random() * 30 + 5, z: 2, seg: '⚠️ At-Risk' })),
  ...Array.from({ length: 180 }, (_, i) => ({ x: Math.random() * 150 + 40, y: Math.random() * 15 + 1, z: 2, seg: '🆕 New' })),
]

const SEG_COLORS = {
  '🌟 VIP':     '#7c5bf1',
  '💚 Loyal':   '#10b981',
  '⚠️ At-Risk': '#f59e0b',
  '🆕 New':     '#3b82f6',
}

// Box plot mock data per segment per metric
const BOX_DATA = {
  Monetary: [
    { segment: 'VIP',     q1: 2100, median: 3800, q3: 5400, min: 900,  max: 12000 },
    { segment: 'Loyal',   q1: 600,  median: 1200, q3: 1900, min: 200,  max: 4200  },
    { segment: 'At-Risk', q1: 80,   median: 180,  q3: 320,  min: 20,   max: 900   },
    { segment: 'New',     q1: 20,   median: 44,   q3: 90,   min: 5,    max: 300   },
  ],
  Frequency: [
    { segment: 'VIP',     q1: 85,  median: 142, q3: 190, min: 40,  max: 360 },
    { segment: 'Loyal',   q1: 22,  median: 48,  q3: 78,  min: 8,   max: 150 },
    { segment: 'At-Risk', q1: 4,   median: 9,   q3: 16,  min: 1,   max: 40  },
    { segment: 'New',     q1: 1,   median: 2,   q3: 4,   min: 1,   max: 10  },
  ],
  Recency: [
    { segment: 'VIP',     q1: 5,   median: 14,  q3: 28,  min: 1,   max: 60  },
    { segment: 'Loyal',   q1: 18,  median: 38,  q3: 65,  min: 6,   max: 120 },
    { segment: 'At-Risk', q1: 90,  median: 167, q3: 240, min: 60,  max: 365 },
    { segment: 'New',     q1: 40,  median: 92,  q3: 160, min: 10,  max: 340 },
  ],
}

export default function Segmentation() {
  const [metric, setMetric] = useState('Monetary')
  const boxRows = BOX_DATA[metric]

  return (
    <div className="space-y-6 animate-slide-up">

      {/* Overview row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">

        {/* Pie */}
        <SectionCard title="Segment Distribution" subtitle="4-cluster K-Means on RFM features">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <ResponsiveContainer width={180} height={180}>
              <PieChart>
                <Pie data={segmentData} cx="50%" cy="50%" innerRadius={48} outerRadius={72}
                     paddingAngle={3} dataKey="value">
                  {segmentData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip formatter={(v) => [v.toLocaleString(), 'Customers']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2.5 w-full">
              {segmentStats.map(s => (
                <div key={s.segment} className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: s.color }} />
                  <div className="flex-1">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-600 font-medium truncate max-w-[140px]">{s.segment}</span>
                      <span className="text-slate-700 font-bold ml-2">{s.customers.toLocaleString()}</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full"
                           style={{ width: `${(s.customers / 4372) * 100}%`, background: s.color }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        {/* RFM scatter */}
        <SectionCard title="Recency vs Monetary (Scatter)" subtitle="Sample of 640 customers">
          <ResponsiveContainer width="100%" height={220}>
            <ScatterChart margin={{ top: 5, right: 10, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis type="number" dataKey="x" name="Recency (days)"
                     tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis type="number" dataKey="y" name="Monetary (£)"
                     tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <ZAxis range={[20, 20]} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }}
                       formatter={(v, name) => [v, name]}
                       labelFormatter={() => ''} />
              {Object.entries(SEG_COLORS).map(([seg, color]) => (
                <Scatter
                  key={seg}
                  name={seg}
                  data={SCATTER.filter(d => d.seg === seg)}
                  fill={color}
                  opacity={0.7}
                />
              ))}
            </ScatterChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-1">
            {Object.entries(SEG_COLORS).map(([seg, color]) => (
              <span key={seg} className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className="h-2 w-2 rounded-full" style={{ background: color }} />
                {seg}
              </span>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Segment stats table */}
      <SectionCard title="Segment Statistics" subtitle="Average RFM metrics per cluster">
        <div className="overflow-x-auto scrollbar-thin -mx-1">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="border-b border-slate-100">
                {['Segment', 'Customers', 'Avg Recency', 'Avg Frequency', 'Avg Monetary', 'Total Revenue'].map(h => (
                  <th key={h} className="text-left py-2.5 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {segmentStats.map((row, i) => (
                <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/60 transition">
                  <td className="py-3 px-3"><SegmentBadge segment={row.segment} size="sm" /></td>
                  <td className="py-3 px-3 font-bold text-slate-700">{row.customers.toLocaleString()}</td>
                  <td className="py-3 px-3 text-slate-500">{row.avgRecency} days</td>
                  <td className="py-3 px-3 text-slate-500">{row.avgFrequency}</td>
                  <td className="py-3 px-3 text-slate-500">£{row.avgMonetary.toLocaleString()}</td>
                  <td className="py-3 px-3 font-semibold text-slate-800">£{(row.totalRevenue / 1000).toFixed(0)}k</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {/* Box plot simulation */}
      <SectionCard
        title="Metric Distribution by Segment"
        subtitle="Approximate quartile ranges"
        action={
          <div className="flex gap-1">
            {METRICS.map(m => (
              <button key={m} onClick={() => setMetric(m)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition
                        ${metric === m
                          ? 'bg-brand-600 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
                {m}
              </button>
            ))}
          </div>
        }
      >
        <div className="space-y-5 pt-1">
          {boxRows.map((row, i) => {
            const seg = segmentStats[i]
            const span = row.max - row.min || 1
            const q1pct  = ((row.q1  - row.min) / span) * 100
            const medpct = ((row.median - row.min) / span) * 100
            const q3pct  = ((row.q3  - row.min) / span) * 100
            return (
              <div key={row.segment} className="flex items-center gap-4">
                <span className="text-xs font-semibold text-slate-500 w-16 flex-shrink-0 text-right">
                  {row.segment}
                </span>
                <div className="flex-1 h-7 relative">
                  <div className="absolute inset-y-0 left-0 right-0 flex items-center">
                    <div className="w-full h-1 bg-slate-100 rounded-full" />
                  </div>
                  <div className="absolute inset-y-0 flex items-center"
                       style={{ left: `${q1pct}%`, width: `${q3pct - q1pct}%` }}>
                    <div className="w-full h-5 rounded-lg opacity-70 border-2 flex-shrink-0"
                         style={{ background: seg?.color + '33', borderColor: seg?.color }} />
                  </div>
                  <div className="absolute top-1/2 -translate-y-1/2 w-0.5 h-5 rounded"
                       style={{ left: `${medpct}%`, background: seg?.color }} />
                </div>
                <div className="text-xs text-slate-400 w-20 flex-shrink-0">
                  <span className="font-semibold text-slate-600">
                    {metric === 'Monetary' ? `£${row.median.toLocaleString()}` : row.median}
                  </span>
                  <span className="ml-1">median</span>
                </div>
              </div>
            )
          })}
        </div>
        <p className="text-xs text-slate-400 mt-3">
          Bar = IQR (Q1–Q3) · Vertical line = Median · Scale is relative per segment
        </p>
      </SectionCard>

      {/* Elbow insight card */}
      <SectionCard title="Why k=4?" subtitle="Elbow method + Silhouette score analysis">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { k: 2, inertia: 2140, sil: 0.31 },
            { k: 3, inertia: 1520, sil: 0.38 },
            { k: 4, inertia: 1140, sil: 0.44, best: true },
            { k: 5, inertia: 980,  sil: 0.41 },
          ].map(d => (
            <div key={d.k}
                 className={`rounded-xl p-3 border transition ${d.best
                   ? 'border-brand-300 bg-brand-50 ring-1 ring-brand-200'
                   : 'border-slate-100 bg-slate-50'}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-slate-500 font-medium">k = {d.k}</span>
                {d.best && (
                  <span className="text-[10px] bg-brand-600 text-white px-1.5 py-0.5 rounded-full font-bold">
                    Best
                  </span>
                )}
              </div>
              <p className={`text-lg font-display font-bold ${d.best ? 'text-brand-700' : 'text-slate-700'}`}>
                {d.sil}
              </p>
              <p className="text-[10px] text-slate-400">Silhouette Score</p>
              <p className="text-xs text-slate-500 mt-1">Inertia: {d.inertia.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  )
}
