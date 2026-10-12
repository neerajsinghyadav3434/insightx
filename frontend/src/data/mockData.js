// ── KPI Summary ───────────────────────────────────────────────────────────────
export const kpiData = {
  totalRevenue:    { value: '£9,47,563', raw: 947563, trend: +8.4, label: 'Total Revenue' },
  totalCustomers:  { value: '4,372',     raw: 4372,   trend: +3.2, label: 'Total Customers' },
  avgOrderValue:   { value: '£312',      raw: 312,    trend: +1.8, label: 'Avg Order Value' },
  totalOrders:     { value: '25,900',    raw: 25900,  trend: +6.1, label: 'Total Orders' },
}

// ── Monthly Revenue ────────────────────────────────────────────────────────────
export const monthlyRevenue = [
  { month: 'Dec 2009', revenue: 52340 },
  { month: 'Jan 2010', revenue: 61200 },
  { month: 'Feb 2010', revenue: 57800 },
  { month: 'Mar 2010', revenue: 74300 },
  { month: 'Apr 2010', revenue: 68900 },
  { month: 'May 2010', revenue: 82100 },
  { month: 'Jun 2010', revenue: 79400 },
  { month: 'Jul 2010', revenue: 86500 },
  { month: 'Aug 2010', revenue: 91200 },
  { month: 'Sep 2010', revenue: 107800 },
  { month: 'Oct 2010', revenue: 121400 },
  { month: 'Nov 2010', revenue: 143900 },
]

// ── Top Products ───────────────────────────────────────────────────────────────
export const topProducts = [
  { name: 'REGENCY CAKESTAND 3 TIER',     revenue: 164762, qty: 10840 },
  { name: 'WHITE HANGING HEART T-LIGHT',  revenue: 98341,  qty: 37446 },
  { name: 'PARTY BUNTING',                revenue: 87203,  qty: 11753 },
  { name: 'JUMBO BAG RED RETROSPOT',      revenue: 77641,  qty: 47363 },
  { name: 'RABBIT NIGHT LIGHT',           revenue: 72180,  qty: 30012 },
  { name: 'ASSORTED COLOUR BIRD ORNAMENT',revenue: 63490,  qty: 36381 },
  { name: 'PAPER CRAFT LITTLE BIRDIE',    revenue: 58102,  qty: 80995 },
  { name: 'MEDIUM CERAMIC TOP STORAGE',   revenue: 52390,  qty: 9014 },
]

// ── Segment Distribution ──────────────────────────────────────────────────────
export const segmentData = [
  { name: '🌟 VIP',      value: 312,  color: '#7c5bf1', pct: '7%' },
  { name: '💚 Loyal',    value: 1148, color: '#10b981', pct: '26%' },
  { name: '⚠️ At-Risk',  value: 1563, color: '#f59e0b', pct: '36%' },
  { name: '🆕 New',      value: 1349, color: '#3b82f6', pct: '31%' },
]

// ── Revenue by Day of Week ─────────────────────────────────────────────────────
export const revenueByDay = [
  { day: 'Mon', revenue: 143200 },
  { day: 'Tue', revenue: 167300 },
  { day: 'Wed', revenue: 181400 },
  { day: 'Thu', revenue: 176200 },
  { day: 'Fri', revenue: 158900 },
  { day: 'Sat', revenue: 42100 },
  { day: 'Sun', revenue: 78000 },
]

// ── Country Revenue ───────────────────────────────────────────────────────────
export const countryRevenue = [
  { country: 'Netherlands', revenue: 284661 },
  { country: 'Ireland',     revenue: 263277 },
  { country: 'Germany',     revenue: 221698 },
  { country: 'France',      revenue: 197403 },
  { country: 'Australia',   revenue: 137077 },
  { country: 'Switzerland', revenue: 56385 },
  { country: 'Spain',       revenue: 54774 },
  { country: 'Belgium',     revenue: 40910 },
  { country: 'Sweden',      revenue: 36595 },
  { country: 'Japan',       revenue: 35340 },
]

// ── Hourly Revenue ────────────────────────────────────────────────────────────
export const hourlyRevenue = [
  { hour: '6am', value: 4200 },  { hour: '7am', value: 9100 },
  { hour: '8am', value: 18700 }, { hour: '9am', value: 34200 },
  { hour: '10am', value: 52800 },{ hour: '11am', value: 61300 },
  { hour: '12pm', value: 58900 },{ hour: '1pm', value: 54100 },
  { hour: '2pm', value: 60700 }, { hour: '3pm', value: 56200 },
  { hour: '4pm', value: 48300 }, { hour: '5pm', value: 28100 },
  { hour: '6pm', value: 12400 }, { hour: '7pm', value: 5600 },
]

// ── Customer Profiles ─────────────────────────────────────────────────────────
export const customerProfiles = {
  '12347': {
    id: '12347', segment: '🌟 VIP', color: '#7c5bf1',
    recency: 2, frequency: 182, monetary: 4310.00,
    r_score: 4, f_score: 4, m_score: 4, rfm_total: 12, rfm_score: '444',
    history: [
      { invoice: '581482', date: '2011-12-07', description: 'REGENCY CAKESTAND 3 TIER', qty: 12, price: 12.75, total: 153.00 },
      { invoice: '574477', date: '2011-11-04', description: 'WHITE HANGING HEART T-LIGHT HOLDER', qty: 24, price: 2.55, total: 61.20 },
      { invoice: '568761', date: '2011-09-22', description: 'PARTY BUNTING', qty: 36, price: 4.95, total: 178.20 },
      { invoice: '555494', date: '2011-07-17', description: 'JUMBO BAG RED RETROSPOT', qty: 10, price: 1.95, total: 19.50 },
      { invoice: '540421', date: '2011-04-01', description: 'RABBIT NIGHT LIGHT', qty: 6, price: 9.95, total: 59.70 },
    ],
  },
  '14688': {
    id: '14688', segment: '💚 Loyal', color: '#10b981',
    recency: 18, frequency: 43, monetary: 1870.50,
    r_score: 3, f_score: 3, m_score: 3, rfm_total: 9, rfm_score: '333',
    history: [
      { invoice: '580789', date: '2011-11-30', description: 'ASSORTED COLOUR BIRD ORNAMENT', qty: 48, price: 1.69, total: 81.12 },
      { invoice: '572341', date: '2011-10-18', description: 'PAPER CRAFT LITTLE BIRDIE', qty: 80, price: 2.08, total: 166.40 },
    ],
  },
  '16029': {
    id: '16029', segment: '⚠️ At-Risk', color: '#f59e0b',
    recency: 143, frequency: 8, monetary: 320.80,
    r_score: 1, f_score: 2, m_score: 2, rfm_total: 5, rfm_score: '122',
    history: [
      { invoice: '543798', date: '2011-07-22', description: 'MEDIUM CERAMIC TOP STORAGE JAR', qty: 4, price: 12.75, total: 51.00 },
    ],
  },
}

// ── Segment Stats Table ───────────────────────────────────────────────────────
export const segmentStats = [
  { segment: '🌟 VIP Customers',      customers: 312,  avgRecency: 14,  avgFrequency: 142, avgMonetary: 3812,  totalRevenue: 1189344,  color: '#7c5bf1', bg: '#f5f3ff' },
  { segment: '💚 Loyal Customers',    customers: 1148, avgRecency: 38,  avgFrequency: 48,  avgMonetary: 1243,  totalRevenue: 1427564,  color: '#10b981', bg: '#ecfdf5' },
  { segment: '⚠️ At-Risk Customers',  customers: 1563, avgRecency: 167, avgFrequency: 9,   avgMonetary: 187,   totalRevenue: 292281,   color: '#f59e0b', bg: '#fffbeb' },
  { segment: '🆕 New / Low-Value',    customers: 1349, avgRecency: 92,  avgFrequency: 2,   avgMonetary: 44,    totalRevenue: 59356,    color: '#3b82f6', bg: '#eff6ff' },
]

// ── Product Recommendations ────────────────────────────────────────────────────
export const productRecs = {
  'WHITE HANGING HEART T-LIGHT HOLDER': [
    { product: 'HAND WARMER UNION JACK',              score: 94, count: 1823 },
    { product: 'RED WOOLLY HOTTIE WHITE HEART',       score: 89, count: 1641 },
    { product: 'ROUND SNACK BOXES SET OF 4 WOODLAND', score: 84, count: 1402 },
    { product: 'GLASS STAR FROSTED T-LIGHT HOLDER',   score: 81, count: 1317 },
    { product: 'WOODEN PICTURE FRAME WHITE FINISH',   score: 76, count: 1180 },
    { product: 'PAPER CHAIN KIT WOODLAND ANIMALS',    score: 71, count: 1023 },
  ],
  'REGENCY CAKESTAND 3 TIER': [
    { product: 'SET OF 3 CAKE TINS PANTRY DESIGN',   score: 91, count: 1560 },
    { product: 'VINTAGE SNAP CARDS',                 score: 83, count: 1210 },
    { product: 'CERAMIC CAKE STAND LARGE',           score: 79, count: 1140 },
    { product: 'BAKING SET 9 PIECE RETROSPOT',       score: 74, count: 980 },
    { product: 'GARDENERS KNEELING PAD CUP OF TEA',  score: 68, count: 870 },
  ],
  'PARTY BUNTING': [
    { product: 'PACK OF 12 LONDON TISSUES',          score: 88, count: 1432 },
    { product: 'SET OF 4 PANTRY JELLY MOULDS',       score: 82, count: 1284 },
    { product: 'PAPER BUNTING RETROSPOT',            score: 78, count: 1104 },
    { product: 'STRAWBERRY CERAMIC TRINKET BOX',     score: 71, count: 948 },
    { product: 'COCKTAIL PARASOLS IN TUBE',          score: 65, count: 812 },
  ],
  'JUMBO BAG RED RETROSPOT': [
    { product: 'JUMBO BAG PINK POLKADOT',            score: 96, count: 2108 },
    { product: 'JUMBO BAG BAROQUE BLACK WHITE',      score: 90, count: 1876 },
    { product: 'LARGE REUSABLE SHOPPING BAG',        score: 83, count: 1520 },
    { product: 'SHOPPING BAG WITH FLOWERS',          score: 76, count: 1230 },
    { product: 'RECYCLED JUTE BAG',                  score: 69, count: 980 },
  ],
  'RABBIT NIGHT LIGHT': [
    { product: 'PINK COAT HOOK',                     score: 87, count: 1380 },
    { product: 'WOODEN HEART BUNTING PINK',          score: 80, count: 1240 },
    { product: 'CERAMIC BUNNY FIGURINE',             score: 74, count: 1092 },
    { product: 'BABY SHOWER GIFT WRAP',              score: 67, count: 904 },
    { product: 'MINI RABBIT EGG CUP',                score: 61, count: 764 },
  ],
  'ASSORTED COLOUR BIRD ORNAMENT': [
    { product: 'PAPER CRAFT LITTLE BIRDIE',          score: 93, count: 1720 },
    { product: 'CERAMIC BIRD GARDEN STAKE',          score: 85, count: 1480 },
    { product: 'MINI GARDEN BIRDS MOBILE',           score: 77, count: 1188 },
    { product: 'FEATHER PEN CARD',                   score: 70, count: 940 },
    { product: 'SET OF 3 BUTTERFLY STICKERS',        score: 63, count: 820 },
  ],
  'PAPER CRAFT LITTLE BIRDIE': [
    { product: 'ASSORTED COLOUR BIRD ORNAMENT',      score: 91, count: 1680 },
    { product: 'CERAMIC BIRD GARDEN STAKE',          score: 83, count: 1360 },
    { product: 'MINI GARDEN BIRDS MOBILE',           score: 75, count: 1100 },
    { product: 'PACK OF 6 BIRDY GIFT TAGS',          score: 68, count: 920 },
    { product: 'BIRD AND TULIP MOULD',               score: 61, count: 760 },
  ],
  'MEDIUM CERAMIC TOP STORAGE JAR': [
    { product: 'LARGE CERAMIC TOP STORAGE JAR',     score: 95, count: 1980 },
    { product: 'SMALL CERAMIC TOP STORAGE JAR',     score: 88, count: 1720 },
    { product: 'REGENCY CAKESTAND 3 TIER',          score: 72, count: 1240 },
    { product: 'SET OF 3 CAKE TINS PANTRY DESIGN',  score: 67, count: 1040 },
    { product: 'VINTAGE KITCHEN STORAGE CANISTER',  score: 61, count: 880 },
  ],
}

// ── Full product catalogue (for autocomplete search pool) ─────────────────────
export const productCatalogue = [
  'WHITE HANGING HEART T-LIGHT HOLDER',
  'REGENCY CAKESTAND 3 TIER',
  'PARTY BUNTING',
  'JUMBO BAG RED RETROSPOT',
  'RABBIT NIGHT LIGHT',
  'ASSORTED COLOUR BIRD ORNAMENT',
  'PAPER CRAFT LITTLE BIRDIE',
  'MEDIUM CERAMIC TOP STORAGE JAR',
  'HAND WARMER UNION JACK',
  'RED WOOLLY HOTTIE WHITE HEART',
  'ROUND SNACK BOXES SET OF 4 WOODLAND',
  'GLASS STAR FROSTED T-LIGHT HOLDER',
  'WOODEN PICTURE FRAME WHITE FINISH',
  'PAPER CHAIN KIT WOODLAND ANIMALS',
  'SET OF 3 CAKE TINS PANTRY DESIGN',
  'VINTAGE SNAP CARDS',
  'CERAMIC CAKE STAND LARGE',
  'BAKING SET 9 PIECE RETROSPOT',
  'GARDENERS KNEELING PAD CUP OF TEA',
  'PACK OF 12 LONDON TISSUES',
  'SET OF 4 PANTRY JELLY MOULDS',
  'PAPER BUNTING RETROSPOT',
  'STRAWBERRY CERAMIC TRINKET BOX',
  'JUMBO BAG PINK POLKADOT',
  'JUMBO BAG BAROQUE BLACK WHITE',
  'LARGE REUSABLE SHOPPING BAG',
  'SHOPPING BAG WITH FLOWERS',
  'PINK COAT HOOK',
  'WOODEN HEART BUNTING PINK',
  'CERAMIC BUNNY FIGURINE',
  'CERAMIC BIRD GARDEN STAKE',
  'MINI GARDEN BIRDS MOBILE',
  'FEATHER PEN CARD',
  'LARGE CERAMIC TOP STORAGE JAR',
  'SMALL CERAMIC TOP STORAGE JAR',
  'VINTAGE KITCHEN STORAGE CANISTER',
  'SET OF 6 MINI ROSE SOAPS',
  'METAL SIGN TAKE IT OR LEAVE IT',
  'PACK OF 72 RETROSPOT CAKE CASES',
  'CHOCOLATE HOT WATER BOTTLE',
  'ALARM CLOCK BAKELIKE RED',
  'ALARM CLOCK BAKELIKE GREEN',
  'GIN AND TONIC DIET METAL SIGN',
  'DOORMAT UNION JACK',
  'KNITTED UNION FLAG HOT WATER BOTTLE',
  'IVORY KNITTED MUG COSY',
  'PAPER CHAIN KIT RETROSPOT',
]

export const popularProducts = [
  { name: 'REGENCY CAKESTAND 3 TIER',           revenue: 164762, orders: 1204 },
  { name: 'WHITE HANGING HEART T-LIGHT HOLDER', revenue: 98341,  orders: 3102 },
  { name: 'PARTY BUNTING',                      revenue: 87203,  orders: 982 },
  { name: 'JUMBO BAG RED RETROSPOT',            revenue: 77641,  orders: 4102 },
  { name: 'RABBIT NIGHT LIGHT',                 revenue: 72180,  orders: 2487 },
]

// ── Purchase Frequency Histogram ──────────────────────────────────────────────
export const purchaseFrequency = [
  { range: '1',    count: 1024 },
  { range: '2-3',  count: 890 },
  { range: '4-5',  count: 612 },
  { range: '6-10', count: 540 },
  { range: '11-20',count: 287 },
  { range: '21-50',count: 198 },
  { range: '50+',  count: 121 },
]
