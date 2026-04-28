'use client'

import { useRef } from 'react'
import Image from 'next/image'

export type ExperienceItem = {
  img: string
  role: string
  company: string
  period: string
}

export default function ExperienceCarousel({ items }: { items: ExperienceItem[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const isDown = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  function onMouseDown(e: React.MouseEvent) {
    if (!ref.current) return
    isDown.current = true
    startX.current = e.pageX - ref.current.offsetLeft
    scrollLeft.current = ref.current.scrollLeft
    ref.current.style.cursor = 'grabbing'
  }

  function onMouseUp() {
    isDown.current = false
    if (ref.current) ref.current.style.cursor = 'grab'
  }

  function onMouseMove(e: React.MouseEvent) {
    if (!isDown.current || !ref.current) return
    e.preventDefault()
    const x = e.pageX - ref.current.offsetLeft
    ref.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.5
  }

  return (
    <div
      ref={ref}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onMouseMove={onMouseMove}
      style={{
        overflowX: 'auto',
        overflowY: 'hidden',
        display: 'flex',
        gap: 16,
        padding: '8px 80px 32px',
        scrollbarWidth: 'none',
        cursor: 'grab',
        userSelect: 'none',
        WebkitOverflowScrolling: 'touch',
      } as React.CSSProperties}
      className="max-md:!px-5"
    >
      {items.map((item) => (
        <div
          key={item.role}
          style={{
            flexShrink: 0,
            width: 450,
            height: 540,
            borderRadius: 24,
            overflow: 'hidden',
            background: '#ffffff',
            border: '1px solid #ede9e4',
            boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
            display: 'flex',
            flexDirection: 'column',
            transition: 'transform 200ms cubic-bezier(.2,.8,.2,1), box-shadow 200ms',
          }}
          className="hover:-translate-y-1 hover:shadow-lg"
        >
          <div style={{ flex: 1, background: '#ffffff', padding: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <div style={{ position: 'relative', width: 425, height: '100%' }}>
              <Image
                src={item.img}
                alt={item.role}
                fill
                style={{ objectFit: 'contain' }}
                unoptimized
              />
            </div>
          </div>
          <div style={{ padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              fontSize: 22,
              color: '#0c0c0c',
              lineHeight: 1.3,
            }}>
              {item.role}
            </div>
            <div style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 16,
              color: '#8f8a8a',
              display: 'flex',
              justifyContent: 'space-between',
              gap: 12,
            }}>
              <span>@ {item.company}</span>
              <span style={{ flexShrink: 0 }}>{item.period}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
