
-- Job applications table to track job auto-apply actions per user
create table if not exists public.job_applications (
  id uuid primary key default gen_random_uuid(),
  user_email text not null,
  job_id text not null,
  job_title text,
  company text,
  location text,
  salary text,
  status text default 'pending', -- pending, approved, applied, rejected, error
  applied_at timestamp with time zone,
  job_url text,
  auto_filled_content jsonb,
  error_message text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- RLS: Users can only see and write their own applications
alter table public.job_applications enable row level security;

create policy "User can select own applications"
  on public.job_applications for select
  using (user_email = auth.email());

create policy "User can insert own applications"
  on public.job_applications for insert
  with check (user_email = auth.email());

create policy "User can update own applications"
  on public.job_applications for update
  using (user_email = auth.email());

create policy "User can delete own applications"
  on public.job_applications for delete
  using (user_email = auth.email());
