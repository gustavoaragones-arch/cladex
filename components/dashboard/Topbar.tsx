import { createClient } from '@/lib/supabase/server'

export async function Topbar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <header style={{
      height: '56px',
      borderBottom: '1px solid #D1D5DB',
      backgroundColor: '#FFFFFF',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 24px',
      gap: '16px',
      flexShrink: 0,
    }}>
      <span style={{ fontSize: '13px', color: '#6B7280' }}>
        {user?.email}
      </span>
      <form action="/api/auth/signout" method="POST">
        <button
          type="submit"
          style={{
            fontSize: '13px',
            color: '#6B7280',
            background: 'none',
            border: '1px solid #D1D5DB',
            borderRadius: '4px',
            cursor: 'pointer',
            padding: '5px 12px',
          }}
        >
          Sign out
        </button>
      </form>
    </header>
  )
}
