import type { Metadata } from 'next'
import HeroBanner from '@/components/HeroBanner'
import HeroIntro from '@/components/HeroIntro'
import CTASection from '@/components/CTASection'

export const metadata: Metadata = {
  title: 'About',
  description: 'Designer & creator behind Funkuki Studio',
}

const services = [
  'Brand Strategy & Business Analysis',
  'Digital Marketing & Analytics',
  'UI/UX Design',
  'Vibe Coding',
  'Visual & IP Design',
  'Project Management',
  'Space & Media Curation',
]

const tools = [
  'Figma', 'Notion', 'Photoshop', 'Illustrator',
  'After Effects', 'Premiere', 'Cursor', 'Claude',
  'Webflow', 'Framer', 'Excel', 'GA4',
]

const experience = [
  { role: 'Digital Product Designer', period: '2022 – Now' },
  { role: 'Brand Consultant', period: '2019 – 2021' },
  { role: 'Founder, Shop Owner', period: '2013 – 2018' },
]

export default function AboutPage() {
  return (
    <div className="animate-page-in">
      <HeroBanner />
      <HeroIntro />

      {/* Services */}
      <section style={{ padding: '60px 80px 0' }} className="max-md:!px-5">
        <div style={{ border: '1px solid #e6e6e6', borderRadius: 24, padding: '44px 50px' }} className="max-md:!p-6">
          <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 44, margin: 0, color: '#0c0c0c' }}>
            My Services
          </h2>
          <div style={{ marginTop: 22 }}>
            {services.map((s) => <ServiceRow key={s}>{s}</ServiceRow>)}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section style={{ padding: '32px 80px 0' }} className="max-md:!px-5">
        <div style={{ border: '1px solid #e6e6e6', borderRadius: 24, padding: '44px 50px' }} className="max-md:!p-6">
          <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 44, margin: 0, color: '#0c0c0c' }}>
            Experience
          </h2>
          <div style={{ marginTop: 22 }}>
            {experience.map((e) => (
              <div
                key={e.role}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '200px 1fr',
                  padding: '32px 0',
                  borderBottom: '1px solid #e6e6e6',
                  fontFamily: 'Inter, sans-serif',
                }}
                className="max-md:!grid-cols-1 max-md:!gap-1"
              >
                <div style={{ fontSize: 22, color: '#8f8a8a' }}>{e.period}</div>
                <div style={{ fontSize: 32, fontWeight: 600, color: '#0c0c0c' }} className="max-md:!text-2xl">{e.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills + Tools */}
      <section style={{ padding: '32px 80px' }} className="max-md:!px-5">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }} className="max-md:!grid-cols-1">
          {/* Tools */}
          <div style={{ border: '1px solid #e6e6e6', borderRadius: 24, padding: '44px 50px' }} className="max-md:!p-6">
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 44, margin: 0, color: '#0c0c0c' }}>
              Tools
            </h2>
            <div
              style={{
                marginTop: 28,
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 14,
              }}
              className="max-md:!grid-cols-3"
            >
              {tools.map((t) => (
                <ToolTile key={t}>{t}</ToolTile>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div
            style={{
              border: '1px solid #e6e6e6',
              borderRadius: 24,
              padding: '44px 50px',
              display: 'flex',
              flexDirection: 'column',
            }}
            className="max-md:!p-6"
          >
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 44, margin: 0, color: '#0c0c0c' }}>
              Skills
            </h2>
            <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 18 }}>
              {[
                { label: '商業分析', value: 85 },
                { label: '數位設計', value: 90 },
                { label: 'UI/UX Coding', value: 88 },
                { label: '影音製作', value: 78 },
              ].map((s) => <SkillBar key={s.label} {...s} />)}
            </div>
          </div>
        </div>
      </section>

      <CTASection image="/assets/happy-sui.png" title={'Ready to\nwork with Sui?'} />
    </div>
  )
}

function ServiceRow({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        borderBottom: '1px solid #e6e6e6',
        transition: 'transform 280ms cubic-bezier(.2,.8,.2,1)',
      }}
      className="group hover:translate-x-2"
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          alignItems: 'center',
          gap: 16,
          padding: '26px 4px',
          fontFamily: 'Inter, sans-serif',
          fontSize: 28,
          color: '#0c0c0c',
        }}
        className="max-md:!text-xl"
      >
        <span>{children}</span>
        <span
          style={{ fontSize: 22, color: '#8f8a8a', transition: 'color 200ms' }}
          className="group-hover:!text-[#0c0c0c]"
        >
          ↗
        </span>
      </div>
    </div>
  )
}

function ToolTile({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        aspectRatio: '1',
        border: '1px solid #e6e6e6',
        borderRadius: 14,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, sans-serif',
        fontSize: 14,
        color: '#2e2e2e',
        textAlign: 'center',
        background: '#fff',
        transition: 'transform 220ms, border-color 220ms',
      }}
      className="hover:-translate-y-0.5 hover:border-ink2"
    >
      {children}
    </div>
  )
}

function SkillBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: 'Inter, sans-serif',
          fontSize: 18,
          color: '#0c0c0c',
          marginBottom: 8,
        }}
      >
        <span>{label}</span>
        <span style={{ color: '#8f8a8a' }}>{value}%</span>
      </div>
      <div style={{ height: 6, background: '#e6e6e6', borderRadius: 999, overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            width: `${value}%`,
            background: 'rgb(213,189,163)',
            borderRadius: 999,
          }}
        />
      </div>
    </div>
  )
}
