// Email confirmation landing — user arrives here after clicking magic link or signup confirmation

import { Footer } from '@/components/layout/Footer'

export default function ConfirmPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px' }}>
        <div style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#1A1A2E', marginBottom: '8px' }}>Confirm your email</h1>
          <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '24px' }}>
            If you were sent a confirmation link, click it to verify your email. You can then sign in.
          </p>
          <a href="/login" style={{ display: 'inline-block', padding: '10px 24px', backgroundColor: '#0A0A0A', color: '#fff', borderRadius: '4px', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>
            Go to Sign In
          </a>
        </div>
      </main>
      <Footer />
    </div>
  )
}
