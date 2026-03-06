// Phase 3 builds the full landing page
// This is a minimal redirect placeholder only

import { redirect } from 'next/navigation'
import { getUser } from '@/lib/auth'

export default async function Home() {
  const user = await getUser()
  if (user) redirect('/dashboard')

  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily: 'Inter, Arial, sans-serif' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#1A1A2E', marginBottom: '8px' }}>Cladex</h1>
      <p style={{ color: '#6B7280', marginBottom: '32px', fontSize: '1rem' }}>
        Structured transaction workflow software.
      </p>
      <div style={{ display: 'flex', gap: '12px' }}>
        <a href="/login" style={{ padding: '10px 24px', background: '#0A0A0A', color: '#fff', borderRadius: '4px', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>
          Log In
        </a>
        <a href="/signup" style={{ padding: '10px 24px', background: '#F7F7F7', color: '#0A0A0A', border: '1px solid #D1D5DB', borderRadius: '4px', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>
          Get Started
        </a>
      </div>
      <p style={{ marginTop: '48px', fontSize: '12px', color: '#6B7280', textAlign: 'center', maxWidth: '480px' }}>
        Cladex provides structured transaction workflow tools. We are not a real estate broker, attorney, escrow provider, or financial advisor.
      </p>
    </main>
  )
}
