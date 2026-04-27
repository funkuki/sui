import { NextRequest, NextResponse } from 'next/server'
import { syncPageImages } from '@/lib/notion-image-sync'
import type { Bucket } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  // 驗證 API 密鑰（如果設定）
  const authHeader = request.headers.get('authorization')
  const expectedToken = process.env.SYNC_API_KEY

  if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { pageId, bucket = 'work' } = await request.json()

    if (!pageId) {
      return NextResponse.json({ error: 'Missing pageId' }, { status: 400 })
    }

    if (!['work', 'blog', 'assets'].includes(bucket)) {
      return NextResponse.json({ error: 'Invalid bucket' }, { status: 400 })
    }

    const urlMap = await syncPageImages(pageId, bucket as Bucket)

    return NextResponse.json({
      success: true,
      pageId,
      bucket,
      syncedImages: urlMap.size,
      urlMapping: Object.fromEntries(urlMap),
    })
  } catch (error) {
    console.error('Sync error:', error)
    return NextResponse.json(
      {
        error: 'Sync failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Image sync endpoint. Use POST with pageId and bucket.' })
}
