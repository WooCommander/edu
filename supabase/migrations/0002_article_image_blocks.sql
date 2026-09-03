-- Adds support for 'image' content blocks (and keeps 'list' working the same
-- way it already did): a new alt_text column, and 'image' allowed by the
-- article_blocks.type check constraint.
-- Run this once against an existing project that already applied 0001_init.sql.

alter table public.article_blocks
  add column if not exists alt_text text;

alter table public.article_blocks
  drop constraint if exists article_blocks_type_check;

alter table public.article_blocks
  add constraint article_blocks_type_check
  check (type in ('paragraph', 'heading', 'code', 'callout', 'list', 'image'));
