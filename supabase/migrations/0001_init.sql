-- Edu Knowledge Base & LMS: initial schema.
-- Tables mirror the DTOs in src/api/types/*.dto.ts 1:1 so the client layer
-- stays a thin mapping between rows and DTOs (adapters still convert DTO -> UI Model).

-- ==================== Profiles ====================

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text not null,
  avatar_url text not null default '',
  greeting text not null default '',
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles: owner read" on public.profiles
  for select using (auth.uid() = id);

create policy "profiles: owner update" on public.profiles
  for update using (auth.uid() = id);

-- Auto-create a profile row when a new auth user signs up.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, name, greeting)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1)),
    coalesce('Добро пожаловать, ' || (new.raw_user_meta_data ->> 'name') || '!', 'Добро пожаловать!')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ==================== Shared content (read-only for authenticated users) ====================

create table public.tree_nodes (
  id text primary key,
  parent_id text references public.tree_nodes (id) on delete cascade,
  code text not null,
  title text not null,
  level int not null,
  has_article boolean not null default false,
  article_id text,
  sort_order int not null default 0
);
create index tree_nodes_parent_id_idx on public.tree_nodes (parent_id);

create table public.articles (
  id text primary key,
  code text not null,
  title text not null,
  tags text[] not null default '{}',
  difficulty text not null check (difficulty in ('Легкий', 'Средний', 'Продвинутый')),
  read_time_min int not null,
  category_path text[] not null default '{}',
  likes_count int not null default 0,
  comments_count int not null default 0,
  total_pages int not null default 1
);

create table public.article_sections (
  id text primary key,
  article_id text not null references public.articles (id) on delete cascade,
  parent_id text references public.article_sections (id) on delete cascade,
  code text not null,
  title text not null,
  sort_order int not null default 0
);
create index article_sections_article_id_idx on public.article_sections (article_id);
create index article_sections_parent_id_idx on public.article_sections (parent_id);

create table public.article_blocks (
  id text primary key,
  article_id text not null references public.articles (id) on delete cascade,
  sort_order int not null,
  type text not null check (type in ('paragraph', 'heading', 'code', 'callout', 'list')),
  content text not null,
  language text,
  level int,
  callout_type text check (callout_type in ('info', 'warning', 'success'))
);
create index article_blocks_article_id_idx on public.article_blocks (article_id);

create table public.quiz_questions (
  id text primary key,
  article_id text not null references public.articles (id) on delete cascade,
  question_number int not null,
  total_questions int not null,
  question_text text not null,
  options jsonb not null,
  correct_option_key text not null,
  explanation_text text not null
);
create index quiz_questions_article_id_idx on public.quiz_questions (article_id);

create table public.practice_tasks (
  id text primary key,
  article_id text not null references public.articles (id) on delete cascade,
  task_number int not null,
  total_tasks int not null,
  title text not null,
  description text not null,
  requirements text[] not null default '{}',
  initial_code text not null,
  solution_code text not null
);
create index practice_tasks_article_id_idx on public.practice_tasks (article_id);

create table public.knowledge_graphs (
  id text primary key,
  title text not null
);

create table public.knowledge_graph_nodes (
  graph_id text not null references public.knowledge_graphs (id) on delete cascade,
  id text not null,
  label text not null,
  is_center boolean not null default false,
  article_id text,
  color_variant text check (color_variant in ('primary', 'secondary', 'neutral')),
  primary key (graph_id, id)
);

create table public.knowledge_graph_edges (
  graph_id text not null references public.knowledge_graphs (id) on delete cascade,
  source_id text not null,
  target_id text not null,
  primary key (graph_id, source_id, target_id)
);

alter table public.tree_nodes enable row level security;
alter table public.articles enable row level security;
alter table public.article_sections enable row level security;
alter table public.article_blocks enable row level security;
alter table public.quiz_questions enable row level security;
alter table public.practice_tasks enable row level security;
alter table public.knowledge_graphs enable row level security;
alter table public.knowledge_graph_nodes enable row level security;
alter table public.knowledge_graph_edges enable row level security;

-- Content is authored by the (single) app owner via the service role, and
-- readable by any signed-in user. No insert/update/delete policy is defined
-- for regular users on purpose — content changes go through migrations/seed.
create policy "tree_nodes: read" on public.tree_nodes for select using (auth.role() = 'authenticated');
create policy "articles: read" on public.articles for select using (auth.role() = 'authenticated');
create policy "article_sections: read" on public.article_sections for select using (auth.role() = 'authenticated');
create policy "article_blocks: read" on public.article_blocks for select using (auth.role() = 'authenticated');
create policy "quiz_questions: read" on public.quiz_questions for select using (auth.role() = 'authenticated');
create policy "practice_tasks: read" on public.practice_tasks for select using (auth.role() = 'authenticated');
create policy "knowledge_graphs: read" on public.knowledge_graphs for select using (auth.role() = 'authenticated');
create policy "knowledge_graph_nodes: read" on public.knowledge_graph_nodes for select using (auth.role() = 'authenticated');
create policy "knowledge_graph_edges: read" on public.knowledge_graph_edges for select using (auth.role() = 'authenticated');

-- ==================== Per-user data (owner-scoped) ====================

create table public.tree_node_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  tree_node_id text not null references public.tree_nodes (id) on delete cascade,
  completed_at timestamptz not null default now(),
  primary key (user_id, tree_node_id)
);

create table public.article_section_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  section_id text not null references public.article_sections (id) on delete cascade,
  is_read boolean not null default false,
  primary key (user_id, section_id)
);

create table public.article_reading_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  article_id text not null references public.articles (id) on delete cascade,
  current_page_index int not null default 0,
  is_favorite boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (user_id, article_id)
);

create table public.notes (
  id text primary key default ('note_' || replace(gen_random_uuid()::text, '-', '')),
  user_id uuid not null references auth.users (id) on delete cascade,
  article_id text not null references public.articles (id) on delete cascade,
  quote_text text not null,
  user_comment text,
  color text not null check (color in ('amber', 'emerald', 'purple', 'blue')),
  is_related boolean not null default false,
  created_at timestamptz not null default now()
);
create index notes_user_id_idx on public.notes (user_id);

create table public.continue_study (
  user_id uuid primary key references auth.users (id) on delete cascade,
  article_id text not null references public.articles (id) on delete cascade,
  title text not null,
  parent_category text not null,
  sub_category text not null,
  remaining_minutes int not null,
  progress_percent int not null
);

create table public.daily_tasks (
  id text primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  type text not null check (type in ('cards', 'test', 'practice')),
  title text not null,
  subtitle text not null,
  count_badge int not null default 0,
  is_completed boolean not null default false,
  task_date date not null default current_date
);
create index daily_tasks_user_id_idx on public.daily_tasks (user_id);

create table public.recent_studies (
  id text primary key default ('recent_' || replace(gen_random_uuid()::text, '-', '')),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  studied_at timestamptz not null default now(),
  duration_minutes int not null
);
create index recent_studies_user_id_idx on public.recent_studies (user_id);

create table public.learning_stats (
  user_id uuid primary key references auth.users (id) on delete cascade,
  period text not null,
  articles_studied int not null default 0,
  articles_growth_percent int not null default 0,
  study_time_formatted text not null default '0м',
  study_time_growth_formatted text not null default '+0м',
  tests_completed int not null default 0,
  tests_growth_count int not null default 0
);

create table public.category_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  category_id text not null,
  title text not null,
  progress_percent int not null default 0,
  sort_order int not null default 0,
  primary key (user_id, category_id)
);

alter table public.tree_node_progress enable row level security;
alter table public.article_section_progress enable row level security;
alter table public.article_reading_progress enable row level security;
alter table public.notes enable row level security;
alter table public.continue_study enable row level security;
alter table public.daily_tasks enable row level security;
alter table public.recent_studies enable row level security;
alter table public.learning_stats enable row level security;
alter table public.category_progress enable row level security;

create policy "tree_node_progress: owner" on public.tree_node_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "article_section_progress: owner" on public.article_section_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "article_reading_progress: owner" on public.article_reading_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "notes: owner" on public.notes
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "continue_study: owner" on public.continue_study
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "daily_tasks: owner" on public.daily_tasks
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "recent_studies: owner" on public.recent_studies
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "learning_stats: owner" on public.learning_stats
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "category_progress: owner" on public.category_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
