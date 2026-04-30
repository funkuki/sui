import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  if (searchParams.get('secret') !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  const type = searchParams.get('type') // 'work' | 'blog' | 'assets' | null (= all)

  const paths: string[] = []

  if (!type || type === 'work') {
    revalidatePath('/work', 'layout')   // covers /work + /work/[slug]
    revalidatePath('/', 'page')         // homepage shows featured work
    paths.push('/work', '/')
  }
  if (!type || type === 'blog') {
    revalidatePath('/blog', 'layout')
    paths.push('/blog')
  }
  if (!type || type === 'assets') {
    revalidatePath('/assets', 'layout')
    paths.push('/assets')
  }

  return NextResponse.json({ revalidated: true, paths })
}
