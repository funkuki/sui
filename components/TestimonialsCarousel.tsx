'use client'

import Image from 'next/image'
import { useState, useEffect, useRef, useCallback } from 'react'

export type Testimonial = {
  category: string
  quote: string
  logo: string
}

const AUTO_INTERVAL = 4000
const SWIPE_THRESHOLD = 50

export default function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [current, setCurrent] = useState(0)
  const [faded, setFaded] = useState(false)
  const [paused, setPaused] = useState(false)
  const dragStart = useRef<number | null>(null)
  const currentRef = useRef(current)
  currentRef.current = current

  const goTo = useCallback((index: number) => {
    setFaded(true)
    setTimeout(() => {
      setCurrent(index)
      setFaded(false)
    }, 200)
  }, [])

  const advance = useCallback(() => {
    goTo((currentRef.current + 1) % testimonials.length)
  }, [goTo, testimonials.length])

  useEffect(() => {
    if (paused) return
    const id = setInterval(advance, AUTO_INTERVAL)
    return () => clearInterval(id)
  }, [paused, advance])

  const handleNav = (dir: 'prev' | 'next') => {
    const n = testimonials.length
    goTo(dir === 'next'
      ? (currentRef.current + 1) % n
      : (currentRef.current - 1 + n) % n
    )
  }

  const onTouchStart = (e: React.TouchEvent) => {
    dragStart.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (dragStart.current === null) return
    const delta = e.changedTouches[0].clientX - dragStart.current
    if (Math.abs(delta) > SWIPE_THRESHOLD) handleNav(delta > 0 ? 'prev' : 'next')
    dragStart.current = null
  }
  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    dragStart.current = e.clientX
  }
  const onMouseUp = (e: React.MouseEvent) => {
    if (dragStart.current === null) return
    const delta = e.clientX - dragStart.current
    if (Math.abs(delta) > SWIPE_THRESHOLD) handleNav(delta > 0 ? 'prev' : 'next')
    dragStart.current = null
  }

  const t = testimonials[current]

  return (
    <div
      style={{ textAlign: 'center' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => { setPaused(false); dragStart.current = null }}
    >
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

      {/* Swipeable content */}
      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        style={{
          cursor: 'grab',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          opacity: faded ? 0 : 1,
          transition: 'opacity 200ms ease',
        }}
      >
        <div style={{ maxWidth: 680, margin: '0 auto', minHeight: 120 }}>
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
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
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
