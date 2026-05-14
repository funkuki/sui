'use client'

import Image from 'next/image'
import { useState } from 'react'

export type Testimonial = {
  category: string
  quote: string
  logo: string
}

export default function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [current, setCurrent] = useState(0)
  const t = testimonials[current]

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 800,
        fontSize: 40,
        margin: '0 0 52px',
        color: '#0c0c0c',
        letterSpacing: '-0.01em',
      }}>
        Kind Words from My Clients
      </h2>

      <div style={{ maxWidth: 680, margin: '0 auto', minHeight: 100 }}>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 14,
          color: '#8f8a8a',
          margin: '0 0 18px',
          letterSpacing: '0.01em',
        }}>
          {t.category}
        </p>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 20,
          lineHeight: 1.75,
          color: '#0c0c0c',
          margin: 0,
        }}>
          {t.quote}
        </p>
      </div>

      {/* Client logo */}
      <div style={{
        width: 64,
        height: 64,
        borderRadius: '50%',
        overflow: 'hidden',
        margin: '32px auto 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f5f5f5',
      }}>
        <Image
          src={t.logo}
          alt="client logo"
          width={64}
          height={64}
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        />
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Testimonial ${i + 1}`}
            style={{
              width: i === current ? 22 : 8,
              height: 8,
              borderRadius: 999,
              background: i === current ? '#0c0c0c' : '#d5c9bc',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              transition: 'all 300ms cubic-bezier(.2,.8,.2,1)',
            }}
          />
        ))}
      </div>
    </div>
  )
}
