import Image from 'next/image'
import Link from 'next/link'
import littleSui from '@/public/assets/little-sui.png'

export default function HeroIntro() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: 'calc(100vh - 92px)',
        background: '#fdfcf9',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 1352,
          margin: '0 auto',
          padding: '60px 80px',
          display: 'grid',
          gridTemplateColumns: 'minmax(360px, 480px) 1fr',
          gap: 80,
          alignItems: 'center',
        }}
        className="max-md:!grid-cols-1 max-md:!px-5 max-md:!gap-10"
      >
        {/* Avatar */}
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'relative' }}>
            <Image
              src={littleSui}
              alt="Sui"
              width={520}
              height={620}
              className="w-full h-auto block"
              priority
            />
          </div>
        </div>

        {/* Copy */}
        <div>
          {/* Status badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              border: '1px solid #e6e6e6',
              borderRadius: 999,
              padding: '8px 16px',
              background: 'rgba(255,255,255,0.7)',
              fontSize: 14,
              color: '#2e2e2e',
              marginBottom: 22,
              fontFamily: 'Inter, sans-serif',
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: '#3CB1B1',
                display: 'inline-block',
              }}
            />
            Available for new projects · 2026
          </div>

          <h1
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 800,
              fontSize: 84,
              lineHeight: 0.95,
              margin: 0,
              letterSpacing: '-0.02em',
              color: '#0c0c0c',
            }}
            className="max-md:!text-5xl"
          >
            Hi, I am <em style={{ fontStyle: 'italic', fontWeight: 800 }}>Sui</em>.
          </h1>

          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 22,
              lineHeight: 1.7,
              color: '#0c0c0c',
              marginTop: 28,
              marginBottom: 36,
              maxWidth: 620,
            }}
            className="max-md:!text-base"
          >
            專攻品牌策略與體驗設計的數位產品設計師。遊走於科技、設計與行銷的交界，
            我熱衷於探索跨界的無限可能 — 將抽象的好點子，轉化為具體的品牌影響力。
          </p>

          <DarkPill href="/about">More about me →</DarkPill>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: 'max(36px, calc(env(safe-area-inset-bottom, 0px) + 20px))',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          fontFamily: 'Inter, sans-serif',
          fontSize: 14,
          color: '#2e2e2e',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          opacity: 0.85,
        }}
      >
        <span>scroll</span>
        <span
          className="animate-float-line"
          style={{ width: 1, height: 28, background: '#2e2e2e', display: 'block' }}
        />
      </div>
    </section>
  )
}

function DarkPill({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        border: '1px solid #000',
        borderRadius: 999,
        padding: '16px 30px',
        fontSize: 22,
        fontFamily: 'Inter, sans-serif',
        cursor: 'pointer',
        background: '#2e2e2e',
        color: '#fff',
        transition: 'transform 200ms cubic-bezier(.2,.8,.2,1), box-shadow 200ms, background 200ms',
        textDecoration: 'none',
      }}
      className="hover:-translate-y-0.5 hover:shadow-lg hover:!bg-black"
    >
      {children}
    </Link>
  )
}
