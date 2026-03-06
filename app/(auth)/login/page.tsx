// Full login page with email/password and magic link tabs

import { LoginForm } from '@/components/auth/LoginForm'

export const dynamic = 'force-dynamic'
import { Footer } from '@/components/layout/Footer'

export default function LoginPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px' }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#1A1A2E', marginBottom: '6px' }}>Cladex</h1>
            <p style={{ fontSize: '14px', color: '#6B7280' }}>Sign in to your account</p>
          </div>
          <div style={{ border: '1px solid #D1D5DB', borderRadius: '6px', padding: '32px', backgroundColor: '#FFFFFF' }}>
            <LoginForm />
          </div>
          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: '#6B7280' }}>
            Don&apos;t have an account?{' '}
            <a href="/signup" style={{ color: '#1A1A2E', fontWeight: 500, textDecoration: 'none' }}>Sign up</a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
