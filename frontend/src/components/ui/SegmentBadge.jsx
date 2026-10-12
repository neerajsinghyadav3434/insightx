import clsx from 'clsx'

const SEGMENT_STYLES = {
  vip:     { bg: 'bg-purple-50',  text: 'text-purple-700',  ring: 'ring-purple-200',  dot: 'bg-purple-500'  },
  loyal:   { bg: 'bg-emerald-50', text: 'text-emerald-700', ring: 'ring-emerald-200', dot: 'bg-emerald-500' },
  atrisk:  { bg: 'bg-amber-50',   text: 'text-amber-700',   ring: 'ring-amber-200',   dot: 'bg-amber-500'   },
  new:     { bg: 'bg-blue-50',    text: 'text-blue-700',    ring: 'ring-blue-200',    dot: 'bg-blue-500'    },
}

function getStyle(segment) {
  const s = segment?.toLowerCase() ?? ''
  if (s.includes('vip'))    return SEGMENT_STYLES.vip
  if (s.includes('loyal'))  return SEGMENT_STYLES.loyal
  if (s.includes('risk'))   return SEGMENT_STYLES.atrisk
  return SEGMENT_STYLES.new
}

export default function SegmentBadge({ segment, size = 'md' }) {
  const style = getStyle(segment)

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-full font-semibold ring-1',
        style.bg, style.text, style.ring,
        size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-3 py-1 text-xs',
      )}
    >
      <span className={clsx('h-1.5 w-1.5 rounded-full flex-shrink-0', style.dot)} />
      {segment}
    </span>
  )
}
