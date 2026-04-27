-- Migration: Create bookmark cache table
-- Description: Store scraped Open Graph metadata for Notion bookmarks
-- Created: 2024

-- Create the bookmark_cache table
create table if not exists public.bookmark_cache (
  id bigint primary key generated always as identity,
  url text unique not null,
  title text,
  description text,
  favicon text,
  image text,
  created_at timestamp with time zone default now()
);

-- Create indexes for better query performance
create index if not exists idx_bookmark_cache_url on public.bookmark_cache(url);
create index if not exists idx_bookmark_cache_created_at on public.bookmark_cache(created_at);

-- Enable Row Level Security
alter table public.bookmark_cache enable row level security;

-- Drop existing policies if they exist (avoid conflicts)
drop policy if exists "Allow public read" on public.bookmark_cache;
drop policy if exists "Allow public insert" on public.bookmark_cache;
drop policy if exists "Allow public delete" on public.bookmark_cache;

-- Create RLS policies
-- Allow anyone to read bookmarks
create policy "Allow public read" on public.bookmark_cache
  for select using (true);

-- Allow anyone to insert new bookmarks
create policy "Allow public insert" on public.bookmark_cache
  for insert with check (true);

-- Allow anyone to delete bookmarks
create policy "Allow public delete" on public.bookmark_cache
  for delete using (true);

-- Grant permissions to anon user (for API routes)
grant select on public.bookmark_cache to anon;
grant insert on public.bookmark_cache to anon;
grant delete on public.bookmark_cache to anon;
grant usage on public.bookmark_cache_id_seq to anon;
