import type { Metadata } from 'next'
import { getBlogPosts } from '@/lib/notion'
import PostGrid from '@/components/PostGrid'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Design thoughts, process notes, and creative reflections',
}

export const revalidate = 300

export default async function BlogPage() {
  const posts = await getBlogPosts()
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
          Blog
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
          設計、產品與 AI 協作的長文筆記。
        </p>
      </section>

      <section style={{ padding: '0 80px 100px' }} className="max-md:!px-5 max-md:!pb-16">
        <PostGrid posts={posts} allTags={allTags} type="blog" />
      </section>
    </div>
  )
}
