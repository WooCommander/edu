-- articles.likes_count has no update policy (content is owner/service-role
-- only, see 0001) — a signed-in user can't UPDATE it directly. This function
-- lets the client "like" an article through a narrow, atomic RPC instead of
-- opening the whole row up to client writes.
create or replace function public.increment_article_likes(p_article_id text)
returns int
language sql
security definer
set search_path = public
as $$
  update public.articles
  set likes_count = likes_count + 1
  where id = p_article_id
  returning likes_count;
$$;

grant execute on function public.increment_article_likes(text) to authenticated;
