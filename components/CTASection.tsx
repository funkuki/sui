import Image from 'next/image'
import Link from 'next/link'

type CTASectionProps = {
  image?: string
  title?: string
}

export default function CTASection({
  image = '/assets/sui-clover.png',
  title = 'Want to\nwork with Sui?',
}: CTASectionProps) {
  return (
    <section
      style={{
        padding: '100px 80px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
        gap: 40,
      }}
      className="max-md:!px-5 max-md:!py-16 max-md:!grid-cols-1"
    >
      {/* Text */}
      <div style={{ paddingLeft: 60 }} className="max-md:!pl-0">
        <h2
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 800,
            fontSize: 72,
            lineHeight: 1.05,
            margin: 0,
            whiteSpace: 'pre-line',
            letterSpacing: '-0.02em',
            color: '#0c0c0c',
          }}
          className="max-md:!text-5xl"
        >
          {title}
        </h2>
        <div style={{ display: 'flex', gap: 16, marginTop: 36 }} className="max-md:flex-wrap">
          <DarkPill href="/contact">Hire me!</DarkPill>
          <LightPill href="/contact">Contact me</LightPill>
        </div>
      </div>

      {/* Image */}
      <div style={{ position: 'relative', textAlign: 'center' }}>
        <div className="animate-float" style={{ display: 'inline-block' }}>
          <Image
            src={image}
            alt=""
            width={480}
            height={480}
            unoptimized
            style={{ maxWidth: '100%', maxHeight: 560, objectFit: 'contain', display: 'inline-block' }}
          />
        </div>
        <div
          style={{
            width: 200,
            height: 18,
            margin: '0 auto',
            borderRadius: '50%',
            background: 'rgba(208,200,200,0.7)',
            filter: 'blur(3px)',
            marginTop: -6,
          }}
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

function LightPill({ href, children }: { href: string; children: React.ReactNode }) {
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
        background: 'rgba(255,255,255,0.85)',
        color: '#0c0c0c',
        transition: 'transform 200ms cubic-bezier(.2,.8,.2,1), box-shadow 200ms, background 200ms',
        textDecoration: 'none',
      }}
      className="hover:-translate-y-0.5 hover:shadow-lg hover:!bg-white"
    >
      {children}
    </Link>
  )
}
