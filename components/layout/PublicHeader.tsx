import Link from 'next/link'

export function PublicHeader() {
  return (
    <header
      style={{
        padding: '20px 32px',
        borderBottom: '1px solid #D1D5DB',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Link href="/" style={{ fontSize: '18px', fontWeight: 700, color: '#1A1A2E', textDecoration: 'none' }}>
        Cladex
      </Link>
      <nav style={{ display: 'flex', gap: '20px' }}>
        <Link href="/login" style={{ fontSize: '14px', color: '#6B7280', textDecoration: 'none' }}>Log In</Link>
        <Link href="/signup" style={{ fontSize: '14px', color: '#1A1A2E', fontWeight: 500, textDecoration: 'none' }}>Get Started</Link>
      </nav>
    </header>
  )
}
