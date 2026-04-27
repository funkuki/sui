import Image from 'next/image'
import heroBanner from '@/public/assets/Hero-banner01.png'

export default function HeroBanner() {
  return (
    <section
      style={{
        position: 'relative',
        marginTop: 'calc(-1 * var(--header-h))',
        height: '100vh',
        minHeight: 520,
        overflow: 'hidden',
        display: 'flex',
      }}
    >
      {/* Banner image */}
      <Image
        src={heroBanner}
        alt=""
        fill
        priority
        style={{ objectFit: 'cover', objectPosition: 'center' }}
      />
      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(253,252,249,0) 0%, rgba(253,252,249,0.15) 80%, #fdfcf9 100%)',
        }}
      />
      {/* Scroll cue */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: 36,
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
