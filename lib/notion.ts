import { Client } from '@notionhq/client'
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import type { WorkPost, BlogPost, AssetPost } from '@/types'

const notion = new Client({ auth: process.env.NOTION_TOKEN })

const WORK_DB = process.env.NOTION_WORK_DB_ID!
const BLOG_DB = process.env.NOTION_BLOG_DB_ID!
const ASSETS_DB = process.env.NOTION_ASSETS_DB_ID!

// ─── Property helpers ───────────────────────────────────────────────────────

function title(page: PageObjectResponse, key: string): string {
  const prop = page.properties[key]
  if (prop?.type !== 'title') return ''
  return prop.title[0]?.plain_text ?? ''
}

function text(page: PageObjectResponse, key: string): string {
  const prop = page.properties[key]
  if (prop?.type !== 'rich_text') return ''
  return prop.rich_text[0]?.plain_text ?? ''
}

function select(page: PageObjectResponse, key: string): string {
  const prop = page.properties[key]
  if (prop?.type !== 'select') return ''
  return prop.select?.name ?? ''
}

function multiSelect(page: PageObjectResponse, key: string): string[] {
  const prop = page.properties[key]
  if (prop?.type !== 'multi_select') return []
  return prop.multi_select.map((s) => s.name)
}

function date(page: PageObjectResponse, key: string): string {
  const prop = page.properties[key]
  if (prop?.type !== 'date') return ''
  return prop.date?.start ?? ''
}

function url(page: PageObjectResponse, key: string): string {
  const prop = page.properties[key]
  if (prop?.type !== 'url') return ''
  return prop.url ?? ''
}

function checkbox(page: PageObjectResponse, key: string): boolean {
  const prop = page.properties[key]
  if (prop?.type !== 'checkbox') return false
  return prop.checkbox
}

function number(page: PageObjectResponse, key: string): number {
  const prop = page.properties[key]
  if (prop?.type !== 'number') return 0
  return prop.number ?? 0
}

// ─── Work ───────────────────────────────────────────────────────────────────

function toWorkPost(page: PageObjectResponse): WorkPost {
  return {
    id: page.id,
    title: title(page, 'Title'),
    slug: text(page, 'Slug'),
    status: select(page, 'Status') as WorkPost['status'],
    publishedAt: date(page, 'Published At'),
    coverUrl: url(page, 'Cover URL'),
    iconUrl: url(page, 'icon'),
    tags: multiSelect(page, 'Tags'),
    category: select(page, 'Category'),
    summary: text(page, 'Summary'),
    client: text(page, 'Client'),
    year: number(page, 'Year'),
    featured: checkbox(page, 'Featured'),
  }
}

export async function getWorkPosts(tag?: string): Promise<WorkPost[]> {
  const response = await notion.databases.query({
    database_id: WORK_DB,
    filter: { property: 'Status', select: { equals: 'Published' } },
    sorts: [{ property: 'Published At', direction: 'descending' }],
  })
  const posts = (response.results as PageObjectResponse[]).map(toWorkPost)
  if (tag) return posts.filter((p) => p.tags.includes(tag))
  return posts
}

export async function getWorkPost(slug: string): Promise<WorkPost | null> {
  const posts = await getWorkPosts()
  return posts.find((p) => p.slug === slug) ?? null
}

// ─── Blog ───────────────────────────────────────────────────────────────────

function toBlogPost(page: PageObjectResponse): BlogPost {
  return {
    id: page.id,
    title: title(page, 'Title'),
    slug: text(page, 'Slug'),
    status: select(page, 'Status') as BlogPost['status'],
    publishedAt: date(page, 'Published At'),
    coverUrl: url(page, 'Cover URL'),
    tags: multiSelect(page, 'Tags'),
    category: select(page, 'Category'),
    summary: text(page, 'Summary'),
    featured: checkbox(page, 'Featured'),
  }
}

export async function getBlogPosts(tag?: string): Promise<BlogPost[]> {
  const response = await notion.databases.query({
    database_id: BLOG_DB,
    filter: { property: 'Status', select: { equals: 'Published' } },
    sorts: [{ property: 'Published At', direction: 'descending' }],
  })
  const posts = (response.results as PageObjectResponse[]).map(toBlogPost)
  if (tag) return posts.filter((p) => p.tags.includes(tag))
  return posts
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const response = await notion.databases.query({
    database_id: BLOG_DB,
    filter: {
      and: [
        { property: 'Slug', rich_text: { equals: slug } },
        { property: 'Status', select: { equals: 'Published' } },
      ],
    },
  })
  const page = response.results[0] as PageObjectResponse | undefined
  return page ? toBlogPost(page) : null
}

// ─── Assets ─────────────────────────────────────────────────────────────────

function toAssetPost(page: PageObjectResponse): AssetPost {
  let previewUrls: string[] = []
  try {
    previewUrls = JSON.parse(text(page, 'Preview URLs'))
  } catch {
    // malformed or empty — leave as []
  }
  return {
    id: page.id,
    title: title(page, 'Title'),
    slug: text(page, 'Slug'),
    status: select(page, 'Status') as AssetPost['status'],
    publishedAt: date(page, 'Published At'),
    coverUrl: url(page, 'Cover URL'),
    tags: multiSelect(page, 'Tags'),
    category: select(page, 'Category'),
    summary: text(page, 'Summary'),
    price: number(page, 'Price'),
    fileUrl: url(page, 'File URL'),
    previewUrls,
    downloads: number(page, 'Downloads'),
  }
}

export async function getAssetPosts(tag?: string): Promise<AssetPost[]> {
  const response = await notion.databases.query({
    database_id: ASSETS_DB,
    filter: { property: 'Status', select: { equals: 'Published' } },
    sorts: [{ property: 'Published At', direction: 'descending' }],
  })
  const posts = (response.results as PageObjectResponse[]).map(toAssetPost)
  if (tag) return posts.filter((p) => p.tags.includes(tag))
  return posts
}

export async function getAssetPost(slug: string): Promise<AssetPost | null> {
  const response = await notion.databases.query({
    database_id: ASSETS_DB,
    filter: {
      and: [
        { property: 'Slug', rich_text: { equals: slug } },
        { property: 'Status', select: { equals: 'Published' } },
      ],
    },
  })
  const page = response.results[0] as PageObjectResponse | undefined
  return page ? toAssetPost(page) : null
}

// ─── Page blocks (for detail pages) ─────────────────────────────────────────

export async function getPageBlocks(pageId: string) {
  const response = await notion.blocks.children.list({ block_id: pageId, page_size: 100 })
  return response.results
}

// ─── Image sync ─────────────────────────────────────────────────────────────

async function findPageIdBySlug(
  databaseId: string,
  slug: string
): Promise<string | null> {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: { property: 'Slug', rich_text: { equals: slug } },
  })
  const page = response.results[0] as PageObjectResponse | undefined
  return page?.id ?? null
}

export async function syncWorkPostImages(slug: string): Promise<Map<string, string> | null> {
  const { syncPageImages } = await import('./notion-image-sync')
  const pageId = await findPageIdBySlug(WORK_DB, slug)
  if (!pageId) return null
  return syncPageImages(pageId, 'work')
}

export async function syncBlogPostImages(slug: string): Promise<Map<string, string> | null> {
  const { syncPageImages } = await import('./notion-image-sync')
  const pageId = await findPageIdBySlug(BLOG_DB, slug)
  if (!pageId) return null
  return syncPageImages(pageId, 'blog')
}

export async function syncAssetPostImages(slug: string): Promise<Map<string, string> | null> {
  const { syncPageImages } = await import('./notion-image-sync')
  const pageId = await findPageIdBySlug(ASSETS_DB, slug)
  if (!pageId) return null
  return syncPageImages(pageId, 'assets')
}
