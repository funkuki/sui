'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const TOPICS = ['Brand', 'Product', 'IP / Visual', 'Vibe Coding', 'Other']

const inputStyle: React.CSSProperties = {
  width: '100%',
  border: '1px solid #e6e6e6',
  borderRadius: 14,
  padding: '14px 16px',
  fontFamily: 'Inter, sans-serif',
  fontSize: 17,
  outline: 'none',
  background: '#fff',
  boxSizing: 'border-box',
  transition: 'border-color 200ms, box-shadow 200ms',
}

type Props = { open: boolean; onClose: () => void }

export default function HireMeModal({ open, onClose }: Props) {
  const [form, setForm] = useState({ name: '', email: '', topic: 'Brand', budget: '', msg: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))
  const valid = form.name && form.email && form.msg

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.7)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
      onClick={onClose}
    >
      {/* Modal box — 80% screen */}
      <div
        style={{
          width: '80vw',
          height: '80vh',
          borderRadius: 24,
          overflow: 'hidden',
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: '1fr 1.4fr',
        }}
        className="max-md:!w-[92vw] max-md:!h-auto max-md:!max-h-[90vh] max-md:!grid-cols-1 max-md:!overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button — absolute top-right of modal */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'rgba(255,255,255,0.55)',
            padding: 4,
            zIndex: 10,
            display: 'flex',
            transition: 'color 150ms',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="m15 9-6 6" />
            <path d="m9 9 6 6" />
          </svg>
        </button>

        {/* Left panel — title on white bg */}
        <div
          style={{
            background: '#fff',
            padding: '60px 48px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            borderRight: '1px solid #e6e6e6',
          }}
          className="max-md:!p-10 max-md:!pt-14"
        >
          <Image
            src="/assets/sui-logo.png"
            alt="Sui"
            width={64}
            height={64}
            unoptimized
            style={{ marginBottom: 28, objectFit: 'contain' }}
          />
          <h2
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 800,
              fontSize: 48,
              color: '#2e2e2e',
              margin: 0,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
            className="max-md:!text-4xl"
          >
            Let&apos;s do something FUN!
          </h2>
        </div>

        {/* Right panel — scrollable form */}
        <div
          style={{
            background: '#fff',
            overflowY: 'auto',
            padding: '48px 44px',
          }}
          className="max-md:!p-8"
        >
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              if (!valid || loading) return
              setLoading(true)
              setError('')
              try {
                const res = await fetch('/api/hire', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ name: form.name, email: form.email, topic: form.topic, budget: form.budget, message: form.msg }),
                })
                if (!res.ok) throw new Error('Failed')
                setSent(true)
              } catch {
                setError('送出失敗，請稍後再試或直接寄信到 hello@funkuki.com')
              } finally {
                setLoading(false)
              }
            }}
            style={{ display: 'grid', gap: 18 }}
          >
            {sent ? (
              <div style={{ textAlign: 'center', padding: '40px 10px' }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>✿</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 32, color: '#0c0c0c' }}>
                  Sent — talk soon!
                </div>
                <p style={{ fontFamily: 'Inter, sans-serif', color: '#2e2e2e', marginTop: 12 }}>
                  I&apos;ll reply to <strong>{form.email}</strong> within a day.
                </p>
                <button
                  type="button"
                  onClick={() => { setSent(false); setForm({ name: '', email: '', topic: 'Brand', budget: '', msg: '' }) }}
                  style={{
                    marginTop: 22,
                    border: '1px solid #000',
                    borderRadius: 999,
                    padding: '16px 30px',
                    fontSize: 22,
                    fontFamily: 'Inter, sans-serif',
                    background: 'rgba(255,255,255,0.85)',
                    color: '#0c0c0c',
                    cursor: 'pointer',
                  }}
                >
                  Send another
                </button>
              </div>
            ) : (
              <>
                <Field label="Your name">
                  <input
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    required
                    style={inputStyle}
                    placeholder="Mei-ling Wang"
                  />
                </Field>
                <Field label="Email">
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    required
                    style={inputStyle}
                    placeholder="you@example.com"
                  />
                </Field>
                <Field label="Project type">
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {TOPICS.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => update('topic', t)}
                        style={{
                          appearance: 'none',
                          border: `1px solid ${form.topic === t ? '#000' : '#e6e6e6'}`,
                          background: form.topic === t ? '#2e2e2e' : '#fff',
                          color: form.topic === t ? '#fff' : '#0c0c0c',
                          borderRadius: 999,
                          padding: '8px 16px',
                          fontFamily: 'Inter, sans-serif',
                          fontSize: 16,
                          cursor: 'pointer',
                          transition: 'all 200ms',
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </Field>
                <Field label="Budget (optional)">
                  <input
                    value={form.budget}
                    onChange={(e) => update('budget', e.target.value)}
                    style={inputStyle}
                    placeholder="USD 5,000 – 20,000"
                  />
                </Field>
                <Field label="Tell me a bit">
                  <textarea
                    value={form.msg}
                    onChange={(e) => update('msg', e.target.value)}
                    required
                    rows={5}
                    style={{ ...inputStyle, resize: 'vertical' }}
                    placeholder="What are you trying to build, and when?"
                  />
                </Field>
                {error && (
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#c0392b', margin: 0 }}>{error}</p>
                )}
                <div style={{ marginTop: 6 }}>
                  <button
                    type="submit"
                    disabled={!valid || loading}
                    style={{
                      appearance: 'none',
                      border: '1px solid #000',
                      borderRadius: 999,
                      padding: '16px 30px',
                      fontSize: 22,
                      fontFamily: 'Inter, sans-serif',
                      background: valid && !loading ? '#2e2e2e' : '#bbb',
                      color: '#fff',
                      cursor: valid && !loading ? 'pointer' : 'not-allowed',
                      width: '100%',
                      transition: 'background 200ms',
                    }}
                  >
                    {loading ? 'Sending…' : 'Send message →'}
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: 'block' }}>
      <div
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 14,
          color: '#8f8a8a',
          marginBottom: 8,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}
      >
        {label}
      </div>
      {children}
    </label>
  )
}
