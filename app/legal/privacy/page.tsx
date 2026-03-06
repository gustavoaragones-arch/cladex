import { Footer } from '@/components/layout/Footer'

export default function PrivacyPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: 'Inter, Arial, sans-serif' }}>
      <header style={{ padding: '20px 32px', borderBottom: '1px solid #D1D5DB' }}>
        <a href="/" style={{ fontSize: '18px', fontWeight: 700, color: '#1A1A2E', textDecoration: 'none' }}>Cladex</a>
      </header>
      <main style={{ flex: 1, maxWidth: '720px', margin: '0 auto', padding: '48px 24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#1A1A2E', marginBottom: '24px' }}>Privacy Policy</h1>
        <div style={{ fontSize: '15px', color: '#0A0A0A', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p>This Privacy Policy describes how Cladex collects and uses information provided during your use of the platform.</p>
          <p>Full Privacy Policy will be published prior to public launch. [Placeholder — Phase 3]</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
