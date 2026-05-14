'use client'

import { useEffect, useRef } from 'react'
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
  const prevPathname = useRef(pathname)

  // Only close when pathname actually changes (not on first mount)
  useEffect(() => {
    if (prevPathname.current === pathname) return
    prevPathname.current = pathname
    onClose()
  }, [pathname, onClose])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: 'rgba(0,0,0,0.8)' }}
    >
      {/* Close button */}
      <div className="flex justify-end px-5 py-5">
        <button
          onClick={onClose}
          aria-label="Close menu"
          style={{ color: '#fff', fontSize: 20, lineHeight: 1, padding: 4 }}
        >
          ✕
        </button>
      </div>

      {/* Nav links — vertically centered */}
      <div className="flex-1 flex flex-col justify-center px-8" style={{ gap: 4 }}>
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              color: '#fff',
              fontSize: 32,
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              padding: '10px 0',
              textDecoration: 'none',
            }}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
