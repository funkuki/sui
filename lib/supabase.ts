import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let _client: SupabaseClient | undefined

function tryGetClient(): SupabaseClient | undefined {
  if (_client) return _client
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return undefined
  _client = createClient(url, key)
  return _client
}

export const supabase = new Proxy({} as SupabaseClient, {
  get(_, prop: string | symbol) {
    const client = tryGetClient()
    if (!client) return undefined
    const value = Reflect.get(client, prop)
    return typeof value === 'function' ? (value as Function).bind(client) : value
  },
})

const BUCKETS = {
  work: 'work',
  blog: 'blog',
  assets: 'assets',
} as const

export type Bucket = keyof typeof BUCKETS

export function getPublicUrl(bucket: Bucket, path: string): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!url) return ''
  return `${url}/storage/v1/object/public/${BUCKETS[bucket]}/${path}`
}
