import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendLineMessage } from '@/lib/line'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

export async function POST(req: Request) {
  const { name, email, topic, budget, message } = await req.json()

  if (!name || !email || !topic || !message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const { error: dbError } = await supabase
    .from('hire_submissions')
    .insert({ name, email, topic, budget: budget || null, message })

  if (dbError) {
    console.error('Supabase error:', dbError)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }

  await sendLineMessage(
    `🤝 新合作邀請 Hire\n姓名：${name}\nEmail：${email}\n類型：${topic}\n預算：${budget || '未填'}\n──────────\n${message}`
  )

  return NextResponse.json({ ok: true })
}
