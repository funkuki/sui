'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import HireMeModal from './HireMeModal'

type CTASectionProps = {
  image?: string
  title?: string
}

export default function CTASection({
  image = '/assets/sui-clover.png',
  title = 'Want to\nwork with Sui?',
}: CTASectionProps) {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
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
            <DarkPillButton onClick={() => setModalOpen(true)}>Hire me!</DarkPillButton>
            <LightPill href="/contact">Contact me</LightPill>
          </div>
        </div>

        {/* Image */}
        <div style={{ position: 'relative', textAlign: 'center' }}>
          <div style={{ display: 'inline-block' }}>
            <Image
              src={image}
              alt=""
              width={480}
              height={480}
              unoptimized
              style={{ maxWidth: '100%', maxHeight: 560, objectFit: 'contain', display: 'inline-block' }}
            />
          </div>
        </div>
      </section>

      <HireMeModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}

function DarkPillButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
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
        cursor: 'pointer',
      }}
      className="hover:-translate-y-0.5 hover:shadow-lg hover:!bg-black"
    >
      {children}
    </button>
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
