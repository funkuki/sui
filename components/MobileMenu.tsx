'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { label: 'about', href: '/about' },
  { label: 'work', href: '/work' },
  { label: 'blog', href: '/blog' },
  { label: 'assets', href: '/assets' },
  { label: 'contact', href: '/contact' },
]

type MobileMenuProps = {
  open: boolean
  onClose: () => void
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname()

  // Close on route change
  useEffect(() => {
    onClose()
  }, [pathname, onClose])

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: '#fdfcf9' }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-border">
        <Link href="/" className="text-2xl font-bold tracking-wide">SUI</Link>
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="text-2xl leading-none p-1 hover:opacity-60 transition-opacity"
        >
          ✕
        </button>
      </div>

      {/* Nav links */}
      <nav className="flex flex-col gap-1 px-5 pt-8">
        {NAV_ITEMS.map((item) => {
          const active = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`py-3 text-3xl font-bold tracking-tight transition-opacity ${
                active ? 'opacity-100' : 'opacity-40 hover:opacity-100'
              }`}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
