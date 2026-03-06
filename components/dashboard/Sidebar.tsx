'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import {
  LayoutDashboard, Building2, ArrowLeftRight, FileText,
  FolderOpen, CheckSquare, AlertTriangle, Users, CreditCard,
  Settings, ChevronLeft, ChevronRight
} from 'lucide-react'

const NAV_ITEMS = [
  { href: '/dashboard',      label: 'Dashboard',      icon: LayoutDashboard },
  { href: '/properties',     label: 'Properties',     icon: Building2 },
  { href: '/transactions',   label: 'Transactions',   icon: ArrowLeftRight },
  { href: '/offers',         label: 'Offers',         icon: FileText },
  { href: '/documents',      label: 'Documents',      icon: FolderOpen },
  { href: '/tasks',          label: 'Tasks',          icon: CheckSquare },
  { href: '/risk-radar',     label: 'Risk Radar',     icon: AlertTriangle },
  { href: '/professionals',  label: 'Professionals',  icon: Users },
  { href: '/billing',        label: 'Billing',        icon: CreditCard },
  { href: '/settings',       label: 'Settings',       icon: Settings },
]

const STORAGE_KEY = 'cladex_sidebar_collapsed'

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [tooltip, setTooltip] = useState<string | null>(null)

  // Read persisted state on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'true') setCollapsed(true)
    setMounted(true)
  }, [])

  function toggle() {
    const next = !collapsed
    setCollapsed(next)
    localStorage.setItem(STORAGE_KEY, String(next))
  }

  // Prevent flash of wrong state before mount
  if (!mounted) return (
    <aside style={{
      width: '220px',
      minHeight: '100vh',
      backgroundColor: '#F7F7F7',
      borderRight: '1px solid #D1D5DB',
      flexShrink: 0,
    }} />
  )

  const sidebarWidth = collapsed ? '56px' : '220px'

  return (
    <aside
      style={{
        width: sidebarWidth,
        minHeight: '100vh',
        backgroundColor: '#F7F7F7',
        borderRight: '1px solid #D1D5DB',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        position: 'relative',
        transition: 'width 0.2s ease',
        overflow: 'visible',
      }}
    >
      {/* Toggle button — sits on sidebar edge */}
      <button
        onClick={toggle}
        style={{
          position: 'absolute',
          top: '20px',
          right: '-12px',
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          backgroundColor: '#EBEBEB',
          border: '1px solid #D1D5DB',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 10,
          padding: 0,
        }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#D1D5DB')}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#EBEBEB')}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed
          ? <ChevronRight size={12} color="#6B7280" strokeWidth={2} />
          : <ChevronLeft size={12} color="#6B7280" strokeWidth={2} />
        }
      </button>

      {/* Logo */}
      <div style={{
        padding: collapsed ? '24px 0 16px' : '24px 20px 16px',
        borderBottom: '1px solid #D1D5DB',
        display: 'flex',
        alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'flex-start',
        overflow: 'hidden',
        transition: 'padding 0.2s ease',
      }}>
        <span style={{
          fontSize: '18px',
          fontWeight: 700,
          color: '#1A1A2E',
          letterSpacing: '-0.02em',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          transition: 'opacity 0.15s ease',
          opacity: 1,
        }}>
          {collapsed ? 'C' : 'Cladex'}
        </span>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '12px 0', overflow: 'visible' }}>
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + '/')

          return (
            <div
              key={href}
              style={{ position: 'relative', overflow: 'visible' }}
              onMouseEnter={() => collapsed && setTooltip(label)}
              onMouseLeave={() => setTooltip(null)}
            >
              <Link
                href={href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: collapsed ? '0' : '10px',
                  padding: collapsed ? '10px 0' : '9px 20px',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  fontSize: '14px',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? '#1A1A2E' : '#6B7280',
                  backgroundColor: isActive ? '#EBEBEB' : 'transparent',
                  textDecoration: 'none',
                  borderLeft: isActive ? '2px solid #1A1A2E' : '2px solid transparent',
                  transition: 'background-color 0.1s, color 0.1s, padding 0.2s ease',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                }}
              >
                <Icon
                  size={16}
                  strokeWidth={isActive ? 2 : 1.5}
                  style={{ flexShrink: 0 }}
                />
                {!collapsed && (
                  <span style={{
                    opacity: collapsed ? 0 : 1,
                    transition: 'opacity 0.15s ease',
                  }}>
                    {label}
                  </span>
                )}
              </Link>

              {/* Tooltip — only when collapsed */}
              {collapsed && tooltip === label && (
                <div style={{
                  position: 'absolute',
                  left: '60px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: '#1A1A2E',
                  color: '#FFFFFF',
                  fontSize: '12px',
                  padding: '4px 10px',
                  borderRadius: '4px',
                  whiteSpace: 'nowrap',
                  zIndex: 50,
                  pointerEvents: 'none',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                }}>
                  {label}
                  {/* Tooltip arrow */}
                  <div style={{
                    position: 'absolute',
                    left: '-4px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '0',
                    height: '0',
                    borderTop: '4px solid transparent',
                    borderBottom: '4px solid transparent',
                    borderRight: '4px solid #1A1A2E',
                  }} />
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Footer disclaimer — hidden when collapsed */}
      {!collapsed && (
        <div style={{
          padding: '12px 16px',
          borderTop: '1px solid #D1D5DB',
          fontSize: '11px',
          color: '#9CA3AF',
          lineHeight: '1.5',
          transition: 'opacity 0.15s ease',
          opacity: collapsed ? 0 : 1,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}>
          Not a broker · Not legal advice
        </div>
      )}
    </aside>
  )
}
