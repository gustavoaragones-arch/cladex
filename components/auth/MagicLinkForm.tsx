'use client'

// Magic link–only form (e.g. for confirm or standalone magic link flows).
// LoginForm includes magic link tab; use this when only magic link is needed.

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface MagicLinkFormProps {
  onSuccess?: () => void
}

export function MagicLinkForm({ onSuccess }: MagicLinkFormProps) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
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

    setSent(true)
    setLoading(false)
    onSuccess?.()
  }

  if (sent) {
    return (
      <div style={{ textAlign: 'center', padding: '16px 0' }}>
        <p style={{ fontSize: '14px', color: '#065F46', fontWeight: 500, marginBottom: '8px' }}>Check your email</p>
        <p style={{ fontSize: '13px', color: '#6B7280' }}>We sent a sign-in link to {email}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#0A0A0A', marginBottom: '6px' }}>Email</label>
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
  )
}
