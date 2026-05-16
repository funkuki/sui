import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { syncAllCovers } from '@/lib/sync-notion-covers'

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  if (searchParams.get('secret') !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  try {
    const result = await syncAllCovers()

    revalidatePath('/work', 'layout')
    revalidatePath('/blog', 'layout')
    revalidatePath('/assets', 'layout')
    revalidatePath('/', 'page')

    return NextResponse.json({ success: true, ...result })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Cover sync endpoint. Use POST with ?secret=<REVALIDATE_SECRET>',
  })
}
