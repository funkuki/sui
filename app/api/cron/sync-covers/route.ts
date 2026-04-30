import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { syncAllCovers } from '@/lib/sync-notion-covers'

export const maxDuration = 300

export async function GET(request: NextRequest) {
  if (request.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const logs: string[] = []
  const log = (msg: string) => {
    console.log(msg)
    logs.push(msg)
  }

  let result
  try {
    result = await syncAllCovers(log)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error('Cover sync failed:', message)
    return NextResponse.json({ success: false, error: message, logs }, { status: 500 })
  }

  revalidatePath('/work', 'layout')
  revalidatePath('/', 'page')
  revalidatePath('/blog', 'layout')
  revalidatePath('/assets', 'layout')

  return NextResponse.json({
    success: true,
    revalidated: true,
    paths: ['/', '/work', '/blog', '/assets'],
    ...result,
    logs,
  })
}
