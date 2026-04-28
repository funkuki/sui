import Link from 'next/link'

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid #e6e6e6',
        padding: '36px 80px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: 'Inter, sans-serif',
        color: '#0c0c0c',
        fontSize: 18,
      }}
      className="max-md:!px-5 max-md:!py-6 max-md:flex-col max-md:gap-4 max-md:text-sm"
    >
      <span>© 2026 Funkuki Studio · Designed &amp; Developed by Sui</span>
      <nav style={{ display: 'flex', gap: 22, color: '#2e2e2e' }}>
        <Link href="https://instagram.com" style={{ color: 'inherit' }}>IG</Link>
        <Link href="https://threads.net" style={{ color: 'inherit' }}>Threads</Link>
        <Link href="https://behance.net" style={{ color: 'inherit' }}>Behance</Link>
        <Link href="mailto:hello@funkuki.com" style={{ color: 'inherit' }}>Mail</Link>
      </nav>
    </footer>
  )
}
