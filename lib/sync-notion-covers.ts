import { Client } from '@notionhq/client'
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { createClient } from '@supabase/supabase-js'
import type { Bucket } from './supabase'

export interface SyncResult {
  synced: number
  skipped: number
  failed: number
}

export interface SyncAllResult {
  work: SyncResult
  blog: SyncResult
  assets: SyncResult
  totalSynced: number
  totalSkipped: number
  totalFailed: number
}

function makeSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  return createClient(url, key)
}

function getNotionFileUrl(page: PageObjectResponse, key: string): string | null {
  const prop = page.properties[key]
  if (prop?.type !== 'files') return null
  const file = prop.files[0]
  if (!file) return null
  if (file.type === 'file') return file.file.url
  if (file.type === 'external') return file.external.url
  return null
}

function getSlug(page: PageObjectResponse): string {
  const prop = page.properties['Slug']
  if (prop?.type !== 'rich_text') return ''
  return prop.rich_text[0]?.plain_text ?? ''
}

async function downloadFile(url: string): Promise<{ buffer: Buffer; contentType: string }> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`)
  const contentType = (res.headers.get('content-type') ?? 'image/jpeg').split(';')[0].trim()
  return { buffer: Buffer.from(await res.arrayBuffer()), contentType }
}

async function syncDatabase(
  notion: Client,
  supabase: ReturnType<typeof makeSupabaseClient>,
  dbId: string,
  bucket: Bucket,
  properties: { propKey: string; pathPrefix: string }[],
  log: (msg: string) => void
): Promise<SyncResult> {
  const pages: PageObjectResponse[] = []
  let cursor: string | undefined
  do {
    const res = await notion.databases.query({
      database_id: dbId,
      page_size: 100,
      start_cursor: cursor,
    })
    pages.push(...(res.results as PageObjectResponse[]))
    cursor = res.has_more ? (res.next_cursor ?? undefined) : undefined
  } while (cursor)

  log(`  Found ${pages.length} posts`)

  let synced = 0, skipped = 0, failed = 0

  for (const page of pages) {
    const slug = getSlug(page)
    if (!slug) {
      log(`  Skipping ${page.id} — no slug`)
      skipped++
      continue
    }

    log(`  [${slug}]`)
    try {
      for (const { propKey, pathPrefix } of properties) {
        const notionUrl = getNotionFileUrl(page, propKey)
        if (!notionUrl) {
          log(`  — ${propKey}: no file`)
          continue
        }
        const { buffer, contentType } = await downloadFile(notionUrl)
        const storagePath = `${pathPrefix}/${slug}`
        const { error } = await supabase.storage
          .from(bucket)
          .upload(storagePath, buffer, { contentType, upsert: true })
        if (error) throw error
        const { data } = supabase.storage.from(bucket).getPublicUrl(storagePath)
        log(`  ✓ ${propKey} → ${data.publicUrl}`)
      }
      synced++
    } catch (e) {
      log(`    ✗ error: ${e instanceof Error ? e.message : String(e)}`)
      failed++
    }
  }

  return { synced, skipped, failed }
}

export async function syncAllCovers(log: (msg: string) => void = console.log): Promise<SyncAllResult> {
  const missing = [
    'NOTION_TOKEN',
    'NOTION_WORK_DB_ID',
    'NOTION_BLOG_DB_ID',
    'NOTION_ASSETS_DB_ID',
    'NEXT_PUBLIC_SUPABASE_URL',
  ].filter((k) => !process.env[k])
  if (missing.length) throw new Error(`Missing env vars: ${missing.join(', ')}`)

  const notion = new Client({ auth: process.env.NOTION_TOKEN })
  const supabase = makeSupabaseClient()

  const databases = [
    {
      name: 'Work',
      dbId: process.env.NOTION_WORK_DB_ID!,
      bucket: 'work' as Bucket,
      properties: [
        { propKey: 'Cover URL', pathPrefix: 'covers' },
        { propKey: 'icon', pathPrefix: 'icons' },
      ],
    },
    {
      name: 'Blog',
      dbId: process.env.NOTION_BLOG_DB_ID!,
      bucket: 'blog' as Bucket,
      properties: [{ propKey: 'Cover URL', pathPrefix: 'covers' }],
    },
    {
      name: 'Assets',
      dbId: process.env.NOTION_ASSETS_DB_ID!,
      bucket: 'assets' as Bucket,
      properties: [{ propKey: 'Cover URL', pathPrefix: 'covers' }],
    },
  ]

  const results: Record<string, SyncResult> = {}

  for (const db of databases) {
    log(`\n── ${db.name} ──`)
    results[db.name.toLowerCase()] = await syncDatabase(
      notion, supabase, db.dbId, db.bucket, db.properties, log
    )
  }

  const totalSynced = Object.values(results).reduce((a, r) => a + r.synced, 0)
  const totalSkipped = Object.values(results).reduce((a, r) => a + r.skipped, 0)
  const totalFailed = Object.values(results).reduce((a, r) => a + r.failed, 0)

  log(`\nDone — ${totalSynced} synced, ${totalSkipped} skipped, ${totalFailed} failed`)

  return {
    work: results['work'],
    blog: results['blog'],
    assets: results['assets'],
    totalSynced,
    totalSkipped,
    totalFailed,
  }
}
