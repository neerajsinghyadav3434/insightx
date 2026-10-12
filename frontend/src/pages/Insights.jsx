import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area,
} from 'recharts'
import SectionCard from '@/components/ui/SectionCard'
import { hourlyRevenue, monthlyRevenue, purchaseFrequency, topProducts } from '@/data/mockData'

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-slate-100 rounded-xl shadow-card-lg px-3 py-2">
      <p className="text-xs text-slate-400 mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-sm font-semibold" style={{ color: p.color }}>
          {typeof p.value === 'number' && p.value > 500 ? `£${p.value.toLocaleString()}` : p.value.toLocaleString()}
        </p>
      ))}
    </div>
  )
}

// Monthly customers (derived)
const monthlyCustomers = monthlyRevenue.map((m, i) => ({
  month: m.month,
  customers: Math.round(180 + i * 22 + Math.random() * 40),
}))

export default function Insights() {
  return (
    <div className="space-y-6 animate-slide-up">

      {/* Row 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <SectionCard title="Top Products by Revenue" subtitle="All-time, descending">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={topProducts.map(p => ({ ...p, name: p.name.split(' ').slice(0, 3).join(' ') }))}
              layout="vertical"
              margin={{ top: 0, right: 12, bottom: 0, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
              <XAxis type="number" tick={{ fontSize: 10, fill: '#94a3b8' }}
                     axisLine={false} tickLine={false}
                     tickFormatter={v => `£${(v / 1000).toFixed(0)}k`} />
              <YAxis type="category" dataKey="name" width={110}
                     tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="revenue" radius={[0, 6, 6, 0]} fill="#7c5bf1" opacity={0.85} maxBarSize={18} />
            </BarChart>
          </ResponsiveContainer>
        </SectionCard>

        <SectionCard title="Top Products by Quantity" subtitle="Units sold">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={topProducts.map(p => ({ ...p, name: p.name.split(' ').slice(0, 3).join(' ') }))}
              layout="vertical"
              margin={{ top: 0, right: 12, bottom: 0, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
              <XAxis type="number" tick={{ fontSize: 10, fill: '#94a3b8' }}
                     axisLine={false} tickLine={false}
                     tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
              <YAxis type="category" dataKey="name" width={110}
                     tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="qty" radius={[0, 6, 6, 0]} fill="#f59e0b" opacity={0.85} maxBarSize={18} />
            </BarChart>
          </ResponsiveContainer>
        </SectionCard>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <SectionCard title="Unique Customers per Month" subtitle="Monthly active buyers">
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={monthlyCustomers} margin={{ top: 5, right: 8, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="custGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#10b981" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#94a3b8' }}
                     axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="customers" stroke="#10b981" strokeWidth={2}
                    fill="url(#custGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </SectionCard>

        <SectionCard title="Revenue by Hour of Day" subtitle="Peak sales periods">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={hourlyRevenue} margin={{ top: 5, right: 8, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="hour" tick={{ fontSize: 10, fill: '#94a3b8' }}
                     axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false}
                     tickFormatter={v => `£${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<ChartTooltip />} />
              <Line type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={2.5}
                    dot={{ r: 3, fill: '#f59e0b', strokeWidth: 0 }}
                    activeDot={{ r: 5, stroke: '#fff', strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </SectionCard>
      </div>

      {/* Purchase frequency */}
      <SectionCard title="Purchase Frequency Distribution" subtitle="How many times customers have ordered">
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={purchaseFrequency} margin={{ top: 5, right: 8, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="range" tick={{ fontSize: 11, fill: '#94a3b8' }}
                   axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <Tooltip content={<ChartTooltip />} />
            <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={48}
                 fill="#3b82f6" opacity={0.8} />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-slate-400 mt-2">X-axis: Number of orders per customer lifetime</p>
      </SectionCard>

      {/* Data quality summary */}
      <SectionCard title="Data Quality Summary" subtitle="Cleaning pipeline statistics">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Raw Rows',            value: '1,067,371', color: 'text-slate-700',  bg: 'bg-slate-100'  },
            { label: 'Missing CustomerID',  value: '243,007',   color: 'text-red-600',    bg: 'bg-red-50'     },
            { label: 'Cancelled Invoices',  value: '9,288',     color: 'text-amber-600',  bg: 'bg-amber-50'   },
            { label: 'Final Clean Rows',    value: '797,885',   color: 'text-emerald-700', bg: 'bg-emerald-50' },
          ].map(s => (
            <div key={s.label} className={`rounded-xl px-4 py-3 ${s.bg}`}>
              <p className="text-xs text-slate-500 mb-1">{s.label}</p>
              <p className={`text-lg font-display font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  )
}
