import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAssetPosts, getAssetPost, getPageBlocks } from '@/lib/notion'
import NotionBlocks from '@/components/NotionBlocks'
import BackBar from '@/components/BackBar'

export const revalidate = 300

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const posts = await getAssetPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getAssetPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.summary,
    openGraph: { images: [post.coverUrl] },
  }
}

export default async function AssetDetailPage({ params }: Props) {
  const { slug } = await params
  const post = await getAssetPost(slug)
  if (!post) notFound()

  const blocks = await getPageBlocks(post.id)
  const isFree = post.price === 0
  const tag = post.category
  const priceLabel = isFree ? '$0' : `NT$${post.price.toLocaleString()}`

  return (
    <article className="animate-page-in">
      <BackBar href="/assets" label="Assets" />

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

      {/* Title + tag */}
      <section style={{ padding: '60px 80px 0', textAlign: 'center' }} className="max-md:!px-5 max-md:!pt-10">
        <h1 style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 800,
          fontSize: 72,
          margin: 0,
          letterSpacing: '-0.02em',
          color: '#0c0c0c',
        }} className="max-md:!text-4xl">
          {post.title}
        </h1>
        {tag && (
          <div style={{ marginTop: 16 }}>
            <span style={{
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
          </div>
        )}
      </section>

      {/* Two-column: prose + sticky purchase card */}
      <section style={{ padding: '60px 80px' }} className="max-md:!px-5">
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 360px',
          gap: 60,
          alignItems: 'start',
        }} className="max-md:!grid-cols-1 max-md:!gap-10">
          {/* Left: description + Notion content */}
          <div>
            {post.summary && (
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 20,
                lineHeight: 1.95,
                color: '#0c0c0c',
                maxWidth: 760,
                margin: '0 auto 36px',
              }}>
                {post.summary}
              </p>
            )}
            {blocks.length > 0 && <NotionBlocks blocks={blocks as any} />}
          </div>

          {/* Right: sticky purchase card */}
          <aside style={{
            position: 'sticky',
            top: 110,
            border: '1px solid #e6e6e6',
            borderRadius: 20,
            padding: '32px 28px',
            background: '#fff',
          }}>
            <div style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 13,
              color: '#8f8a8a',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}>
              {post.category || 'Asset'}
            </div>

            <div style={{
              marginTop: 12,
              fontFamily: 'Inter, sans-serif',
              fontSize: 44,
              fontWeight: 800,
              color: '#0c0c0c',
              lineHeight: 1,
            }}>
              {priceLabel}
              {!isFree && (
                <span style={{ fontSize: 18, fontWeight: 500, color: '#8f8a8a', marginLeft: 6 }}>
                  NT$
                </span>
              )}
            </div>

            {post.downloads > 0 && (
              <div style={{
                marginTop: 6,
                fontFamily: 'Inter, sans-serif',
                fontSize: 13,
                color: '#8f8a8a',
              }}>
                {post.downloads.toLocaleString()} downloads
              </div>
            )}

            {/* Features list */}
            {post.tags.length > 0 && (
              <ul style={{ margin: '24px 0 0', padding: 0, listStyle: 'none', display: 'grid', gap: 10 }}>
                {post.tags.map((t) => (
                  <li key={t} style={{
                    display: 'flex',
                    gap: 10,
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 15,
                    color: '#0c0c0c',
                  }}>
                    <span style={{ color: '#3CB1B1' }}>✓</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* CTA button */}
            {post.fileUrl ? (
              <a
                href={post.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  width: '100%',
                  marginTop: 28,
                  appearance: 'none',
                  border: '1px solid #000',
                  borderRadius: 999,
                  padding: '16px 22px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 18,
                  fontWeight: 600,
                  background: '#1a1a1a',
                  color: '#fff',
                  cursor: 'pointer',
                  textAlign: 'center',
                  textDecoration: 'none',
                  transition: 'transform 200ms, background 200ms',
                  boxSizing: 'border-box',
                }}
                className="hover:-translate-y-0.5 hover:!bg-black"
              >
                {isFree ? 'Download free →' : `Get for ${priceLabel} →`}
              </a>
            ) : (
              <div style={{
                marginTop: 28,
                padding: '16px 22px',
                borderRadius: 999,
                background: '#e6e6e6',
                fontFamily: 'Inter, sans-serif',
                fontSize: 18,
                color: '#8f8a8a',
                textAlign: 'center',
              }}>
                Coming soon
              </div>
            )}

            {post.description && (
              <div style={{
                marginTop: 14,
                fontFamily: 'Inter, sans-serif',
                fontSize: 13,
                color: '#8f8a8a',
                lineHeight: 1.75,
              }}>
                {post.description}
              </div>
            )}
          </aside>
        </div>
      </section>

      {/* Preview images grid */}
      {post.previewUrls.length > 0 && (
        <section style={{ padding: '0 80px 80px' }} className="max-md:!px-5 max-md:!pb-12">
          <div style={{ maxWidth: 1132, margin: '0 auto' }}>
            <h2 style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 800,
              fontSize: 36,
              margin: '0 0 30px',
              color: '#0c0c0c',
            }}>
              Preview
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 20,
            }} className="max-md:!grid-cols-1">
              {post.previewUrls.map((url, i) => (
                <div
                  key={i}
                  style={{
                    border: '1px solid #e6e6e6',
                    borderRadius: 16,
                    overflow: 'hidden',
                    aspectRatio: '4 / 3',
                    background: `url(${url}) center/cover no-repeat`,
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* More assets link */}
      <section style={{ padding: '20px 80px 80px' }} className="max-md:!px-5 max-md:!pb-12">
        <div style={{
          maxWidth: 1132,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
        }}>
          <Link
            href="/assets"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              border: '1px solid #000',
              borderRadius: 999,
              padding: '16px 30px',
              fontSize: 22,
              fontFamily: 'Inter, sans-serif',
              background: 'rgba(255,255,255,0.85)',
              color: '#0c0c0c',
              textDecoration: 'none',
              transition: 'transform 200ms, box-shadow 200ms',
            }}
            className="hover:-translate-y-0.5 hover:shadow-lg"
          >
            ← Browse all assets
          </Link>
        </div>
      </section>
    </article>
  )
}
