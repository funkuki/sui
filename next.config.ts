import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // Supabase Storage
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        // Google favicon service
        protocol: 'https',
        hostname: 'www.google.com',
        pathname: '/s2/favicons/**',
      },
      {
        // Any HTTPS image (for OG images / favicons from arbitrary domains)
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

export default nextConfig
