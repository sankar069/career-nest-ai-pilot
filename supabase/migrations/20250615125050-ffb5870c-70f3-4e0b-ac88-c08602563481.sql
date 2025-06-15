
-- Create a resumes table to persist generated/uploaded resumes
create table public.resumes (
  id uuid primary key default gen_random_uuid(),
  user_email text not null,
  type text not null check (type in ('built', 'uploaded')),
  resume_json jsonb, -- for builder-based resumes
  file_url text,     -- for uploaded resume files (PDF/DOCX)
  ats_score int,     -- stores latest ATS score
  semantic_match float, -- percent match score to job description
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- Enable Row Level Security
alter table public.resumes enable row level security;

-- Policy: Only allow users to access their own resumes
create policy "Users can view their own resumes"
  on public.resumes for select
  using (user_email = auth.email());

create policy "Users can insert their own resumes"
  on public.resumes for insert
  with check (user_email = auth.email());

create policy "Users can update their own resumes"
  on public.resumes for update
  using (user_email = auth.email());

create policy "Users can delete their own resumes"
  on public.resumes for delete
  using (user_email = auth.email());
