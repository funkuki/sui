import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let _client: SupabaseClient | undefined

export const supabase = new Proxy({} as SupabaseClient, {
  get(_, prop: string | symbol) {
    _client ??= createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )
    const value = Reflect.get(_client, prop)
    return typeof value === 'function' ? (value as Function).bind(_client) : value
  },
})

// Storage buckets mirror the content sections
const BUCKETS = {
  work: 'work',
  blog: 'blog',
  assets: 'assets',
} as const

export type Bucket = keyof typeof BUCKETS

export function getPublicUrl(bucket: Bucket, path: string): string {
  const { data } = supabase.storage.from(BUCKETS[bucket]).getPublicUrl(path)
  return data.publicUrl
}
