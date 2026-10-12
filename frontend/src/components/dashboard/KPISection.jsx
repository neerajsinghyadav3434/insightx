import { DollarSign, Users, ShoppingCart, Package } from 'lucide-react'
import KPICard from '@/components/ui/KPICard'
import { SkeletonCard } from '@/components/ui/SkeletonCard'

function fmt(val, prefix = '') {
  if (val == null) return '—'
  if (val >= 1_000_000) return `${prefix}${(val / 1_000_000).toFixed(1)}M`
  if (val >= 1_000)     return `${prefix}${(val / 1_000).toFixed(1)}k`
  return `${prefix}${val.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
}

export default function KPISection({ metrics, features, loading = false }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[0, 1, 2, 3].map(i => <SkeletonCard key={i} />)}
      </div>
    )
  }

  const cards = [
    features.hasRevenue && {
      label: 'Total Revenue', icon: DollarSign, accent: '#7c5bf1', bg: '#f5f3ff',
      value: fmt(metrics.totalRevenue, '£'),
      trend: 8.4,
    },
    features.hasCustomers && {
      label: 'Total Customers', icon: Users, accent: '#10b981', bg: '#ecfdf5',
      value: fmt(metrics.totalCustomers),
      trend: 3.2,
    },
    features.hasRevenue && features.hasOrders && {
      label: 'Avg Order Value', icon: ShoppingCart, accent: '#f59e0b', bg: '#fffbeb',
      value: fmt(metrics.avgOrderValue, '£'),
      trend: 1.8,
    },
    features.hasOrders && {
      label: 'Total Orders', icon: Package, accent: '#3b82f6', bg: '#eff6ff',
      value: fmt(metrics.totalOrders),
      trend: 6.1,
    },
  ].filter(Boolean)

  if (!cards.length) return null

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(card => (
        <KPICard key={card.label} {...card} />
      ))}
    </div>
  )
}
