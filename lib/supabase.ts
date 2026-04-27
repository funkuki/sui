import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

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
