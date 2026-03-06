import { createClient } from '@/lib/supabase/server'
import { LogOut } from 'lucide-react'

export async function Topbar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <header
      style={{
        height: '56px',
        borderBottom: '1px solid #D1D5DB',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 24px',
        gap: '16px',
      }}
    >
      <span style={{ fontSize: '13px', color: '#6B7280' }}>
        {user?.email}
      </span>
      <form action="/api/auth/signout" method="POST">
        <button
          type="submit"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            color: '#6B7280',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '6px 10px',
            borderRadius: '4px',
          }}
        >
          <LogOut size={14} />
          Sign out
        </button>
      </form>
    </header>
  )
}
