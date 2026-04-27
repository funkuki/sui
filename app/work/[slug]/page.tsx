import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getWorkPosts, getWorkPost, getPageBlocks, getBlogPosts } from '@/lib/notion'
import NotionBlocks from '@/components/NotionBlocks'
import BackBar from '@/components/BackBar'
import CTASection from '@/components/CTASection'
import type { BlogPost, WorkPost } from '@/types'

export const revalidate = 300

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const posts = await getWorkPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getWorkPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.summary,
    openGraph: { images: [post.coverUrl] },
  }
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params
  const [post, allBlog] = await Promise.all([
    getWorkPost(slug),
    getBlogPosts(),
  ])
  if (!post) notFound()

  const blocks = await getPageBlocks(post.id)
  const relatedPosts = allBlog.slice(0, 3)

  const metaRows = [
    post.client && ['Client', post.client],
    post.year > 0 && ['Year', String(post.year)],
    post.category && ['Category', post.category],
    post.tags.length > 0 && ['Tags', post.tags.join(' · ')],
  ].filter(Boolean) as [string, string][]

  return (
    <article className="animate-page-in">
      <BackBar href="/work" label="Work" />

      {/* Hero image */}
      <section style={{ padding: '30px 80px 0' }} className="max-md:!px-5">
        <div style={{
          width: '100%',
          maxWidth: 1100,
          margin: '0 auto',
          aspectRatio: '1100 / 700',
          borderRadius: 20,
          overflow: 'hidden',
          border: '1px solid #e6e6e6',
          background: post.coverUrl
            ? `url(${post.coverUrl}) center/cover no-repeat`
            : 'linear-gradient(135deg, #f3eee7, #fdfcf9)',
        }} />
      </section>

      {/* Title + tags */}
      <section style={{ padding: '60px 80px 20px', textAlign: 'center' }} className="max-md:!px-5 max-md:!py-10">
        <h1 style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 800,
          fontSize: 72,
          margin: 0,
          letterSpacing: '-0.02em',
          color: '#0c0c0c',
          lineHeight: 1.1,
        }} className="max-md:!text-4xl">
          {post.title}
        </h1>
        {post.tags.length > 0 && (
          <div style={{ marginTop: 20, display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            {post.tags.map((tag) => (
              <span key={tag} style={{
                display: 'inline-block',
                background: '#e6e6e6',
                borderRadius: 12,
                padding: '8px 16px',
                fontFamily: 'Inter, sans-serif',
                fontSize: 18,
                color: '#0c0c0c',
              }}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </section>

      {/* Project meta strip */}
      {metaRows.length > 0 && (
        <section style={{ padding: '20px 80px 40px' }} className="max-md:!px-5">
          <div style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: `repeat(${metaRows.length}, 1fr)`,
            gap: 24,
            padding: '30px 0',
            borderTop: '1px solid #e6e6e6',
            borderBottom: '1px solid #e6e6e6',
          }} className="max-md:!grid-cols-2">
            {metaRows.map(([k, v]) => (
              <div key={k}>
                <div style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 13,
                  color: '#8f8a8a',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: 8,
                }}>
                  {k}
                </div>
                <div style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 18,
                  color: '#0c0c0c',
                  fontWeight: 500,
                }}>
                  {v}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Summary */}
      {post.summary && (
        <section style={{ padding: '20px 80px 0' }} className="max-md:!px-5">
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 20,
            lineHeight: 1.95,
            color: '#0c0c0c',
            maxWidth: 760,
            margin: '0 auto 22px',
          }}>
            {post.summary}
          </p>
        </section>
      )}

      {/* Notion content */}
      {blocks.length > 0 && (
        <section style={{ padding: '20px 80px 60px' }} className="max-md:!px-5">
          <NotionBlocks blocks={blocks as any} />
        </section>
      )}

      {/* Related blog posts */}
      {relatedPosts.length > 0 && (
        <section style={{ padding: '60px 80px 80px' }} className="max-md:!px-5">
          <div style={{ maxWidth: 1033, margin: '0 auto' }}>
            <h2 style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 800,
              fontSize: 36,
              margin: '0 0 0',
              borderTop: '1px solid #e6e6e6',
              paddingTop: 36,
              color: '#0c0c0c',
            }}>
              相關文章
            </h2>
            <div style={{ display: 'grid', gap: 4, marginTop: 24 }}>
              {relatedPosts.map((p) => (
                <RelatedPostRow key={p.id} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </article>
  )
}

function RelatedPostRow({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '22px 4px',
        borderBottom: '1px solid #e6e6e6',
        fontFamily: 'Inter, sans-serif',
        fontSize: 22,
        color: '#0c0c0c',
        textAlign: 'left',
        textDecoration: 'none',
        transition: 'transform 280ms cubic-bezier(.2,.8,.2,1)',
      }}
      className="hover:translate-x-2 group"
    >
      <span>{post.title}</span>
      <span style={{
        color: '#8f8a8a',
        transition: 'color 200ms',
        flexShrink: 0,
        marginLeft: 16,
      }} className="group-hover:!text-[#0c0c0c]">
        ↗
      </span>
    </Link>
  )
}
