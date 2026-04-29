import { Client } from '@notionhq/client'
import { supabase, getPublicUrl, type Bucket } from './supabase'

const notion = new Client({ auth: process.env.NOTION_TOKEN })

interface ImageBlockData {
  blockId: string
  tempUrl: string
  caption?: string
}

async function downloadImage(url: string): Promise<Buffer> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.statusText}`)
  }
  return Buffer.from(await response.arrayBuffer())
}

function getFileExtension(url: string): string {
  try {
    const urlObj = new URL(url)
    const path = urlObj.pathname
    const match = path.match(/\.([^./?]+)(?:\?|$)/)
    return match ? match[1].toLowerCase() : 'png'
  } catch {
    return 'png'
  }
}

export async function getImageBlocks(pageId: string): Promise<ImageBlockData[]> {
  const response = await notion.blocks.children.list({
    block_id: pageId,
    page_size: 100,
  })

  const imageBlocks: ImageBlockData[] = []

  for (const block of response.results) {
    if ('type' in block && block.type === 'image') {
      const imageBlock = block as any
      const imageData = imageBlock.image

      if (imageData?.type === 'external' && imageData.external?.url) {
        imageBlocks.push({
          blockId: block.id,
          tempUrl: imageData.external.url,
          caption: imageData.caption?.[0]?.plain_text,
        })
      } else if (imageData?.type === 'file' && imageData.file?.url) {
        imageBlocks.push({
          blockId: block.id,
          tempUrl: imageData.file.url,
          caption: imageData.caption?.[0]?.plain_text,
        })
      }
    }
  }

  return imageBlocks
}

export async function uploadImageToSupabase(
  imageUrl: string,
  blockId: string,
  bucket: Bucket
): Promise<string | null> {
  try {
    const ext = getFileExtension(imageUrl)
    const fileName = `${blockId}.${ext}`

    // Check if file already exists
    const { data: files } = await supabase.storage
      .from(bucket)
      .list('images', { limit: 1000 })

    const fileExists = files?.some((f) => f.name === fileName)

    if (fileExists) {
      console.log(`Image ${fileName} already exists, skipping upload`)
      return getPublicUrl(bucket, `images/${fileName}`)
    }

    // Download image
    const imageBuffer = await downloadImage(imageUrl)

    // Upload to Supabase
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(`images/${fileName}`, imageBuffer, {
        contentType: `image/${ext === 'jpg' ? 'jpeg' : ext}`,
        upsert: false,
      })

    if (error) {
      console.error(`Failed to upload image ${fileName}:`, error)
      return null
    }

    const publicUrl = getPublicUrl(bucket, `images/${fileName}`)
    console.log(`Successfully uploaded ${fileName}: ${publicUrl}`)
    return publicUrl
  } catch (error) {
    console.error(`Error processing image ${blockId}:`, error)
    return null
  }
}

export async function syncPageImages(
  pageId: string,
  bucket: Bucket
): Promise<Map<string, string>> {
  const urlMap = new Map<string, string>()

  try {
    const imageBlocks = await getImageBlocks(pageId)

    console.log(`Found ${imageBlocks.length} images in page ${pageId}`)

    for (const block of imageBlocks) {
      const publicUrl = await uploadImageToSupabase(block.tempUrl, block.blockId, bucket)

      if (publicUrl) {
        urlMap.set(block.tempUrl, publicUrl)
      }
    }

    console.log(`Successfully synced ${urlMap.size} images`)
  } catch (error) {
    console.error(`Error syncing page images for ${pageId}:`, error)
  }

  return urlMap
}

export function replaceImageUrlsInContent(content: string, urlMap: Map<string, string>): string {
  let result = content

  for (const [oldUrl, newUrl] of urlMap) {
    // Escape special regex characters in the URL
    const escapedUrl = oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(escapedUrl, 'g')
    result = result.replace(regex, newUrl)
  }

  return result
}

export async function syncWorkPostContent(
  slug: string,
  pageId: string
): Promise<Map<string, string>> {
  return syncPageImages(pageId, 'work')
}

export async function syncBlogPostContent(
  slug: string,
  pageId: string
): Promise<Map<string, string>> {
  return syncPageImages(pageId, 'blog')
}

export async function syncAssetPostContent(
  slug: string,
  pageId: string
): Promise<Map<string, string>> {
  return syncPageImages(pageId, 'assets')
}
