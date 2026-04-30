import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import CTASection from '@/components/CTASection'
import ExperienceCarousel from '@/components/ExperienceCarousel'
import TestimonialsCarousel from '@/components/TestimonialsCarousel'
import RadarChart from '@/components/RadarChart'
import RevealSection from '@/components/RevealSection'
import littleSui from '@/public/assets/little-sui.png'

export const metadata: Metadata = {
  title: 'About',
  description: 'Designer & creator behind Funkuki Studio',
}

const services = [
  'Brand & Business Strategy',
  'Digital Marketing & Analytics',
  'UI/UX Design',
  'Vibe Coding',
  'Visual & IP Design',
  'Space & Media Curation',
  'Project Management',
]

const experience = [
  { img: '/assets/exp01.png', role: 'Digital Product Designer', company: 'Funkuki Studio', period: '2022-now' },
  { img: '/assets/exp02.png', role: 'Brand Consultant',         company: 'Funkuki Studio', period: '2019-2021' },
  { img: '/assets/exp03.png', role: 'Founder, Shops Owner',     company: 'Funkuki Studio', period: '2013-2018' },
  { img: '/assets/exp04.png', role: 'Product Marketing',        company: 'Sony Electronics', period: '2009-2013' },
  { img: '/assets/exp05.png', role: 'Postgraduate Study',       company: 'NTU UK',         period: '2007-2008' },
  { img: '/assets/exp06.png', role: 'Marketing',                company: 'Sony Electronics', period: '2003-2007' },
]

const skills = [
  { label: '商業分析',    value: 85 },
  { label: '專案管理',    value: 82 },
  { label: '數位設計',    value: 90 },
  { label: '影音製作',    value: 78 },
  { label: 'UI/UX Coding', value: 88 },
]

const tools = [
  { name: 'Figma',       src: '/assets/logo_figma.png' },
  { name: 'Canva',       src: '/assets/logo_canva.jpeg' },
  { name: 'Procreate',   src: '/assets/logo_Procreate.jpg' },
  { name: 'Midjourney',  src: '/assets/logo_midjourney.webp' },
  { name: 'Blender',     src: '/assets/logo_Blender.png' },
  { name: 'Notion',      src: '/assets/logo_Notion.png' },
  { name: 'Cursor',      src: '/assets/logo_Cursor.png' },
  { name: 'Claude',      src: '/assets/logo_claud.png' },
  { name: 'Photoshop',   src: '/assets/logo_photoshop.jpg' },
  { name: 'Illustrator', src: '/assets/logo_Illustrator.jpg' },
]

const testimonials = [
  {
    category: '在品牌分析與策略規劃上 給予 88% 的評價：',
    quote: '「謝謝 Sui 對雙手牌的照顧，有你在的日子很令人心安😭♥️」',
  },
  {
    category: '在 UI/UX 設計執行上 給予 92% 的評價：',
    quote: '「Sui 的設計思維非常清晰，從用戶角度出發，每個細節都讓人感到用心。」',
  },
  {
    category: '在品牌視覺識別上 給予 95% 的評價：',
    quote: '「合作過最有創意的設計師，能快速理解品牌需求並轉化為令人驚艷的視覺。」',
  },
]

export default function AboutPage() {
  return (
    <div className="animate-page-in">

      {/* ── Hero ── */}
      <section
        style={{
          minHeight: 'calc(100vh - var(--header-h))',
          background: '#fdfcf9',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingBottom: 80,
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 1352,
            margin: '0 auto',
            padding: '60px 80px',
            display: 'grid',
            gridTemplateColumns: 'minmax(340px, 460px) 1fr',
            gap: 80,
            alignItems: 'center',
            flex: 1,
          }}
          className="max-md:!grid-cols-1 max-md:!px-5 max-md:!gap-10 max-md:!py-12"
        >
          {/* Character */}
          <div style={{ position: 'relative' }}>
            <Image
              src={littleSui}
              alt="Sui"
              width={520}
              height={620}
              className="w-full h-auto block"
              priority
            />
          </div>

          {/* Copy */}
          <div>
            <h1
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 800,
                fontSize: 84,
                lineHeight: 0.95,
                margin: '0 0 24px',
                letterSpacing: '-0.02em',
                color: '#0c0c0c',
              }}
              className="max-md:!text-5xl"
            >
              Hi, I am <em style={{ fontStyle: 'italic' }}>Sui</em>.
            </h1>

            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 20,
                lineHeight: 1.75,
                color: '#0c0c0c',
                margin: '0 0 36px',
                maxWidth: 560,
              }}
              className="max-md:!text-base"
            >
              專攻品牌策略與體驗設計的數位產品設計師。遊走於科技、設計與行銷的交界，
              我熱衷於探索跨界的無限可能。無論是打造直覺的數位產品、塑造獨特的視覺
              IP，還是激盪創新的行銷策略，我都樂於成為您最可靠的創意夥伴，將抽象的好點子轉化為具體的品牌影響力。
            </p>

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <DarkPill href="/contact">Hire me!</DarkPill>
              <LightPill href="/contact">Contact me</LightPill>
            </div>
          </div>
        </div>
        <div style={{ width: '70%', height: '1px', background: '#ede9e4' }} />
      </section>

      {/* ── My Services ── */}
      <RevealSection
        className="max-md:!px-5 max-md:!pt-16 max-md:!pb-16"
        style={{ padding: '120px 80px 80px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <div style={{ width: '100%', maxWidth: 1352 }}>
          <h2 style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 800,
            fontSize: 40,
            margin: '0 0 36px',
            color: '#0c0c0c',
            letterSpacing: '-0.01em',
          }}>
            My Services
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            {services.map((s) => (
              <span
                key={s}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  border: '1px solid #0c0c0c',
                  borderRadius: 999,
                  padding: '16px 30px',
                  fontSize: 18,
                  fontFamily: 'Inter, sans-serif',
                  color: '#0c0c0c',
                  lineHeight: 1,
                  transition: 'transform 200ms cubic-bezier(.2,.8,.2,1), box-shadow 200ms',
                }}
                className="hover:-translate-y-0.5 hover:shadow-md"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
        <div style={{ width: '70%', height: '1px', background: '#ede9e4', marginTop: 80 }} className="max-md:!mt-16" />
      </RevealSection>

      {/* ── Experience ── */}
      <RevealSection
        className="max-md:!pt-16 max-md:!pb-16"
        style={{ padding: '120px 0 80px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <div style={{ width: '100%' }}>
          <h2
            style={{
              padding: '0 80px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 800,
              fontSize: 40,
              margin: '0 0 36px',
              color: '#0c0c0c',
              letterSpacing: '-0.01em',
            }}
            className="max-md:!px-5"
          >
            Experience
          </h2>
          <ExperienceCarousel items={experience} />
        </div>
        <div style={{ width: '70%', height: '1px', background: '#ede9e4', marginTop: 80 }} className="max-md:!mt-16" />
      </RevealSection>

      {/* ── Skills + Tools ── */}
      <RevealSection
        className="max-md:!px-5 max-md:!pt-16 max-md:!pb-16"
        style={{ padding: '120px 80px 80px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <div style={{ width: '100%', maxWidth: 1352 }}>
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start', position: 'relative' }}
            className="max-md:!grid-cols-1 max-md:!gap-12"
          >
            {/* Skills radar */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h2 style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 800,
                fontSize: 40,
                margin: '0 0 24px',
                color: '#0c0c0c',
                letterSpacing: '-0.01em',
                width: '100%',
                textAlign: 'left',
              }}>
                Skills
              </h2>
              <RadarChart skills={skills} />
            </div>

            {/* Divider between Skills and Tools */}
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: '#ede9e4', transform: 'translateX(-50%)' }} className="max-md:!hidden" />

            {/* Tools grid */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h2 style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 800,
                fontSize: 40,
                margin: '0 0 24px',
                color: '#0c0c0c',
                letterSpacing: '-0.01em',
                width: '100%',
                textAlign: 'left',
              }}>
                Tools
              </h2>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 75px)',
                  gap: 16,
                }}
                className="max-md:!grid-cols-5"
              >
                {tools.map((t) => (
                  <div
                    key={t.name}
                    title={t.name}
                    style={{
                      width: 75,
                      height: 75,
                      borderRadius: 16,
                      overflow: 'hidden',
                      background: '#fff',
                      border: '1px solid #e6e6e6',
                      transition: 'transform 200ms cubic-bezier(.2,.8,.2,1), box-shadow 200ms',
                    }}
                    className="hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <Image
                      src={t.src}
                      alt={t.name}
                      width={75}
                      height={75}
                      unoptimized
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div style={{ width: '70%', height: '1px', background: '#ede9e4', marginTop: 80 }} className="max-md:!mt-16" />
      </RevealSection>

      {/* ── Testimonials ── */}
      <RevealSection
        className="max-md:!px-5 max-md:!pt-16 max-md:!pb-16"
        style={{ padding: '120px 80px 80px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <div style={{ width: '100%' }}>
          <TestimonialsCarousel testimonials={testimonials} />
        </div>
        <div style={{ width: '70%', height: '1px', background: '#ede9e4', marginTop: 80 }} className="max-md:!mt-16" />
      </RevealSection>

      {/* ── CTA ── */}
      <RevealSection as="div">
        <CTASection image="/assets/sui-clover.png" title={'Ready to\nwork with Sui?'} />
      </RevealSection>
    </div>
  )
}

function DarkPill({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        border: '1px solid #000',
        borderRadius: 999,
        padding: '16px 30px',
        fontSize: 20,
        fontFamily: 'Inter, sans-serif',
        background: '#2e2e2e',
        color: '#fff',
        transition: 'transform 200ms cubic-bezier(.2,.8,.2,1), box-shadow 200ms, background 200ms',
        textDecoration: 'none',
      }}
      className="hover:-translate-y-0.5 hover:shadow-lg hover:!bg-black"
    >
      {children}
    </Link>
  )
}

function LightPill({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        border: '1px solid #0c0c0c',
        borderRadius: 999,
        padding: '16px 30px',
        fontSize: 20,
        fontFamily: 'Inter, sans-serif',
        background: 'transparent',
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
