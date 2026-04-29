# Contact & Hire 表單

## 流程

```
使用者送出表單
  → POST /api/contact 或 /api/hire
  → 寫入 Supabase
  → 傳送 LINE 通知
  → 回傳 { ok: true }
```

## API Routes

| Route | Table | 必填欄位 |
|---|---|---|
| `POST /api/contact` | `contact_submissions` | name, email, subject, message |
| `POST /api/hire` | `hire_submissions` | name, email, topic, message（budget 選填） |

## Supabase 資料表

建表語法：[`lib/migrations/create_form_submissions.sql`](../lib/migrations/create_form_submissions.sql)

兩張表皆啟用 RLS，僅 service role 可寫入。

## LINE 通知

`lib/line.ts` — 使用 LINE Messaging API Push Message。

| 環境變數 | 說明 |
|---|---|
| `LINE_CHANNEL_ACCESS_TOKEN` | Channel Access Token |
| `LINE_OWNER_USER_ID` | 接收通知的 User ID |

LINE 失敗不影響表單送出（catch 後只 log，不拋錯）。

## 環境變數

| 變數 | 用途 |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 專案 URL |
| `SUPABASE_SERVICE_ROLE_KEY` | 寫入資料表用（server-side only） |
| `LINE_CHANNEL_ACCESS_TOKEN` | LINE 通知 |
| `LINE_OWNER_USER_ID` | LINE 通知目標 |

本地：`.env.local`　　Production：Vercel Environment Variables
