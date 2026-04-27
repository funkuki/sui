'use client'

import { useState, useEffect } from 'react'

export default function ReadingProgressBar() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const top = window.scrollY
      const h = el.scrollHeight - el.clientHeight
      setPct(h > 0 ? Math.min(100, (top / h) * 100) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      style={{
        position: 'sticky',
        top: 92,
        zIndex: 30,
        height: 3,
        background: 'transparent',
        maxWidth: '100%',
      }}
    >
      <div
        style={{
          width: pct + '%',
          height: 3,
          background: '#0c0c0c',
          transition: 'width 80ms linear',
        }}
      />
    </div>
  )
}
