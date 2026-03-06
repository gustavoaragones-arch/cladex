'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Button from '@components/Button'
import Link from 'next/link'

type Tab = 'password' | 'magic'

export function SigninForm() {
  const [tab, setTab] = useState<Tab>('password')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [magicSent, setMagicSent] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handlePasswordLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError(error.message); setLoading(false); return }
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
    if (error) { setError(error.message); setLoading(false); return }
    setMagicSent(true)
    setLoading(false)
  }

  if (magicSent) {
    return (
      <div className="text-center py-4">
        <p className="text-sm text-green-700 font-medium mb-1">Check your email</p>
        <p className="text-xs text-zinc-500">We sent a sign-in link to {email}</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-row gap-4 mb-4 border-b border-gray-100 pb-2">
        <button
          type="button"
          onClick={() => setTab('password')}
          className={`text-sm font-medium ${tab === 'password' ? 'text-zinc-800 border-b-2 border-primary' : 'text-zinc-500'}`}
        >
          Password
        </button>
        <button
          type="button"
          onClick={() => setTab('magic')}
          className={`text-sm font-medium ${tab === 'magic' ? 'text-zinc-800 border-b-2 border-primary' : 'text-zinc-500'}`}
        >
          Magic link
        </button>
      </div>

      {tab === 'password' && (
        <form onSubmit={handlePasswordLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=" w-full rounded-xl shadow-sm border border-gray-100 placeholder:text-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent mb-6"
            placeholder="Email address"
            name="email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className=" w-full rounded-xl shadow-sm border border-gray-100 placeholder:text-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent mb-6"
            placeholder="Password"
            name="password"
            required
          />
          {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
          <Button
            type="submit"
            as="button"
            variant="large"
            className="rounded-2xl py-2 w-full"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
      )}

      {tab === 'magic' && (
        <form onSubmit={handleMagicLink}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=" w-full rounded-xl shadow-sm border border-gray-100 placeholder:text-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent mb-6"
            placeholder="Email address"
            name="email"
            required
          />
          {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
          <Button
            type="submit"
            as="button"
            variant="large"
            className="rounded-2xl py-2 w-full"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send magic link'}
          </Button>
        </form>
      )}
    </div>
  )
}
