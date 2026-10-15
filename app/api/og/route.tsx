import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    // Dynamic parameters with high-converting defaults
    const title = searchParams.get('title') || '3D Digital Animated Card'
    const recipient = searchParams.get('recipient') || searchParams.get('name') || ''
    const sender = searchParams.get('sender') || ''
    const occasion = searchParams.get('occasion') || 'Celebration'
    const type = searchParams.get('type') || 'wish' // 'wish' | 'invitation' | 'magic' | 'poetry'

    const badgeLabel =
      type === 'invitation'
        ? '💌 Wedding & Event Invitation'
        : type === 'magic'
        ? '✨ 3D Interactive Surprise'
        : type === 'poetry'
        ? '📜 Urdu Poetry & Shayari Card'
        : '🎉 3D Animated Wish Card'

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#030712',
            backgroundImage:
              'radial-gradient(circle at 50% 20%, #1e1b4b 0%, #030712 70%)',
            padding: '50px 60px',
            fontFamily: 'sans-serif',
            color: '#ffffff',
            boxSizing: 'border-box',
          }}
        >
          {/* Top Header Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            {/* Logo pill */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '8px 20px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
              }}
            >
              <span style={{ fontSize: '24px' }}>✨</span>
              <span
                style={{
                  fontSize: '22px',
                  fontWeight: 800,
                  letterSpacing: '0.5px',
                  color: '#f59e0b',
                }}
              >
                Cardzy
              </span>
              <span style={{ fontSize: '14px', color: '#94a3b8' }}>• cardzy.online</span>
            </div>

            {/* Category / Type Badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 20px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.35)',
                color: '#34d399',
                fontSize: '16px',
                fontWeight: 700,
              }}
            >
              {badgeLabel}
            </div>
          </div>

          {/* Central 3D Card Simulation Box */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '30px 40px',
              maxWidth: '960px',
              borderRadius: '28px',
              backgroundColor: 'rgba(15, 23, 42, 0.75)',
              border: '2px solid rgba(245, 158, 11, 0.35)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
            }}
          >
            {recipient && (
              <div
                style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  color: '#fbbf24',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  marginBottom: '10px',
                }}
              >
                Exclusive 3D Card For {recipient}
              </div>
            )}

            <div
              style={{
                fontSize: title.length > 40 ? '42px' : '54px',
                fontWeight: 900,
                lineHeight: 1.15,
                color: '#ffffff',
                textShadow: '0 4px 16px rgba(0, 0, 0, 0.6)',
                marginBottom: '14px',
              }}
            >
              {title}
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '20px',
                color: '#cbd5e1',
                marginTop: '6px',
              }}
            >
              <span>{sender ? `Created with love by ${sender}` : `Interactive 3D Experience on Cardzy`}</span>
              <span>•</span>
              <span style={{ color: '#38bdf8' }}>WhatsApp RSVP & Real-Time Blessings</span>
            </div>
          </div>

          {/* Bottom Viral Call-To-Action Pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              paddingTop: '16px',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '16px' }}>
              <span>🕯️ Candle Blowing</span>
              <span>•</span>
              <span>💍 Ring Box 3D Unboxing</span>
              <span>•</span>
              <span>📜 1,000+ Poetry Treasury</span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 24px',
                borderRadius: '16px',
                backgroundColor: '#f59e0b',
                color: '#020617',
                fontSize: '18px',
                fontWeight: 800,
              }}
            >
              <span>Tap to Open 3D Envelope 👉</span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: any) {
    return new Response(`Failed to generate image: ${e.message}`, { status: 500 })
  }
}
