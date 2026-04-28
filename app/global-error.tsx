'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="zh-TW">
      <body>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20,
            padding: '40px 20px',
            textAlign: 'center',
            fontFamily: 'Inter, system-ui, sans-serif',
            background: '#fdfcf9',
            color: '#0c0c0c',
          }}
        >
          <h2 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>
            Something went wrong
          </h2>
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
              fontFamily: 'inherit',
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
