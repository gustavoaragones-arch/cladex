// Request password reset — sends reset email. Phase 3 may add reset form and token handling.

import { Footer } from '@/components/layout/Footer'

export const dynamic = 'force-dynamic'
import { MagicLinkForm } from '@/components/auth/MagicLinkForm'

export default function ResetPasswordPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px' }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#1A1A2E', marginBottom: '6px' }}>Reset password</h1>
            <p style={{ fontSize: '14px', color: '#6B7280' }}>Request a magic link to sign in or reset your password.</p>
          </div>
          <div style={{ border: '1px solid #D1D5DB', borderRadius: '6px', padding: '32px', backgroundColor: '#FFFFFF' }}>
            <MagicLinkForm />
          </div>
          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: '#6B7280' }}>
            <a href="/login" style={{ color: '#1A1A2E', fontWeight: 500, textDecoration: 'none' }}>Back to Sign In</a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
