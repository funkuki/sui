export default function HeroBanner() {
  return (
    <section
      className="hero-section"
      style={{
        position: 'relative',
        marginTop: 'calc(-1 * var(--header-h))',
        minHeight: 520,
        overflow: 'hidden',
        display: 'flex',
      }}
    >
      {/* Banner video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="hero-video"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      >
        <source src="/assets/hero-banner.mp4" type="video/mp4" />
      </video>
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
