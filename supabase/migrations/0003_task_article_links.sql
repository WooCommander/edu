-- Lets daily tasks and recent studies link to a real article, so clicking
-- them in the dashboard opens the right content instead of a hardcoded one.
-- Run once against an existing project that already applied 0001/0002.

alter table public.daily_tasks
  add column if not exists article_id text references public.articles (id) on delete set null;

alter table public.recent_studies
  add column if not exists article_id text references public.articles (id) on delete cascade;
