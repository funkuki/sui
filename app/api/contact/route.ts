import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendLineMessage } from '@/lib/line'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

export async function POST(req: Request) {
  const { name, email, subject, message } = await req.json()

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const { error: dbError } = await supabase
    .from('contact_submissions')
    .insert({ name, email, subject, message })

  if (dbError) {
    console.error('Supabase error:', dbError)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }

  await sendLineMessage(
    `📬 新聯絡 Contact\n姓名：${name}\nEmail：${email}\n主旨：${subject}\n──────────\n${message}`
  )

  return NextResponse.json({ ok: true })
}
