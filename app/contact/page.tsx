'use client'

import { useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const SUBJECTS = [
  '一般諮詢 (General Inquiry)',
  '合作提案 (Collaboration)',
  '媒體/採訪 (Media)',
  '技術/設計交流 (Networking)',
  '其他 (Other)',
]

const INFO_ROWS = [
  ['Email', 'hello@funkuki.com'],
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
  const [form, setForm] = useState({ name: '', email: '', subject: SUBJECTS[0], msg: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))
  const emailValid = EMAIL_RE.test(form.email)
  const valid = form.name && form.email && emailValid && form.msg && recaptchaToken

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
              <strong>hello@funkuki.com</strong>。
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
            onSubmit={async (e) => {
            e.preventDefault()
            if (!valid || loading) return
            setLoading(true)
            setError('')
            try {
              const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: form.name, email: form.email, subject: form.subject, message: form.msg, recaptchaToken }),
              })
              if (!res.ok) throw new Error('Failed')
              setSent(true)
            } catch {
              setError('送出失敗，請稍後再試或直接寄信到 hello@funkuki.com')
              recaptchaRef.current?.reset()
              setRecaptchaToken(null)
            } finally {
              setLoading(false)
            }
          }}
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
                  onClick={() => { setSent(false); setForm({ name: '', email: '', subject: SUBJECTS[0], msg: '' }) }}
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
                <Field label="稱呼 / 姓名 (Name)">
                  <input
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    required
                    style={inputStyle}
                    placeholder="Mei-ling Wang"
                  />
                </Field>
                <Field label="電子郵件 (Email)">
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    required
                    style={{
                      ...inputStyle,
                      borderColor: form.email && !emailValid ? '#c0392b' : undefined,
                    }}
                    placeholder="you@example.com"
                  />
                  {form.email && !emailValid && (
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#c0392b', margin: '4px 0 0' }}>
                      請輸入有效的電子郵件格式
                    </p>
                  )}
                </Field>
                <Field label="聯絡主旨 (Subject)">
                  <select
                    value={form.subject}
                    onChange={(e) => update('subject', e.target.value)}
                    style={{ ...inputStyle, cursor: 'pointer', appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%238f8a8a' d='M6 8L0 0h12z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
                  >
                    {SUBJECTS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </Field>
                <Field label="訊息內容 (Message)">
                  <textarea
                    value={form.msg}
                    onChange={(e) => update('msg', e.target.value)}
                    required
                    rows={5}
                    style={{ ...inputStyle, resize: 'vertical' }}
                    placeholder="想聊些什麼嗎？"
                  />
                </Field>
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                  onChange={(token) => setRecaptchaToken(token)}
                  onExpired={() => setRecaptchaToken(null)}
                />
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
