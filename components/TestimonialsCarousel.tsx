'use client'

import { useState } from 'react'

export type Testimonial = {
  category: string
  quote: string
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
        How do my clients rate me
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

      {/* Avatar placeholder */}
      <div style={{
        width: 48,
        height: 48,
        borderRadius: '50%',
        background: '#d5c9bc',
        margin: '32px auto 20px',
      }} />

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
