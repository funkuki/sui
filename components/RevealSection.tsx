'use client'

import { useEffect, useRef } from 'react'

interface RevealSectionProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  as?: 'section' | 'div' | 'article'
}

export default function RevealSection({
  children,
  className = '',
  style,
  as: Tag = 'section',
}: RevealSectionProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  if (Tag === 'div') {
    return (
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`reveal-on-scroll ${className}`}
        style={style}
      >
        {children}
      </div>
    )
  }

  if (Tag === 'article') {
    return (
      <article
        ref={ref as React.RefObject<HTMLElement>}
        className={`reveal-on-scroll ${className}`}
        style={style}
      >
        {children}
      </article>
    )
  }

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`reveal-on-scroll ${className}`}
      style={style}
    >
      {children}
    </section>
  )
}
