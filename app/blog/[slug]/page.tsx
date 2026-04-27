import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getBlogPosts, getBlogPost, getPageBlocks } from '@/lib/notion'
import NotionBlocks from '@/components/NotionBlocks'
import BackBar from '@/components/BackBar'
import ReadingProgressBar from '@/components/ReadingProgressBar'
import ShareButtons from '@/components/ShareButtons'
import type { BlogPost } from '@/types'

export const revalidate = 300

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.summary,
    openGraph: { images: [post.coverUrl] },
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params
  const [post, allPosts] = await Promise.all([
    getBlogPost(slug),
    getBlogPosts(),
  ])
  if (!post) notFound()

  const blocks = await getPageBlocks(post.id)
  const continuePosts = allPosts.filter((p) => p.slug !== slug).slice(0, 2)

  const dateStr = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).replace(/\//g, '.')
    : ''

  return (
    <>
      <ReadingProgressBar />
      <article className="animate-page-in">
        <BackBar href="/blog" label="Blog" />

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
              : '#f1eeea',
          }} />
        </section>

        {/* Title */}
        <section style={{ padding: '50px 80px 20px' }} className="max-md:!px-5 max-md:!py-8">
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            {post.tags.length > 0 && (
              <div style={{ display: 'flex', gap: 10, marginBottom: 22, flexWrap: 'wrap' }}>
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
            <h1 style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 800,
              fontSize: 56,
              margin: 0,
              letterSpacing: '-0.01em',
              lineHeight: 1.15,
              color: '#0c0c0c',
            }} className="max-md:!text-3xl">
              {post.title}
            </h1>
          </div>
        </section>

        {/* Byline */}
        <section style={{ padding: '10px 80px 20px' }} className="max-md:!px-5">
          <Byline date={dateStr} />
        </section>

        {/* Body */}
        <section style={{ padding: '20px 80px 60px' }} className="max-md:!px-5">
          {post.summary && (
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 22,
              lineHeight: 1.7,
              color: '#2e2e2e',
              maxWidth: 760,
              margin: '0 auto 36px',
              fontWeight: 500,
            }} className="max-md:!text-base">
              {post.summary}
            </p>
          )}
          <NotionBlocks blocks={blocks as any} />
        </section>

        {/* Share row */}
        <section style={{ padding: '20px 80px 40px' }} className="max-md:!px-5">
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <ShareButtons />
          </div>
        </section>

        {/* Author card */}
        <section style={{ padding: '40px 80px 60px' }} className="max-md:!px-5">
          <AuthorCard />
        </section>

        {/* Continue reading */}
        {continuePosts.length > 0 && (
          <section style={{ padding: '20px 80px 100px' }} className="max-md:!px-5 max-md:!pb-16">
            <div style={{ maxWidth: 1132, margin: '0 auto' }}>
              <h2 style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 800,
                fontSize: 32,
                margin: '0 0 24px',
                color: '#0c0c0c',
              }}>
                Continue reading
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }} className="max-md:!grid-cols-1">
                {continuePosts.map((p) => (
                  <ContinueReadingCard key={p.id} post={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </>
  )
}

function Byline({ date }: { date: string }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      maxWidth: 760,
      margin: '0 auto 36px',
    }}>
      <div style={{
        width: 56,
        height: 56,
        borderRadius: '50%',
        background: 'url(/sui/assets/little-sui.png) center/cover, #fdfcf9',
        border: '1px solid #e6e6e6',
        flexShrink: 0,
      }} />
      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 18, fontWeight: 600, color: '#0c0c0c' }}>SUI</span>
      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 18, color: '#8f8a8a' }}>·</span>
      {date && <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 18, color: '#8f8a8a' }}>{date}</span>}
    </div>
  )
}

function AuthorCard() {
  return (
    <div style={{
      display: 'flex',
      gap: 40,
      alignItems: 'center',
      border: '1px solid #e6e6e6',
      borderRadius: 24,
      padding: 50,
      maxWidth: 1132,
      margin: '0 auto',
    }} className="max-md:!flex-col max-md:!p-6 max-md:!gap-6">
      <div style={{
        width: 130,
        height: 130,
        borderRadius: '50%',
        background: 'url(/sui/assets/little-sui.png) center/cover, #fdfcf9',
        border: '1px solid #e6e6e6',
        flexShrink: 0,
      }} />
      <div style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: 22,
        lineHeight: 1.85,
        color: '#0c0c0c',
      }} className="max-md:!text-base">
        Hi, 我是 <strong>Sui</strong>！專攻品牌策略與體驗設計的數位產品設計師。<br />
        我在這裡記錄我的數位作品，同時也記錄產品開發的歷程，有時也留下一些生活雜記。
      </div>
    </div>
  )
}

function ContinueReadingCard({ post }: { post: BlogPost }) {
  const dateStr = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).replace(/\//g, '.')
    : ''

  return (
    <Link
      href={`/blog/${post.slug}`}
      style={{ display: 'block', textDecoration: 'none' }}
      className="group"
    >
      <div style={{
        aspectRatio: '16 / 10',
        borderRadius: 16,
        overflow: 'hidden',
        border: '1px solid #e6e6e6',
        background: post.coverUrl
          ? `url(${post.coverUrl}) center/cover no-repeat`
          : '#f1eeea',
        transition: 'transform 320ms',
      }} className="group-hover:scale-[1.02]" />
      {dateStr && (
        <div style={{
          marginTop: 14,
          fontFamily: 'Inter, sans-serif',
          fontSize: 14,
          color: '#8f8a8a',
        }}>
          {dateStr}
        </div>
      )}
      <div style={{
        marginTop: 4,
        fontFamily: 'Inter, sans-serif',
        fontSize: 22,
        fontWeight: 600,
        color: '#0c0c0c',
        lineHeight: 1.4,
      }}>
        {post.title}
      </div>
    </Link>
  )
}
