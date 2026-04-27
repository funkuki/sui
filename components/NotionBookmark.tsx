'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import type { BookmarkMetadata } from '@/lib/bookmark-cache'

interface NotionBookmarkProps {
  url: string
}

export default function NotionBookmark({ url }: NotionBookmarkProps) {
  const [metadata, setMetadata] = useState<BookmarkMetadata | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const response = await fetch(`/api/og-metadata?url=${encodeURIComponent(url)}`)
        if (!response.ok) throw new Error('Failed to fetch metadata')
        const data: BookmarkMetadata = await response.json()
        setMetadata(data)
      } catch (err) {
        console.error('Error fetching bookmark metadata:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchMetadata()
  }, [url])

  if (loading) {
    return (
      <div className="w-full h-24 bg-gray-100 rounded-lg border border-gray-200 animate-pulse" />
    )
  }

  if (error || !metadata) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <div className="font-semibold text-sm text-gray-900 truncate">{url}</div>
      </a>
    )
  }

  const hostname = new URL(metadata.url).hostname || ''
  const displayHostname = hostname.replace('www.', '')

  return (
    <a
      href={metadata.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block w-full border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
    >
      <div className="flex gap-4 p-4 h-28 sm:h-24">
        {/* Left: Text Content */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          {/* Header with favicon */}
          <div className="flex items-center gap-2 mb-2">
            {metadata.favicon && (
              <div className="relative w-5 h-5 flex-shrink-0">
                <Image
                  src={metadata.favicon}
                  alt=""
                  width={20}
                  height={20}
                  className="rounded w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
            )}
            <span className="text-xs text-gray-500 truncate">{displayHostname}</span>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1">
            {metadata.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-gray-600 line-clamp-1">{metadata.description}</p>
        </div>

        {/* Right: Thumbnail Image */}
        {metadata.image && (
          <div className="hidden sm:block relative w-24 h-24 flex-shrink-0">
            <Image
              src={metadata.image}
              alt=""
              fill
              className="object-cover rounded"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          </div>
        )}
      </div>
    </a>
  )
}
