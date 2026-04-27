import Image from 'next/image'
import Link from 'next/link'
import type { WorkPost, BlogPost, AssetPost } from '@/types'

type CardProps =
  | { type: 'work'; post: WorkPost }
  | { type: 'blog'; post: BlogPost }
  | { type: 'assets'; post: AssetPost }

export default function Card(props: CardProps) {
  const { type, post } = props
  const href = `/${type}/${post.slug}`

  if (type === 'blog') return <BlogCard post={post as BlogPost} href={href} />
  if (type === 'assets') return <AssetCard post={post as AssetPost} href={href} />
  return <WorkCard post={post as WorkPost} href={href} />
}

function WorkCard({ post, href }: { post: WorkPost; href: string }) {
  const tag = post.tags[0] ?? post.category ?? ''
  return (
    <Link href={href} className="group block" style={{ textDecoration: 'none' }}>
      {/* Cover */}
      <div
        style={{
          width: '100%',
          aspectRatio: '450 / 320',
          borderRadius: 20,
          overflow: 'hidden',
          border: '1px solid #e6e6e6',
          background: '#f5f5f0',
          position: 'relative',
          transition: 'box-shadow 360ms',
        }}
        className="group-hover:shadow-[0_18px_40px_rgba(0,0,0,0.12)] shadow-[0_1px_0_rgba(0,0,0,0.02)]"
      >
        {post.coverUrl ? (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${post.coverUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transition: 'transform 700ms cubic-bezier(.2,.8,.2,1)',
            }}
            className="group-hover:scale-[1.04]"
          />
        ) : (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#e6e6e6',
              color: '#8f8a8a',
              fontFamily: 'Inter, sans-serif',
              fontSize: 28,
            }}
          >
            {post.title}
          </div>
        )}
      </div>

      {/* Meta */}
      <div
        style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 16 }}
        className="group-hover:-translate-y-0 translate-y-0"
      >
        {/* Icon */}
        {post.iconUrl && (
          <div
            style={{
              width: 64,
              height: 64,
              flexShrink: 0,
              position: 'relative',
            }}
          >
            <Image
              src={post.iconUrl}
              alt=""
              fill
              sizes="64px"
              style={{ objectFit: 'contain' }}
              unoptimized
            />
          </div>
        )}
        <div>
          <div
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 26,
              fontWeight: 600,
              color: '#0c0c0c',
              lineHeight: 1.3,
            }}
          >
            {post.title}
          </div>
          {tag && (
            <span
              style={{
                display: 'inline-block',
                marginTop: 6,
                background: '#e6e6e6',
                borderRadius: 10,
                padding: '4px 12px',
                fontFamily: 'Inter, sans-serif',
                fontSize: 16,
                color: '#2e2e2e',
              }}
            >
              {tag}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

function BlogCard({ post, href }: { post: BlogPost; href: string }) {
  const dateStr = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).replace(/\//g, '.')
    : ''

  return (
    <Link href={href} className="group block" style={{ cursor: 'pointer', textDecoration: 'none' }}>
      <div
        style={{
          width: '100%',
          aspectRatio: '660 / 420',
          borderRadius: 20,
          overflow: 'hidden',
          border: '1px solid #e6e6e6',
          position: 'relative',
          transition: 'box-shadow 320ms, transform 320ms',
        }}
        className="group-hover:shadow-[0_22px_50px_rgba(0,0,0,0.15)] group-hover:-translate-y-1"
      >
        {post.coverUrl && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${post.coverUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transition: 'transform 700ms cubic-bezier(.2,.8,.2,1)',
            }}
            className="group-hover:scale-[1.04]"
          />
        )}
      </div>

      {/* Tags + date */}
      <div style={{ display: 'flex', gap: 8, marginTop: 18, flexWrap: 'wrap', alignItems: 'center' }}>
        {post.tags.slice(0, 3).map((t) => (
          <span
            key={t}
            style={{
              background: '#f1eeea',
              borderRadius: 999,
              padding: '4px 12px',
              fontFamily: 'Inter, sans-serif',
              fontSize: 14,
              color: '#2e2e2e',
            }}
          >
            {t}
          </span>
        ))}
        {dateStr && (
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 14,
              color: '#8f8a8a',
              marginLeft: 'auto',
            }}
          >
            {dateStr}
          </span>
        )}
      </div>

      <h3
        style={{
          marginTop: 12,
          fontFamily: 'Inter, sans-serif',
          fontWeight: 700,
          fontSize: 28,
          lineHeight: 1.45,
          color: '#0c0c0c',
        }}
        className="max-md:!text-xl"
      >
        {post.title}
      </h3>
    </Link>
  )
}

function AssetCard({ post, href }: { post: AssetPost; href: string }) {
  const tag = post.tags[0] ?? post.category ?? ''
  const priceLabel = post.price === 0 ? 'Free' : `NT$${post.price.toLocaleString()}`

  return (
    <Link href={href} className="group block" style={{ textDecoration: 'none' }}>
      {/* Cover */}
      <div
        style={{
          width: '100%',
          aspectRatio: '450 / 320',
          borderRadius: 20,
          overflow: 'hidden',
          border: '1px solid #e6e6e6',
          position: 'relative',
          transition: 'box-shadow 360ms',
        }}
        className="group-hover:shadow-[0_18px_40px_rgba(0,0,0,0.12)] shadow-[0_1px_0_rgba(0,0,0,0.02)]"
      >
        {post.coverUrl && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${post.coverUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transition: 'transform 700ms cubic-bezier(.2,.8,.2,1)',
            }}
            className="group-hover:scale-[1.04]"
          />
        )}
        {tag && (
          <div
            style={{
              position: 'absolute',
              top: 16,
              left: 16,
              background: 'rgba(255,255,255,0.92)',
              borderRadius: 999,
              padding: '6px 14px',
              fontFamily: 'Inter, sans-serif',
              fontSize: 14,
              color: '#2e2e2e',
            }}
          >
            {tag}
          </div>
        )}
      </div>

      {/* Meta */}
      <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Author avatar */}
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 999,
            background: 'url(/assets/avatar-thumb.jpg) center/cover',
            flexShrink: 0,
          }}
        />
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 22,
              fontWeight: 600,
              color: '#0c0c0c',
            }}
          >
            {post.title}
          </div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, color: '#8f8a8a' }}>
            by Sui
          </div>
        </div>
        <div
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 18,
            fontWeight: 600,
            color: '#0c0c0c',
            border: '1px solid #e6e6e6',
            borderRadius: 999,
            padding: '8px 16px',
            flexShrink: 0,
          }}
        >
          {priceLabel}
        </div>
      </div>
    </Link>
  )
}
