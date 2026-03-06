import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cladex — Structured Transaction Workflow',
  description: 'Guided workflow software for real estate buyers and sellers. Not a broker. Not legal advice.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
