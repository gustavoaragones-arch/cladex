'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

type Tab = 'password' | 'magic'

export function LoginForm() {
  const [tab, setTab] = useState<Tab>('password')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [magicSent, setMagicSent] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const tabStyle = (active: boolean) => ({
    flex: 1,
    padding: '8px',
    fontSize: '13px',
    fontWeight: active ? 600 : 400,
    color: active ? '#1A1A2E' : '#6B7280',
    background: active ? '#FFFFFF' : 'transparent',
    border: 'none',
    borderBottom: active ? '2px solid #1A1A2E' : '2px solid transparent',
    cursor: 'pointer',
  })

  async function handlePasswordLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/api/auth/callback` },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setMagicSent(true)
    setLoading(false)
  }

  return (
    <div>
      {/* Tabs */}
      <div style={{ display: 'flex', marginBottom: '24px', borderBottom: '1px solid #D1D5DB' }}>
        <button type="button" style={tabStyle(tab === 'password')} onClick={() => setTab('password')}>Password</button>
        <button type="button" style={tabStyle(tab === 'magic')} onClick={() => setTab('magic')}>Magic Link</button>
      </div>

      {tab === 'password' && (
        <form onSubmit={handlePasswordLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#0A0A0A', marginBottom: '6px' }}>
              Email
            </label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com" />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#0A0A0A', marginBottom: '6px' }}>
              Password
            </label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" />
          </div>
          {error && <p style={{ fontSize: '13px', color: '#B91C1C' }}>{error}</p>}
          <button
            type="submit"
            disabled={loading}
            style={{ padding: '10px', backgroundColor: loading ? '#6B7280' : '#0A0A0A', color: '#FFFFFF', border: 'none', borderRadius: '4px', fontSize: '14px', fontWeight: 500, cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
          <a href="/reset-password" style={{ fontSize: '12px', color: '#6B7280', textAlign: 'center', textDecoration: 'none' }}>
            Forgot password?
          </a>
        </form>
      )}

      {tab === 'magic' && !magicSent && (
        <form onSubmit={handleMagicLink} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#0A0A0A', marginBottom: '6px' }}>
              Email
            </label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com" />
          </div>
          {error && <p style={{ fontSize: '13px', color: '#B91C1C' }}>{error}</p>}
          <button
            type="submit"
            disabled={loading}
            style={{ padding: '10px', backgroundColor: loading ? '#6B7280' : '#0A0A0A', color: '#FFFFFF', border: 'none', borderRadius: '4px', fontSize: '14px', fontWeight: 500, cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {loading ? 'Sending...' : 'Send Magic Link'}
          </button>
        </form>
      )}

      {tab === 'magic' && magicSent && (
        <div style={{ textAlign: 'center', padding: '16px 0' }}>
          <p style={{ fontSize: '14px', color: '#065F46', fontWeight: 500, marginBottom: '8px' }}>Check your email</p>
          <p style={{ fontSize: '13px', color: '#6B7280' }}>We sent a sign-in link to {email}</p>
        </div>
      )}
    </div>
  )
}
