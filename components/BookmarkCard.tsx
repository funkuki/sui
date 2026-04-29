import Image from 'next/image'
import ogs from 'open-graph-scraper'
import { getBookmarkMetadataFromCache, saveBookmarkMetadataToCache } from '@/lib/bookmark-cache'

interface BookmarkCardProps {
  url: string
}

async function fetchAppStoreMetadata(url: string) {
  const appIdMatch = url.match(/\/id(\d+)/)
  if (!appIdMatch) return null

  const appId = appIdMatch[1]
  const country = url.match(/apps\.apple\.com\/([a-z]{2})\//)?.[1] ?? 'us'
  const res = await fetch(`https://itunes.apple.com/lookup?id=${appId}&country=${country}`)
  if (!res.ok) return null

  const data = await res.json()
  const app = data.results?.[0]
  if (!app) return null

  return {
    url,
    title: `${app.trackName} - App Store`,
    description: (app.description as string)?.slice(0, 200) ?? '',
    favicon: 'https://www.apple.com/favicon.ico',
    image: (app.artworkUrl512 || app.artworkUrl100) as string,
  }
}

async function fetchMetadata(url: string) {
  try {
    const cached = await getBookmarkMetadataFromCache(url)
    if (cached) return cached
  } catch {
    // Supabase cache table may not exist yet — skip gracefully
  }

  try {
    const metadata = url.includes('apps.apple.com')
      ? await fetchAppStoreMetadata(url)
      : await (async () => {
          const { result } = await ogs({ url })
          return {
            url,
            title: result.ogTitle || result.dcTitle || '',
            description: result.ogDescription || result.dcDescription || '',
            favicon:
              result.favicon ||
              `https://www.google.com/s2/favicons?sz=64&domain=${new URL(url).hostname}`,
            image: result.ogImage?.[0]?.url || result.twitterImage?.[0]?.url || '',
          }
        })()

    if (metadata) {
      try {
        await saveBookmarkMetadataToCache(metadata)
      } catch {
        // ignore cache write errors
      }
    }
    return metadata
  } catch {
    return null
  }
}

export default async function BookmarkCard({ url }: BookmarkCardProps) {
  const metadata = await fetchMetadata(url)

  const hostname = (() => {
    try { return new URL(url).hostname.replace('www.', '') } catch { return url }
  })()

  if (!metadata || !metadata.title) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '16px 20px',
          border: '1px solid #e6e6e6',
          borderRadius: 12,
          fontFamily: 'Inter, sans-serif',
          fontSize: 14,
          color: '#8f8a8a',
          textDecoration: 'none',
        }}
      >
        <Image
          src={`https://www.google.com/s2/favicons?sz=32&domain=${hostname}`}
          alt=""
          width={16}
          height={16}
          style={{ borderRadius: 3 }}
        />
        {url}
      </a>
    )
  }

  return (
    <a
      href={metadata.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        alignItems: 'stretch',
        borderRadius: 12,
        overflow: 'hidden',
        textDecoration: 'none',
        minHeight: 120,
      }}
      className="border border-[#e6e6e6] bg-white hover:border-[#c8c8c8] hover:bg-[#f9f9f9] transition-[border-color,background] duration-200"
    >
      {/* Left: Text */}
      <div style={{
        flex: 1,
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 6,
        padding: '20px 24px',
      }}>
        {/* Title */}
        <div style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
          fontSize: 16,
          color: '#0c0c0c',
          lineHeight: 1.4,
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}>
          {metadata.title}
        </div>

        {/* Description */}
        {metadata.description && (
          <div style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 13,
            color: '#8f8a8a',
            lineHeight: 1.5,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}>
            {metadata.description}
          </div>
        )}

        {/* Bottom: favicon + hostname */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
          <Image
            src={metadata.favicon || `https://www.google.com/s2/favicons?sz=32&domain=${hostname}`}
            alt=""
            width={14}
            height={14}
            style={{ borderRadius: 3, flexShrink: 0 }}
          />
          <span style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 12,
            color: '#8f8a8a',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {hostname}
          </span>
        </div>
      </div>

      {/* Right: Thumbnail */}
      {metadata.image && (
        <div style={{
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 16,
        }}>
          <Image
            src={metadata.image}
            alt=""
            width={88}
            height={88}
            style={{ objectFit: 'contain', borderRadius: 16 }}
          />
        </div>
      )}
    </a>
  )
}
