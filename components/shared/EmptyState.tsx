// Placeholder — reusable empty state for lists/tables

interface EmptyStateProps {
  message: string
  actionLabel?: string
  actionHref?: string
}

export function EmptyState({ message, actionLabel, actionHref }: EmptyStateProps) {
  return (
    <div
      style={{
        border: '1px solid #D1D5DB',
        borderRadius: '6px',
        padding: '48px 32px',
        textAlign: 'center',
        backgroundColor: '#F7F7F7',
        color: '#6B7280',
        fontSize: '14px',
      }}
    >
      <p style={{ marginBottom: actionLabel && actionHref ? '20px' : 0 }}>{message}</p>
      {actionLabel && actionHref && (
        <a
          href={actionHref}
          style={{
            display: 'inline-block',
            padding: '10px 24px',
            backgroundColor: '#0A0A0A',
            color: '#FFFFFF',
            borderRadius: '4px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          {actionLabel}
        </a>
      )}
    </div>
  )
}
