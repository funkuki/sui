import type { Metadata } from 'next'
import { getAssetPosts } from '@/lib/notion'
import PostGrid from '@/components/PostGrid'

export const metadata: Metadata = {
  title: 'Assets',
  description: 'Free and paid design assets, templates, and resources',
}

export const revalidate = 300

export default async function AssetsPage() {
  const posts = await getAssetPosts()
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags))).sort()

  return (
    <div className="animate-page-in">
      <section style={{ padding: '80px 80px 30px' }} className="max-md:!px-5 max-md:!py-12">
        <h1
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 800,
            fontSize: 96,
            margin: 0,
            letterSpacing: '-0.02em',
            color: '#0c0c0c',
          }}
          className="max-md:!text-5xl"
        >
          Assets
        </h1>
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 22,
            color: '#2e2e2e',
            marginTop: 16,
            maxWidth: 720,
          }}
          className="max-md:!text-base"
        >
          設計師的工作包，邊做邊長 — Templates · Stickers · Workbooks · Kits.
        </p>
      </section>

      <section style={{ padding: '30px 80px 100px' }} className="max-md:!px-5 max-md:!pb-16">
        <PostGrid posts={posts} allTags={allTags} type="assets" />
      </section>
    </div>
  )
}
