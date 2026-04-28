import { config } from 'dotenv'
config({ path: '.env.local' })

import { Client } from '@notionhq/client'
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { createClient } from '@supabase/supabase-js'
import type { Bucket } from '../lib/supabase'

const notion = new Client({ auth: process.env.NOTION_TOKEN })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

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

async function uploadToStorage(buffer: Buffer, contentType: string, bucket: string, path: string): Promise<string> {
  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, buffer, { contentType, upsert: true })
  if (error) throw error
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}

async function syncProperty(
  page: PageObjectResponse,
  propKey: string,
  bucket: string,
  storagePath: string
): Promise<void> {
  const notionUrl = getNotionFileUrl(page, propKey)
  if (!notionUrl) {
    console.log(`  — ${propKey}: no file`)
    return
  }
  const { buffer, contentType } = await downloadFile(notionUrl)
  const publicUrl = await uploadToStorage(buffer, contentType, bucket, storagePath)
  console.log(`  ✓ ${propKey} → ${publicUrl}`)
}

async function syncDatabase(
  dbId: string,
  bucket: Bucket,
  properties: { propKey: string; pathPrefix: string }[]
): Promise<{ synced: number; skipped: number; failed: number }> {
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

  console.log(`  Found ${pages.length} posts`)

  let synced = 0, skipped = 0, failed = 0

  for (const page of pages) {
    const slug = getSlug(page)
    if (!slug) {
      console.warn(`  Skipping ${page.id} — no slug`)
      skipped++
      continue
    }

    console.log(`  [${slug}]`)
    try {
      for (const { propKey, pathPrefix } of properties) {
        await syncProperty(page, propKey, bucket, `${pathPrefix}/${slug}`)
      }
      synced++
    } catch (e) {
      console.error(`    ✗ error:`, e instanceof Error ? e.message : e)
      failed++
    }
  }

  return { synced, skipped, failed }
}

async function main() {
  const missing = [
    'NOTION_TOKEN',
    'NOTION_WORK_DB_ID',
    'NOTION_BLOG_DB_ID',
    'NOTION_ASSETS_DB_ID',
    'NEXT_PUBLIC_SUPABASE_URL',
  ].filter((k) => !process.env[k])
  if (missing.length) throw new Error(`Missing env vars: ${missing.join(', ')}`)

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

  let totalSynced = 0, totalSkipped = 0, totalFailed = 0

  for (const db of databases) {
    console.log(`\n── ${db.name} ──`)
    const { synced, skipped, failed } = await syncDatabase(db.dbId, db.bucket, db.properties)
    totalSynced += synced
    totalSkipped += skipped
    totalFailed += failed
  }

  console.log(`\nDone — ${totalSynced} synced, ${totalSkipped} skipped, ${totalFailed} failed`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
