import { requireUser } from '@/lib/auth'

export default async function StubPage() {
  await requireUser()

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#1A1A2E', marginBottom: '4px' }}>
          Risk Radar
        </h1>
        <p style={{ fontSize: '14px', color: '#6B7280' }}>
          Monitor transaction risk in real time.
        </p>
      </div>
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
        This section will be built in an upcoming phase.
      </div>
    </div>
  )
}
