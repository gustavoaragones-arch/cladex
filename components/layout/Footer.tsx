import Link from 'next/link'

export function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid #D1D5DB',
        padding: '24px 32px',
        backgroundColor: '#F7F7F7',
        fontSize: '12px',
        color: '#6B7280',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', maxWidth: '1200px', margin: '0 auto' }}>
        <div>
          <p style={{ fontWeight: 600, color: '#1A1A2E', marginBottom: '4px' }}>Cladex</p>
          <p style={{ maxWidth: '480px', lineHeight: '1.6' }}>
            Cladex provides structured transaction workflow tools. We are not a real estate broker, attorney, escrow provider, or financial advisor.
          </p>
        </div>
        <nav style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <Link href="/legal/terms" style={{ color: '#6B7280', textDecoration: 'none' }}>Terms of Service</Link>
          <Link href="/legal/privacy" style={{ color: '#6B7280', textDecoration: 'none' }}>Privacy Policy</Link>
          <Link href="/legal/disclaimer" style={{ color: '#6B7280', textDecoration: 'none' }}>Not a Broker</Link>
        </nav>
      </div>
    </footer>
  )
}
