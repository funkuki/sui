type TagPillProps = {
  children: React.ReactNode
  active?: boolean
  onClick?: () => void
}

export default function TagPill({ children, active = false, onClick }: TagPillProps) {
  const isButton = !!onClick

  if (isButton) {
    return (
      <button
        type="button"
        onClick={onClick}
        style={{
          appearance: 'none',
          border: `1px solid ${active ? '#000' : '#e6e6e6'}`,
          background: active ? '#2e2e2e' : '#fff',
          color: active ? '#fff' : '#0c0c0c',
          borderRadius: 999,
          padding: '12px 22px',
          fontFamily: 'Inter, sans-serif',
          fontSize: 20,
          cursor: 'pointer',
          transition: 'all 220ms',
        }}
        onMouseEnter={(e) => {
          if (!active) (e.currentTarget as HTMLButtonElement).style.background = '#f3f1ee'
        }}
        onMouseLeave={(e) => {
          if (!active) (e.currentTarget as HTMLButtonElement).style.background = '#fff'
        }}
      >
        {children}
      </button>
    )
  }

  return (
    <span
      style={{
        display: 'inline-block',
        background: '#e6e6e6',
        borderRadius: 999,
        padding: '4px 12px',
        fontFamily: 'Inter, sans-serif',
        fontSize: 16,
        color: '#2e2e2e',
      }}
    >
      {children}
    </span>
  )
}
