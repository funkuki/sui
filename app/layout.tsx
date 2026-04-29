import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Noto_Sans_TC } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GoogleAnalytics from '@/components/GoogleAnalytics'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-tc',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Sui · Funkuki Studio',
    template: '%s · Sui',
  },
  description: 'Designer & creator — Funkuki Studio',
  metadataBase: new URL('https://funkuki.com/sui'),
  icons: {
    icon: '/assets/sui-favicon.png',
  },
  openGraph: {
    siteName: 'Sui · Funkuki Studio',
    locale: 'zh_TW',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW" className={`${inter.variable} ${notoSansTC.variable}`}>
      <body className="font-sans" style={{ background: '#fdfcf9', color: '#0c0c0c' }}>
        <GoogleAnalytics />
        <Header />
        <main style={{ paddingTop: 'var(--header-h)' }}>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
