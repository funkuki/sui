import Image from 'next/image'
import { getBookmarkMetadataFromCache, saveBookmarkMetadataToCache } from '@/lib/bookmark-cache'
import NotionBookmark from './NotionBookmark'

interface NotionBookmarkServerProps {
  url: string
}

async function fetchAndCacheMetadata(url: string) {
  try {
    // Check cache first
    const cached = await getBookmarkMetadataFromCache(url)
    if (cached) {
      return cached
    }

    // Fetch from API
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL?.replace('/rest/', '').replace('v1', '')}api/og-metadata?url=${encodeURIComponent(url)}`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''}`,
        },
      }
    )

    if (!response.ok) return null
    return await response.json()
  } catch (error) {
    console.error('Error fetching bookmark metadata:', error)
    return null
  }
}

export async function NotionBookmarkServer({ url }: NotionBookmarkServerProps) {
  try {
    const metadata = await fetchAndCacheMetadata(url)

    if (!metadata) {
      // Fallback to client component
      return <NotionBookmark url={url} />
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
              />
            </div>
          )}
        </div>
      </a>
    )
  } catch (error) {
    console.error('Server-side bookmark rendering failed:', error)
    // Fallback to client component
    return <NotionBookmark url={url} />
  }
}
