import { getAvailableFeatures } from './columnDetector'

const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function rowRevenue(row, cols) {
  try {
    if (cols.totalPrice && row[cols.totalPrice] != null) {
      return Math.max(0, parseFloat(row[cols.totalPrice]) || 0)
    }
    if (cols.quantity && cols.unitPrice) {
      const q = parseFloat(row[cols.quantity]) || 0
      const p = parseFloat(row[cols.unitPrice]) || 0
      return Math.max(0, q * p)
    }
  } catch { /* ignore */ }
  return 0
}

function pctStr(v, total) {
  return total > 0 ? `${Math.round((v / total) * 100)}%` : '0%'
}

function quantile(arr, p) {
  if (!arr.length) return 0
  const sorted = [...arr].sort((a, b) => a - b)
  return sorted[Math.min(Math.floor(p * sorted.length), sorted.length - 1)]
}

function safeDate(val) {
  if (!val) return null
  const d = new Date(val)
  return isNaN(d.getTime()) ? null : d
}

/** Compute all metrics from raw parsed rows + detected columns. Returns { metrics, features }. */
export function processData(rawRows, cols) {
  const features = getAvailableFeatures(cols)
  const metrics  = {}

  // Limit processing to first 200k rows for browser performance
  const rows = rawRows.slice(0, 200_000).filter(r =>
    Object.values(r).some(v => v != null && String(v).trim() !== ''),
  )

  if (!rows.length) return { metrics, features }

  // ── KPIs ──────────────────────────────────────────────────────────────────
  if (features.hasCustomers) {
    metrics.totalCustomers = new Set(rows.map(r => r[cols.customerId]).filter(Boolean)).size
  }
  if (features.hasOrders) {
    metrics.totalOrders = new Set(rows.map(r => r[cols.invoiceNo]).filter(Boolean)).size
  }
  if (features.hasRevenue) {
    const invoiceRev = {}
    rows.forEach(r => {
      const rev = rowRevenue(r, cols)
      const key = cols.invoiceNo ? (r[cols.invoiceNo] ?? '__') : '__'
      invoiceRev[key] = (invoiceRev[key] || 0) + rev
    })
    const vals = Object.values(invoiceRev)
    metrics.totalRevenue  = vals.reduce((a, b) => a + b, 0)
    metrics.avgOrderValue = vals.length ? metrics.totalRevenue / vals.length : 0
  }

  // ── Monthly revenue ────────────────────────────────────────────────────────
  if (features.hasTimeSeries) {
    const monthMap = {}
    rows.forEach(r => {
      const d = safeDate(r[cols.invoiceDate])
      if (!d) return
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
      monthMap[key] = (monthMap[key] || 0) + rowRevenue(r, cols)
    })
    metrics.monthlyRevenue = Object.entries(monthMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-18)
      .map(([key, revenue]) => {
        const [y, m] = key.split('-')
        return { month: `${MONTH_NAMES[parseInt(m) - 1]} ${y.slice(2)}`, revenue: Math.round(revenue) }
      })
  }

  // ── Revenue by day of week ─────────────────────────────────────────────────
  if (features.hasTimeSeries) {
    const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
    const dayRev = Object.fromEntries(DAYS.map(d => [d, 0]))
    rows.forEach(r => {
      const d = safeDate(r[cols.invoiceDate])
      if (!d) return
      dayRev[DAYS[d.getDay()]] += rowRevenue(r, cols)
    })
    metrics.revenueByDay = DAYS.map(day => ({ day, revenue: Math.round(dayRev[day]) }))
  }

  // ── Top products ──────────────────────────────────────────────────────────
  if (features.hasProducts) {
    const prodMap = {}
    rows.forEach(r => {
      const name = r[cols.description]
      if (!name || String(name).trim() === '') return
      const key = String(name).trim()
      prodMap[key] = (prodMap[key] || 0) + rowRevenue(r, cols)
    })
    metrics.topProducts = Object.entries(prodMap)
      .filter(([, rev]) => rev > 0)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8)
      .map(([name, revenue]) => ({
        name: name.length > 28 ? `${name.slice(0, 28)}…` : name,
        revenue: Math.round(revenue),
      }))
  }

  // ── Simplified segmentation (frequency + monetary per customer) ────────────
  if (features.hasSegmentation) {
    const custMap = {}
    rows.forEach(r => {
      const cid = r[cols.customerId]
      if (!cid) return
      if (!custMap[cid]) custMap[cid] = { frequency: 0, monetary: 0 }
      custMap[cid].frequency += 1
      custMap[cid].monetary  += rowRevenue(r, cols)
    })
    const custs    = Object.values(custMap)
    const freqQ3   = quantile(custs.map(c => c.frequency), 0.75)
    const freqMed  = quantile(custs.map(c => c.frequency), 0.50)
    const monQ3    = quantile(custs.map(c => c.monetary),  0.75)
    const total    = custs.length
    let vip = 0, loyal = 0, atRisk = 0, newC = 0
    custs.forEach(c => {
      if (c.frequency >= freqQ3 && c.monetary >= monQ3) vip++
      else if (c.frequency >= freqMed)                   loyal++
      else if (c.frequency <= 2)                         newC++
      else                                               atRisk++
    })
    metrics.segmentData = [
      { name: '🌟 VIP',     value: vip,    color: '#7c5bf1', pct: pctStr(vip,    total) },
      { name: '💚 Loyal',   value: loyal,  color: '#10b981', pct: pctStr(loyal,  total) },
      { name: '⚠️ At-Risk', value: atRisk, color: '#f59e0b', pct: pctStr(atRisk, total) },
      { name: '🆕 New',     value: newC,   color: '#3b82f6', pct: pctStr(newC,   total) },
    ]
  }

  return { metrics, features }
}
