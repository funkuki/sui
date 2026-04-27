import type { Metadata } from 'next'
import { getWorkPosts } from '@/lib/notion'
import PostGrid from '@/components/PostGrid'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Selected projects — branding, UI, illustration',
}

export const revalidate = 300

export default async function WorkPage() {
  const posts = await getWorkPosts()
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags))).sort()

  return (
    <div className="animate-page-in">
      <section style={{ padding: '80px 80px 40px' }} className="max-md:!px-5 max-md:!py-12">
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
          Work
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
          A selection of brand, product and IP work — filter by what you&apos;re curious about.
        </p>
      </section>

      <section style={{ padding: '0 80px 20px' }} className="max-md:!px-5">
        <PostGrid posts={posts} allTags={allTags} type="work" />
      </section>
    </div>
  )
}
