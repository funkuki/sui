import HeroBanner from '@/components/HeroBanner'
import HeroIntro from '@/components/HeroIntro'
import CTASection from '@/components/CTASection'
import Card from '@/components/Card'
import Link from 'next/link'
import { getWorkPosts, getBlogPosts } from '@/lib/notion'

export const revalidate = 300

export default async function HomePage() {
  const [allWork, allBlog] = await Promise.all([getWorkPosts(), getBlogPosts()])
  const featuredWork = allWork.filter((p) => p.featured).slice(0, 3)
  const recentBlog = allBlog.slice(0, 2)

  return (
    <>
      <HeroBanner />
      <HeroIntro />

      {/* Works strip */}
      {featuredWork.length > 0 && (
        <section
          style={{
            minHeight: 'calc(100vh - 92px)',
            padding: '120px 0',
            background: '#fdfcf9',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
          className="max-md:!min-h-0 max-md:!py-16"
        >
          {/* Section header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              padding: '0 80px',
              marginBottom: 44,
            }}
            className="max-md:!px-5"
          >
            <h2
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 800,
                fontSize: 64,
                margin: 0,
                letterSpacing: '-0.02em',
                color: '#0c0c0c',
              }}
              className="max-md:!text-4xl"
            >
              My Works
            </h2>
            <SeeMorePill href="/work">See more</SeeMorePill>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 32,
              padding: '0 80px',
            }}
            className="max-md:!grid-cols-1 max-md:!px-5"
          >
            {featuredWork.map((post) => (
              <Card key={post.id} type="work" post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Blog strip */}
      {recentBlog.length > 0 && (
        <section
          style={{
            minHeight: 'calc(100vh - 92px)',
            padding: '120px 0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
          className="max-md:!min-h-0 max-md:!py-16"
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              padding: '0 80px',
              marginBottom: 44,
            }}
            className="max-md:!px-5"
          >
            <h2
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 800,
                fontSize: 64,
                margin: 0,
                letterSpacing: '-0.02em',
                color: '#0c0c0c',
              }}
              className="max-md:!text-4xl"
            >
              Blog
            </h2>
            <SeeMorePill href="/blog">See more</SeeMorePill>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 40,
              padding: '0 80px',
            }}
            className="max-md:!grid-cols-1 max-md:!px-5"
          >
            {recentBlog.map((post) => (
              <Card key={post.id} type="blog" post={post} />
            ))}
          </div>
        </section>
      )}

      <CTASection />
    </>
  )
}

function SeeMorePill({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
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
        transition: 'transform 200ms cubic-bezier(.2,.8,.2,1), box-shadow 200ms',
        textDecoration: 'none',
      }}
      className="hover:-translate-y-0.5 hover:shadow-lg"
    >
      {children}
    </Link>
  )
}
