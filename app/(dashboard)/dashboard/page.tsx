import { requireUser } from '@/lib/auth'

export default async function DashboardPage() {
  const user = await requireUser()

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#1A1A2E', marginBottom: '4px' }}>
          Dashboard
        </h1>
        <p style={{ fontSize: '14px', color: '#6B7280' }}>
          Welcome back{user.email ? `, ${user.email}` : ''}.
        </p>
      </div>

      {/* Empty state — Phase 2+ populates with real transaction data */}
      <div
        style={{
          border: '1px solid #D1D5DB',
          borderRadius: '6px',
          padding: '48px 32px',
          textAlign: 'center',
          backgroundColor: '#F7F7F7',
        }}
      >
        <p style={{ fontSize: '15px', color: '#6B7280', marginBottom: '20px' }}>
          No active transactions yet.
        </p>
        <a
          href="/transactions"
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
          Create Transaction
        </a>
      </div>
    </div>
  )
}
