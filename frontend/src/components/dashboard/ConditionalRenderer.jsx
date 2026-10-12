import EmptyState from '@/components/ui/EmptyState'

/**
 * Renders children when `show` is true.
 * When false: if `hideWhenMissing` is set renders nothing; otherwise renders an EmptyState fallback.
 */
export default function ConditionalRenderer({
  show,
  children,
  label = 'this section',
  hideWhenMissing = false,
}) {
  if (!show) {
    if (hideWhenMissing) return null
    return (
      <div className="card">
        <EmptyState
          message={`Data not available for ${label}`}
          hint="Upload a dataset with the required columns to unlock this section."
          compact={false}
        />
      </div>
    )
  }
  return children
}
