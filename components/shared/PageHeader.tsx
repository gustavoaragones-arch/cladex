// Placeholder — Phase 2+ may add breadcrumbs or actions

interface PageHeaderProps {
  title: string
  description?: string
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div style={{ marginBottom: '32px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#1A1A2E', marginBottom: '4px' }}>
        {title}
      </h1>
      {description && (
        <p style={{ fontSize: '14px', color: '#6B7280' }}>{description}</p>
      )}
    </div>
  )
}
