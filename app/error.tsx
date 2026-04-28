'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        padding: '40px 20px',
        textAlign: 'center',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <p style={{ fontSize: 64, fontWeight: 800, color: '#e6e6e6', margin: 0, lineHeight: 1 }}>
        oops
      </p>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0c0c0c', margin: 0 }}>
        Something went wrong
      </h2>
      {error.message && (
        <p style={{ fontSize: 15, color: '#8f8a8a', maxWidth: 480, margin: 0 }}>
          {error.message}
        </p>
      )}
      <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
        <button
          onClick={reset}
          style={{
            border: '1px solid #0c0c0c',
            borderRadius: 999,
            padding: '12px 24px',
            fontSize: 16,
            background: '#0c0c0c',
            color: '#fff',
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          Try again
        </button>
        <Link
          href="/"
          style={{
            border: '1px solid #0c0c0c',
            borderRadius: 999,
            padding: '12px 24px',
            fontSize: 16,
            background: 'transparent',
            color: '#0c0c0c',
            textDecoration: 'none',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          Go home
        </Link>
      </div>
    </div>
  )
}
