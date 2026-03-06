import { SignupForm } from '@/components/auth/SignupForm'
import { Footer } from '@/components/layout/Footer'

export const dynamic = 'force-dynamic'

export default function SignupPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px' }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#1A1A2E', marginBottom: '6px' }}>Cladex</h1>
            <p style={{ fontSize: '14px', color: '#6B7280' }}>Create your account</p>
          </div>
          <div style={{ border: '1px solid #D1D5DB', borderRadius: '6px', padding: '32px', backgroundColor: '#FFFFFF' }}>
            <SignupForm />
          </div>
          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: '#6B7280' }}>
            Already have an account?{' '}
            <a href="/login" style={{ color: '#1A1A2E', fontWeight: 500, textDecoration: 'none' }}>Sign in</a>
          </p>
          <p style={{ textAlign: 'center', marginTop: '12px', fontSize: '11px', color: '#9CA3AF' }}>
            By creating an account, you agree to our{' '}
            <a href="/legal/terms" style={{ color: '#6B7280' }}>Terms of Service</a>{' '}
            and{' '}
            <a href="/legal/privacy" style={{ color: '#6B7280' }}>Privacy Policy</a>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
