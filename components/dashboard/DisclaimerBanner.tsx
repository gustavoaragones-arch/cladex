interface DisclaimerBannerProps {
  variant?: 'global' | 'score' | 'negotiation' | 'radar'
}

const COPY = {
  global:      'Cladex provides structured transaction workflow tools. We are not a real estate broker, attorney, escrow provider, or financial advisor.',
  score:       'Risk analysis is informational only and does not constitute legal or financial advice.',
  negotiation: 'Structured communication guidance only. Not legal advice. Consider professional review before sending.',
  radar:       'Risk indicators are generated algorithmically. Always confirm with licensed professionals where required.',
}

export function DisclaimerBanner({ variant = 'global' }: DisclaimerBannerProps) {
  return (
    <div style={{
      padding: '10px 16px',
      backgroundColor: '#F7F7F7',
      borderTop: '1px solid #D1D5DB',
      fontSize: '12px',
      color: '#6B7280',
      lineHeight: '1.5',
    }}>
      {COPY[variant]}
    </div>
  )
}
