import Link from 'next/link'

type BackBarProps = {
  href: string
  label: string
}

export default function BackBar({ href, label }: BackBarProps) {
  return (
    <div style={{ padding: '30px 80px 0' }} className="max-md:!px-5">
      <Link
        href={href}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          fontFamily: 'Inter, sans-serif',
          fontSize: 18,
          color: '#2e2e2e',
          padding: '8px 0',
          textDecoration: 'none',
          transition: 'color 200ms',
        }}
        className="hover:!text-[#0c0c0c]"
      >
        <span style={{ fontSize: 20 }}>←</span>
        Back to {label}
      </Link>
    </div>
  )
}
