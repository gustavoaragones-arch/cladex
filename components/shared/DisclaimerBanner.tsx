// REGULATORY SHIELD COMPONENT — Required on all pages involving scoring or guidance
// Do not remove. Do not modify the disclaimer text. Do not make it dismissible.

interface DisclaimerBannerProps {
  variant?: 'global' | 'score' | 'negotiation' | 'radar'
}

const DISCLAIMER_COPY = {
  global: 'Cladex provides structured transaction workflow tools. We are not a real estate broker, attorney, escrow provider, or financial advisor.',
  score: 'Risk analysis is informational only and does not constitute legal or financial advice.',
  negotiation: 'Structured communication guidance only. Not legal advice. Consider professional review before sending.',
  radar: 'Risk indicators are generated algorithmically based on available inputs. Always confirm with licensed professionals where required.',
}

export function DisclaimerBanner({ variant = 'global' }: DisclaimerBannerProps) {
  return (
    <div
      style={{
        borderTop: '1px solid #D1D5DB',
        padding: '10px 16px',
        backgroundColor: '#F7F7F7',
        fontSize: '12px',
        color: '#6B7280',
        lineHeight: '1.5',
      }}
    >
      {DISCLAIMER_COPY[variant]}
    </div>
  )
}
