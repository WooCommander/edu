/**
 * Hand-written mirror of supabase/migrations/0001_init.sql for strict typing
 * without `any`. Once a real Supabase project exists, prefer regenerating
 * this file with `supabase gen types typescript` and keeping the shape.
 *
 * Must use `type` (not `interface`) throughout: supabase-js infers table
 * rows via `Schema extends GenericSchema` conditional checks against
 * `Record<string, ...>`, and `interface` types don't satisfy that check
 * (they resolve to `never`), while plain object `type` aliases do.
 */

type TableDef<Row, Insert, Update = Partial<Insert>> = {
  Row: Row
  Insert: Insert
  Update: Update
  Relationships: []
}

export type ProfileRow = {
  id: string
  name: string
  avatar_url: string
  greeting: string
  created_at: string
}

export type TreeNodeRow = {
  id: string
  parent_id: string | null
  code: string
  title: string
  level: number
  has_article: boolean
  article_id: string | null
  sort_order: number
}

export type ArticleRow = {
  id: string
  code: string
  title: string
  tags: string[]
  difficulty: 'Легкий' | 'Средний' | 'Продвинутый'
  read_time_min: number
  category_path: string[]
  likes_count: number
  comments_count: number
  total_pages: number
}

export type ArticleSectionRow = {
  id: string
  article_id: string
  parent_id: string | null
  code: string
  title: string
  sort_order: number
}

export type ArticleBlockRow = {
  id: string
  article_id: string
  sort_order: number
  type: 'paragraph' | 'heading' | 'code' | 'callout' | 'list'
  content: string
  language: string | null
  level: number | null
  callout_type: 'info' | 'warning' | 'success' | null
}

export type QuizQuestionRow = {
  id: string
  article_id: string
  question_number: number
  total_questions: number
  question_text: string
  options: { key: string; text: string }[]
  correct_option_key: string
  explanation_text: string
}

export type PracticeTaskRow = {
  id: string
  article_id: string
  task_number: number
  total_tasks: number
  title: string
  description: string
  requirements: string[]
  initial_code: string
  solution_code: string
}

export type KnowledgeGraphRow = {
  id: string
  title: string
}

export type KnowledgeGraphNodeRow = {
  graph_id: string
  id: string
  label: string
  is_center: boolean
  article_id: string | null
  color_variant: 'primary' | 'secondary' | 'neutral' | null
}

export type KnowledgeGraphEdgeRow = {
  graph_id: string
  source_id: string
  target_id: string
}

export type TreeNodeProgressRow = {
  user_id: string
  tree_node_id: string
  completed_at: string
}

export type ArticleSectionProgressRow = {
  user_id: string
  section_id: string
  is_read: boolean
}

export type ArticleReadingProgressRow = {
  user_id: string
  article_id: string
  current_page_index: number
  is_favorite: boolean
  updated_at: string
}

export type NoteRow = {
  id: string
  user_id: string
  article_id: string
  quote_text: string
  user_comment: string | null
  color: 'amber' | 'emerald' | 'purple' | 'blue'
  is_related: boolean
  created_at: string
}

export type ContinueStudyRow = {
  user_id: string
  article_id: string
  title: string
  parent_category: string
  sub_category: string
  remaining_minutes: number
  progress_percent: number
}

export type DailyTaskRow = {
  id: string
  user_id: string
  type: 'cards' | 'test' | 'practice'
  title: string
  subtitle: string
  count_badge: number
  is_completed: boolean
  task_date: string
}

export type RecentStudyRow = {
  id: string
  user_id: string
  title: string
  studied_at: string
  duration_minutes: number
}

export type LearningStatsRow = {
  user_id: string
  period: string
  articles_studied: number
  articles_growth_percent: number
  study_time_formatted: string
  study_time_growth_formatted: string
  tests_completed: number
  tests_growth_count: number
}

export type CategoryProgressRow = {
  user_id: string
  category_id: string
  title: string
  progress_percent: number
  sort_order: number
}

export type Database = {
  public: {
    Views: Record<string, never>
    Functions: Record<string, never>
    Tables: {
      profiles: TableDef<ProfileRow, ProfileRow>
      tree_nodes: TableDef<TreeNodeRow, TreeNodeRow>
      articles: TableDef<ArticleRow, ArticleRow>
      article_sections: TableDef<ArticleSectionRow, ArticleSectionRow>
      article_blocks: TableDef<ArticleBlockRow, ArticleBlockRow>
      quiz_questions: TableDef<QuizQuestionRow, QuizQuestionRow>
      practice_tasks: TableDef<PracticeTaskRow, PracticeTaskRow>
      knowledge_graphs: TableDef<KnowledgeGraphRow, KnowledgeGraphRow>
      knowledge_graph_nodes: TableDef<KnowledgeGraphNodeRow, KnowledgeGraphNodeRow>
      knowledge_graph_edges: TableDef<KnowledgeGraphEdgeRow, KnowledgeGraphEdgeRow>
      tree_node_progress: TableDef<TreeNodeProgressRow, TreeNodeProgressRow>
      article_section_progress: TableDef<ArticleSectionProgressRow, ArticleSectionProgressRow>
      article_reading_progress: TableDef<ArticleReadingProgressRow, ArticleReadingProgressRow>
      notes: TableDef<NoteRow, Omit<NoteRow, 'id' | 'created_at'> & { id?: string; created_at?: string }>
      continue_study: TableDef<ContinueStudyRow, ContinueStudyRow>
      daily_tasks: TableDef<DailyTaskRow, DailyTaskRow>
      recent_studies: TableDef<RecentStudyRow, RecentStudyRow>
      learning_stats: TableDef<LearningStatsRow, LearningStatsRow>
      category_progress: TableDef<CategoryProgressRow, CategoryProgressRow>
    }
  }
}
