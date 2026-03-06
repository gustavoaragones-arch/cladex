import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background:  '#FFFFFF',
        sidebar:     '#F7F7F7',
        accent:      '#1A1A2E',
        steel:       '#2D3561',
        muted:       '#6B7280',
        border:      '#D1D5DB',
        risk:        '#B91C1C',
        warning:     '#D97706',
        safe:        '#065F46',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '4px',
        sm: '2px',
        md: '6px',
        lg: '6px',
      },
      boxShadow: {
        subtle: '0 1px 3px rgba(0,0,0,0.08)',
        DEFAULT: '0 1px 3px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
}

export default config
