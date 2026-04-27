'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import MobileMenu from './MobileMenu'
import logoSrc from '../public/assets/sui-logo.png'

const NAV_ITEMS = [
  { label: 'about', href: '/about' },
  { label: 'work', href: '/work' },
  { label: 'blog', href: '/blog' },
  { label: 'assets', href: '/assets' },
]

function NavLink({ label, href, active }: { label: string; href: string; active: boolean }) {
  return (
    <Link
      href={href}
      style={{ position: 'relative', padding: '6px 4px', fontSize: 24, color: '#0c0c0c', fontFamily: 'Inter, sans-serif' }}
      className="block"
    >
      {label}
      <span
        style={{
          position: 'absolute',
          left: 4,
          right: 4,
          bottom: -2,
          height: 2,
          background: '#0c0c0c',
          transform: active ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 280ms cubic-bezier(.2,.8,.2,1)',
          display: 'block',
        }}
      />
    </Link>
  )
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '22px 80px',
          background: scrolled ? 'rgba(255,255,255,0.5)' : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.04)' : '1px solid transparent',
          transition: 'background 300ms ease, backdrop-filter 300ms ease, border-color 300ms ease',
        }}
        className="max-md:!px-5 max-md:!py-4"
      >
        {/* Logo */}
        <Link
          href="/"
          style={{ display: 'flex', alignItems: 'center', gap: 14, userSelect: 'none' }}
        >
          <Image
            src={logoSrc}
            alt="SUI"
            width={180}
            height={55}
            className="object-contain"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center" style={{ gap: 36 }}>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.href}
              label={item.label}
              href={item.href}
              active={pathname.startsWith(item.href)}
            />
          ))}
          <ContactPill />
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          className="md:hidden flex flex-col gap-1.5 p-1"
        >
          <span className="w-6 h-0.5 bg-fg block" />
          <span className="w-6 h-0.5 bg-fg block" />
          <span className="w-4 h-0.5 bg-fg block" />
        </button>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}

function ContactPill() {
  const [hover, setHover] = useState(false)
  return (
    <Link
      href="/contact"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #000',
        borderRadius: 999,
        padding: '12px 28px',
        fontSize: 20,
        fontFamily: 'Inter, sans-serif',
        cursor: 'pointer',
        transition: 'transform 200ms cubic-bezier(.2,.8,.2,1), box-shadow 200ms, background 200ms',
        background: hover ? '#000' : '#2e2e2e',
        color: '#fff',
        transform: hover ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hover ? '0 8px 22px rgba(0,0,0,0.15)' : '0 0 0 rgba(0,0,0,0)',
        textDecoration: 'none',
      }}
    >
      contact
    </Link>
  )
}
