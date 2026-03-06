'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export function SignupForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/api/auth/callback` },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    // Redirect to onboarding (Phase 3 builds onboarding — redirect to dashboard for now)
    router.push('/dashboard')
    router.refresh()
  }

  return (
    <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#0A0A0A', marginBottom: '6px' }}>Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com" />
      </div>
      <div>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#0A0A0A', marginBottom: '6px' }}>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Min. 8 characters" minLength={8} />
      </div>
      {error && <p style={{ fontSize: '13px', color: '#B91C1C' }}>{error}</p>}
      <button
        type="submit"
        disabled={loading}
        style={{ padding: '10px', backgroundColor: loading ? '#6B7280' : '#0A0A0A', color: '#FFFFFF', border: 'none', borderRadius: '4px', fontSize: '14px', fontWeight: 500, cursor: loading ? 'not-allowed' : 'pointer' }}
      >
        {loading ? 'Creating account...' : 'Create Account'}
      </button>
    </form>
  )
}
