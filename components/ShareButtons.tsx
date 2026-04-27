'use client'

import { useState } from 'react'

const pillStyle: React.CSSProperties = {
  appearance: 'none',
  border: '1px solid #e6e6e6',
  background: '#fff',
  borderRadius: 999,
  padding: '8px 18px',
  fontFamily: 'Inter, sans-serif',
  fontSize: 16,
  color: '#2e2e2e',
  cursor: 'pointer',
  transition: 'all 200ms',
}

export default function ShareButtons() {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href).catch(() => {})
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div style={{
      display: 'flex',
      gap: 12,
      justifyContent: 'center',
      flexWrap: 'wrap',
      padding: '30px 0',
      borderTop: '1px solid #e6e6e6',
      borderBottom: '1px solid #e6e6e6',
    }}>
      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, color: '#8f8a8a', alignSelf: 'center', marginRight: 8 }}>
        Share
      </span>
      <button
        type="button"
        onClick={copy}
        style={pillStyle}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#000'; e.currentTarget.style.background = '#f3f1ee' }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e6e6e6'; e.currentTarget.style.background = '#fff' }}
      >
        {copied ? 'Copied!' : 'Copy link'}
      </button>
      {['Threads', 'X', 'LinkedIn', 'Mail'].map((s) => (
        <button
          key={s}
          type="button"
          style={pillStyle}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#000'; e.currentTarget.style.background = '#f3f1ee' }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e6e6e6'; e.currentTarget.style.background = '#fff' }}
        >
          {s}
        </button>
      ))}
    </div>
  )
}
