import { NextRequest, NextResponse } from 'next/server'
import { ogs } from 'open-graph-scraper'
import { getBookmarkMetadataFromCache, saveBookmarkMetadataToCache } from '@/lib/bookmark-cache'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const url = searchParams.get('url')

    if (!url) {
      return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 })
    }

    // Check cache first
    const cached = await getBookmarkMetadataFromCache(url)
    if (cached) {
      return NextResponse.json(cached)
    }

    // Fetch metadata using open-graph-scraper
    const { result } = await ogs({ url })

    const metadata = {
      url,
      title: result.ogTitle || result.title || '',
      description: result.ogDescription || result.description || '',
      favicon:
        result.favicon ||
        result.appleTouchIconUrl ||
        `https://www.google.com/s2/favicons?sz=64&domain=${new URL(url).hostname}`,
      image: result.ogImage?.[0]?.url || result.twitterImage?.[0]?.url || '',
    }

    // Save to cache
    await saveBookmarkMetadataToCache(metadata)

    return NextResponse.json(metadata)
  } catch (error) {
    console.error('Error fetching OG metadata:', error)

    // Return graceful fallback on error
    const url = new URL(request.url).searchParams.get('url') || ''
    return NextResponse.json(
      {
        url,
        title: 'Unable to load',
        description: 'Click to visit the link',
        favicon: `https://www.google.com/s2/favicons?sz=64&domain=${new URL(url).hostname}`,
        image: '',
      },
      { status: 200 }
    )
  }
}
