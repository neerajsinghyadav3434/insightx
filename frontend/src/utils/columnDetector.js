// Maps canonical names → possible raw header aliases (normalised: lowercase, no spaces/dashes)
const ALIASES = {
  customerId:  ['customerid','customer_id','userid','user_id','clientid','client_id','customer'],
  invoiceNo:   ['invoiceno','invoice_no','invoice','orderid','order_id','transactionid','transaction_id'],
  stockCode:   ['stockcode','stock_code','sku','productcode','product_code','itemid','item_id'],
  description: ['description','productname','product_name','itemname','item_name','product','item','name','title'],
  quantity:    ['quantity','qty','units','count','volume'],
  unitPrice:   ['unitprice','unit_price','price','saleprice','sale_price','cost'],
  invoiceDate: ['invoicedate','invoice_date','date','orderdate','order_date','timestamp','created_at','transactiondate','transaction_date'],
  country:     ['country','region','location','market','geography'],
  totalPrice:  ['totalprice','total_price','total','revenue','sales','totalamount','total_amount'],
}

function norm(s) {
  return String(s).toLowerCase().replace(/[\s_\-]+/g, '')
}

/** Returns object: { customerId: 'CustomerID' | null, ... } */
export function detectColumns(headers) {
  const result = {}
  const normed = headers.map(h => ({ raw: h, n: norm(h) }))
  for (const [canonical, aliases] of Object.entries(ALIASES)) {
    const hit = normed.find(({ n }) => aliases.includes(n))
    result[canonical] = hit ? hit.raw : null
  }
  return result
}

/** Returns boolean flags for which analytics features are available */
export function getAvailableFeatures(cols) {
  const hasRevenue = !!(cols.quantity && cols.unitPrice) || !!cols.totalPrice
  return {
    hasRevenue,
    hasCustomers:       !!cols.customerId,
    hasOrders:          !!cols.invoiceNo,
    hasTimeSeries:      !!cols.invoiceDate && hasRevenue,
    hasProducts:        !!cols.description,
    hasCountry:         !!cols.country,
    hasSegmentation:    !!cols.customerId && hasRevenue,
    hasRecommendations: !!cols.description && !!cols.customerId,
  }
}
