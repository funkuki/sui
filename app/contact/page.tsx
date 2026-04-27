'use client'

import { useState } from 'react'

const TOPICS = ['Brand', 'Product', 'IP / Visual', 'Vibe Coding', 'Other']

const INFO_ROWS = [
  ['Email', 'hi@funkuki.com'],
  ['Studio', 'Funkuki · Taipei'],
  ['Hours', 'Mon–Fri  10:00–19:00'],
]

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

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', topic: 'Brand', budget: '', msg: '' })
  const [sent, setSent] = useState(false)

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))
  const valid = form.name && form.email && form.msg

  return (
    <div className="animate-page-in">
      <section style={{ padding: '80px 80px 60px' }} className="max-md:!px-5 max-md:!py-12">
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' }}
          className="max-md:!grid-cols-1"
        >
          {/* Left: info */}
          <div>
            <h1
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 800,
                fontSize: 84,
                margin: 0,
                letterSpacing: '-0.02em',
                lineHeight: 1.05,
                color: '#0c0c0c',
              }}
              className="max-md:!text-5xl"
            >
              Let&apos;s make<br />something good.
            </h1>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 22,
                color: '#2e2e2e',
                marginTop: 24,
                maxWidth: 540,
                lineHeight: 1.7,
              }}
              className="max-md:!text-base"
            >
              告訴我一點點背景就好 — 我通常 24 小時內回信。或寄信到{' '}
              <strong>hi@funkuki.com</strong>。
            </p>

            <div style={{ marginTop: 40, display: 'grid', gap: 0 }}>
              {INFO_ROWS.map(([k, v]) => (
                <div
                  key={k}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '16px 0',
                    borderBottom: '1px solid #e6e6e6',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 18,
                  }}
                >
                  <span style={{ color: '#8f8a8a' }}>{k}</span>
                  <span style={{ color: '#0c0c0c', fontWeight: 500 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <form
            onSubmit={(e) => { e.preventDefault(); if (valid) setSent(true) }}
            style={{
              border: '1px solid #e6e6e6',
              borderRadius: 24,
              padding: 40,
              background: '#fff',
              display: 'grid',
              gap: 18,
            }}
            className="max-md:!p-6"
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
                <div style={{ marginTop: 6 }}>
                  <button
                    type="submit"
                    disabled={!valid}
                    style={{
                      appearance: 'none',
                      border: '1px solid #000',
                      borderRadius: 999,
                      padding: '16px 30px',
                      fontSize: 22,
                      fontFamily: 'Inter, sans-serif',
                      background: valid ? '#2e2e2e' : '#bbb',
                      color: '#fff',
                      cursor: valid ? 'pointer' : 'not-allowed',
                      width: '100%',
                      transition: 'background 200ms',
                    }}
                  >
                    Send message →
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </section>
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
