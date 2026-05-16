import { supabase, getPublicUrl, type Bucket } from './supabase'

export async function uploadImageToSupabase(
  imageUrl: string,
  blockId: string,
  bucket: Bucket
): Promise<string | null> {
  try {
    const storagePath = `images/${blockId}`
    const publicUrl = getPublicUrl(bucket, storagePath)

    // Check existence via HEAD (no listing needed)
    const check = await fetch(publicUrl, { method: 'HEAD' })
    if (check.ok) return publicUrl

    // Download from Notion and upload to Supabase
    const res = await fetch(imageUrl)
    if (!res.ok) throw new Error(`Failed to download image: ${res.statusText}`)
    const contentType = (res.headers.get('content-type') ?? 'image/jpeg').split(';')[0].trim()
    const buffer = Buffer.from(await res.arrayBuffer())

    const { error } = await supabase.storage
      .from(bucket)
      .upload(storagePath, buffer, { contentType, upsert: true })
    if (error) throw error

    return publicUrl
  } catch (error) {
    console.error(`Error syncing image ${blockId}:`, error)
    return null
  }
}

export async function syncBlockImages(blocks: any[], bucket: Bucket): Promise<any[]> {
  return Promise.all(
    blocks.map(async (block) => {
      if (block.type === 'image' && block.image?.type === 'file' && block.image.file?.url) {
        const publicUrl = await uploadImageToSupabase(block.image.file.url, block.id, bucket)
        if (publicUrl) {
          return {
            ...block,
            image: { ...block.image, file: { ...block.image.file, url: publicUrl } },
          }
        }
      }
      return block
    })
  )
}

// Legacy helpers kept for the manual sync script
export async function getImageBlocks(pageId: string) {
  const { Client } = await import('@notionhq/client')
  const notion = new Client({ auth: process.env.NOTION_TOKEN })
  const response = await notion.blocks.children.list({ block_id: pageId, page_size: 100 })
  const imageBlocks: { blockId: string; tempUrl: string; caption?: string }[] = []
  for (const block of response.results) {
    if ('type' in block && block.type === 'image') {
      const imageBlock = block as any
      const imageData = imageBlock.image
      if (imageData?.type === 'external' && imageData.external?.url) {
        imageBlocks.push({ blockId: block.id, tempUrl: imageData.external.url, caption: imageData.caption?.[0]?.plain_text })
      } else if (imageData?.type === 'file' && imageData.file?.url) {
        imageBlocks.push({ blockId: block.id, tempUrl: imageData.file.url, caption: imageData.caption?.[0]?.plain_text })
      }
    }
  }
  return imageBlocks
}

export async function syncPageImages(pageId: string, bucket: Bucket): Promise<Map<string, string>> {
  const urlMap = new Map<string, string>()
  try {
    const imageBlocks = await getImageBlocks(pageId)
    for (const block of imageBlocks) {
      const publicUrl = await uploadImageToSupabase(block.tempUrl, block.blockId, bucket)
      if (publicUrl) urlMap.set(block.tempUrl, publicUrl)
    }
  } catch (error) {
    console.error(`Error syncing page images for ${pageId}:`, error)
  }
  return urlMap
}

export function replaceImageUrlsInContent(content: string, urlMap: Map<string, string>): string {
  let result = content
  for (const [oldUrl, newUrl] of urlMap) {
    const escapedUrl = oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    result = result.replace(new RegExp(escapedUrl, 'g'), newUrl)
  }
  return result
}

export async function syncWorkPostContent(slug: string, pageId: string) { return syncPageImages(pageId, 'work') }
export async function syncBlogPostContent(slug: string, pageId: string) { return syncPageImages(pageId, 'blog') }
export async function syncAssetPostContent(slug: string, pageId: string) { return syncPageImages(pageId, 'assets') }
