'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Building2, ArrowLeftRight, FileText,
  FolderOpen, CheckSquare, AlertTriangle, Users, CreditCard, Settings
} from 'lucide-react'

const NAV_ITEMS = [
  { href: '/dashboard',     label: 'Dashboard',     icon: LayoutDashboard },
  { href: '/properties',    label: 'Properties',    icon: Building2 },
  { href: '/transactions',  label: 'Transactions',  icon: ArrowLeftRight },
  { href: '/offers',        label: 'Offers',        icon: FileText },
  { href: '/documents',     label: 'Documents',     icon: FolderOpen },
  { href: '/tasks',         label: 'Tasks',         icon: CheckSquare },
  { href: '/risk-radar',    label: 'Risk Radar',    icon: AlertTriangle },
  { href: '/professionals', label: 'Professionals', icon: Users },
  { href: '/billing',       label: 'Billing',       icon: CreditCard },
  { href: '/settings',      label: 'Settings',      icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside
      style={{
        width: '220px',
        minHeight: '100vh',
        backgroundColor: '#F7F7F7',
        borderRight: '1px solid #D1D5DB',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div style={{ padding: '24px 20px 16px', borderBottom: '1px solid #D1D5DB' }}>
        <span style={{ fontSize: '18px', fontWeight: 700, color: '#1A1A2E', letterSpacing: '-0.02em' }}>
          Cladex
        </span>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '12px 0' }}>
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '9px 20px',
                fontSize: '14px',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? '#1A1A2E' : '#6B7280',
                backgroundColor: isActive ? '#EBEBEB' : 'transparent',
                textDecoration: 'none',
                borderLeft: isActive ? '2px solid #1A1A2E' : '2px solid transparent',
                transition: 'background-color 0.1s, color 0.1s',
              }}
            >
              <Icon size={16} strokeWidth={isActive ? 2 : 1.5} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom disclaimer */}
      <div style={{ padding: '12px 16px', borderTop: '1px solid #D1D5DB', fontSize: '11px', color: '#9CA3AF', lineHeight: '1.5' }}>
        Not a broker · Not legal advice
      </div>
    </aside>
  )
}
