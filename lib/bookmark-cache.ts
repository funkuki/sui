import { supabase } from './supabase'

export interface BookmarkMetadata {
  url: string
  title: string
  description: string
  favicon: string
  image: string
}

const CACHE_TABLE = 'bookmark_cache'
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000 // 7 days in ms

export async function getBookmarkMetadataFromCache(url: string): Promise<BookmarkMetadata | null> {
  try {
    const { data, error } = await supabase
      .from(CACHE_TABLE)
      .select('*')
      .eq('url', url)
      .single()

    if (error || !data) return null

    // Check if cache expired
    const createdAt = new Date(data.created_at).getTime()
    const now = Date.now()
    if (now - createdAt > CACHE_DURATION) {
      // Delete expired cache
      await supabase.from(CACHE_TABLE).delete().eq('url', url)
      return null
    }

    return {
      url: data.url,
      title: data.title,
      description: data.description,
      favicon: data.favicon,
      image: data.image,
    }
  } catch {
    return null
  }
}

export async function saveBookmarkMetadataToCache(metadata: BookmarkMetadata): Promise<boolean> {
  try {
    const { error } = await supabase.from(CACHE_TABLE).insert([
      {
        url: metadata.url,
        title: metadata.title,
        description: metadata.description,
        favicon: metadata.favicon,
        image: metadata.image,
        created_at: new Date().toISOString(),
      },
    ])

    if (error) {
      // PGRST205 = table not found; silently skip if cache table doesn't exist yet
      if ((error as any).code !== 'PGRST205') {
        console.error('Error saving bookmark cache:', error)
      }
      return false
    }

    return true
  } catch {
    return false
  }
}
