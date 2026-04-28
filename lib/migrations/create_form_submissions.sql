-- Run this in Supabase Dashboard > SQL Editor

create table if not exists contact_submissions (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  subject     text not null,
  message     text not null,
  created_at  timestamptz default now()
);

create table if not exists hire_submissions (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  topic       text not null,
  budget      text,
  message     text not null,
  created_at  timestamptz default now()
);

-- Enable Row Level Security (no public read)
alter table contact_submissions enable row level security;
alter table hire_submissions enable row level security;
