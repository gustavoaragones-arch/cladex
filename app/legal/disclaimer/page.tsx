import { Footer } from '@/components/layout/Footer'

export default function DisclaimerPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: 'Inter, Arial, sans-serif' }}>
      <header style={{ padding: '20px 32px', borderBottom: '1px solid #D1D5DB' }}>
        <a href="/" style={{ fontSize: '18px', fontWeight: 700, color: '#1A1A2E', textDecoration: 'none' }}>Cladex</a>
      </header>
      <main style={{ flex: 1, maxWidth: '720px', margin: '0 auto', padding: '48px 24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#1A1A2E', marginBottom: '24px' }}>Not a Broker — Platform Disclaimer</h1>
        <div style={{ fontSize: '15px', color: '#0A0A0A', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p><strong>Cladex is workflow software. Not a real estate brokerage.</strong></p>
          <p>Cladex provides structured transaction workflow tools designed to help buyers and sellers organize and manage the stages of a real estate transaction. Cladex does not represent any party, does not act as a broker or agent, does not hold escrow, and does not provide legal or financial advice.</p>
          <p>Cladex is not licensed as a real estate broker in any jurisdiction. No fiduciary relationship is created by use of this platform. Users are responsible for seeking licensed professional guidance where required by law or personal circumstance.</p>
          <p>All scores, risk indicators, and workflow suggestions produced by Cladex are informational only. They do not constitute legal counsel, financial advice, or brokerage services.</p>
          <p style={{ color: '#6B7280', fontSize: '13px' }}>Cladex provides structured transaction workflow tools. We are not a real estate broker, attorney, escrow provider, or financial advisor.</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
