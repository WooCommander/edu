import { isSupabaseConfigured, supabase } from './supabase'
import {
  mockArticles,
  mockContinueItem,
  mockDailyTasks,
  mockKnowledgeGraph,
  mockKnowledgeTree,
  mockLearningStats,
  mockNotes,
  mockPracticeTask,
  mockQuizQuestions,
  mockRecentStudies,
  mockUser
} from './mock-data'
import type { ArticleDTO, ArticleSectionDTO, TreeNodeDTO } from './types/knowledge.dto'
import type { ContinueStudyItemDTO, DailyTaskDTO, LearningStatsDTO, RecentStudyDTO } from './types/learning.dto'
import type { NoteDTO } from './types/notes.dto'
import type { PracticeTaskDTO, QuizQuestionDTO } from './types/quiz.dto'
import type { KnowledgeGraphDTO } from './types/knowledge-map.dto'
import type { ArticleSectionRow, TreeNodeRow } from './database.types'
import type { UserProfile } from '@/shared/types'
import { formatRelativeDayLabel } from '@/shared/lib/formatters'

async function getCurrentUserId(): Promise<string> {
  const { data, error } = await supabase.auth.getUser()
  if (error || !data.user) {
    throw new Error('Нет активной сессии Supabase. Сначала выполните вход.')
  }
  return data.user.id
}

function buildKnowledgeTree(rows: TreeNodeRow[], completedIds: Set<string>): TreeNodeDTO {
  const byId = new Map<string, TreeNodeDTO>()
  for (const row of rows) {
    byId.set(row.id, {
      id: row.id,
      code: row.code,
      title: row.title,
      level: row.level,
      has_article: row.has_article,
      article_id: row.article_id ?? undefined,
      is_completed: completedIds.has(row.id),
      children_count: 0
    })
  }

  let root: TreeNodeDTO | undefined
  for (const row of rows) {
    const node = byId.get(row.id)
    if (!node) continue
    if (row.parent_id) {
      const parent = byId.get(row.parent_id)
      if (parent) {
        parent.children = parent.children ?? []
        parent.children.push(node)
        parent.children_count = parent.children.length
      }
    } else {
      root = node
    }
  }

  if (!root) {
    throw new Error('Дерево знаний пусто: не найден корневой узел (parent_id = null).')
  }
  return root
}

function buildArticleSections(rows: ArticleSectionRow[], readMap: Map<string, boolean>): ArticleSectionDTO[] {
  const byId = new Map<string, ArticleSectionDTO>()
  for (const row of rows) {
    byId.set(row.id, {
      id: row.id,
      code: row.code,
      title: row.title,
      is_read: readMap.get(row.id) ?? false
    })
  }

  const roots: ArticleSectionDTO[] = []
  for (const row of rows) {
    const node = byId.get(row.id)
    if (!node) continue
    if (row.parent_id) {
      const parent = byId.get(row.parent_id)
      if (parent) {
        parent.children = parent.children ?? []
        parent.children.push(node)
      }
    } else {
      roots.push(node)
    }
  }
  return roots
}

export const apiClient = {
  async getUserProfile(): Promise<UserProfile> {
    if (!isSupabaseConfigured) return Promise.resolve({ ...mockUser })

    const userId = await getCurrentUserId()
    const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single()
    if (error || !data) throw error ?? new Error('Профиль пользователя не найден.')

    return { id: data.id, name: data.name, avatarUrl: data.avatar_url, greeting: data.greeting }
  },

  async getContinueStudyItem(): Promise<ContinueStudyItemDTO> {
    if (!isSupabaseConfigured) return Promise.resolve({ ...mockContinueItem })

    const userId = await getCurrentUserId()
    const { data, error } = await supabase.from('continue_study').select('*').eq('user_id', userId).maybeSingle()
    if (error) throw error
    if (!data) throw new Error('Нет записи "продолжить обучение" для пользователя в таблице continue_study.')

    return data
  },

  async getDailyTasks(): Promise<DailyTaskDTO[]> {
    if (!isSupabaseConfigured) return Promise.resolve([...mockDailyTasks])

    const userId = await getCurrentUserId()
    const today = new Date().toISOString().slice(0, 10)
    const { data, error } = await supabase
      .from('daily_tasks')
      .select('*')
      .eq('user_id', userId)
      .eq('task_date', today)
    if (error) throw error

    return data ?? []
  },

  async getRecentStudies(): Promise<RecentStudyDTO[]> {
    if (!isSupabaseConfigured) return Promise.resolve([...mockRecentStudies])

    const userId = await getCurrentUserId()
    const { data, error } = await supabase
      .from('recent_studies')
      .select('*')
      .eq('user_id', userId)
      .order('studied_at', { ascending: false })
      .limit(10)
    if (error) throw error

    return (data ?? []).map(row => ({
      id: row.id,
      title: row.title,
      time_ago: formatRelativeDayLabel(row.studied_at),
      duration_minutes: row.duration_minutes
    }))
  },

  async getKnowledgeTree(): Promise<TreeNodeDTO> {
    if (!isSupabaseConfigured) return Promise.resolve(JSON.parse(JSON.stringify(mockKnowledgeTree)))

    const userId = await getCurrentUserId()
    const [{ data: rows, error: rowsError }, { data: progressRows, error: progressError }] = await Promise.all([
      supabase.from('tree_nodes').select('*').order('sort_order', { ascending: true }),
      supabase.from('tree_node_progress').select('tree_node_id').eq('user_id', userId)
    ])
    if (rowsError) throw rowsError
    if (progressError) throw progressError

    const completedIds = new Set((progressRows ?? []).map(row => row.tree_node_id))
    return buildKnowledgeTree(rows ?? [], completedIds)
  },

  async getArticleById(id: string): Promise<ArticleDTO> {
    if (!isSupabaseConfigured) {
      const article = mockArticles[id]
      if (!article) throw new Error(`Статья "${id}" не найдена.`)
      return Promise.resolve(JSON.parse(JSON.stringify(article)))
    }

    const userId = await getCurrentUserId()
    const [
      { data: article, error: articleError },
      { data: sectionRows, error: sectionsError },
      { data: blockRows, error: blocksError },
      { data: sectionProgressRows, error: sectionProgressError },
      { data: readingProgress, error: readingProgressError }
    ] = await Promise.all([
      supabase.from('articles').select('*').eq('id', id).single(),
      supabase.from('article_sections').select('*').eq('article_id', id).order('sort_order'),
      supabase.from('article_blocks').select('*').eq('article_id', id).order('sort_order'),
      supabase.from('article_section_progress').select('section_id, is_read').eq('user_id', userId),
      supabase
        .from('article_reading_progress')
        .select('current_page_index, is_favorite')
        .eq('user_id', userId)
        .eq('article_id', id)
        .maybeSingle()
    ])
    if (articleError || !article) throw articleError ?? new Error(`Статья "${id}" не найдена.`)
    if (sectionsError) throw sectionsError
    if (blocksError) throw blocksError
    if (sectionProgressError) throw sectionProgressError
    if (readingProgressError) throw readingProgressError

    const readMap = new Map((sectionProgressRows ?? []).map(row => [row.section_id, row.is_read]))

    return {
      id: article.id,
      code: article.code,
      title: article.title,
      tags: article.tags,
      difficulty: article.difficulty,
      read_time_min: article.read_time_min,
      category_path: article.category_path,
      sections: buildArticleSections(sectionRows ?? [], readMap),
      blocks: (blockRows ?? []).map(row => ({
        id: row.id,
        type: row.type,
        content: row.content,
        language: row.language ?? undefined,
        level: row.level ?? undefined,
        callout_type: row.callout_type ?? undefined
      })),
      likes_count: article.likes_count,
      comments_count: article.comments_count,
      is_favorite: readingProgress?.is_favorite ?? false,
      current_page_index: readingProgress?.current_page_index ?? 0,
      total_pages: article.total_pages
    }
  },

  async getNotesByArticleId(articleId?: string): Promise<NoteDTO[]> {
    if (!isSupabaseConfigured) return Promise.resolve([...mockNotes])

    const userId = await getCurrentUserId()
    const query = supabase.from('notes').select('*').eq('user_id', userId).order('created_at', { ascending: false })
    const { data, error } = await (articleId ? query.eq('article_id', articleId) : query)
    if (error) throw error

    return (data ?? []).map(row => ({
      id: row.id,
      article_id: row.article_id,
      quote_text: row.quote_text,
      user_comment: row.user_comment ?? undefined,
      color: row.color,
      created_at: row.created_at,
      created_at_label: formatRelativeDayLabel(row.created_at),
      is_related: row.is_related
    }))
  },

  async addNote(note: Omit<NoteDTO, 'id' | 'created_at' | 'created_at_label'>): Promise<NoteDTO> {
    if (!isSupabaseConfigured) {
      const newNote: NoteDTO = {
        ...note,
        id: `note_${Date.now()}`,
        created_at: new Date().toISOString(),
        created_at_label: 'Только что'
      }
      mockNotes.unshift(newNote)
      return Promise.resolve(newNote)
    }

    const userId = await getCurrentUserId()
    const { data, error } = await supabase
      .from('notes')
      .insert({
        user_id: userId,
        article_id: note.article_id,
        quote_text: note.quote_text,
        user_comment: note.user_comment ?? null,
        color: note.color,
        is_related: note.is_related ?? false
      })
      .select()
      .single()
    if (error || !data) throw error ?? new Error('Не удалось создать заметку.')

    return {
      id: data.id,
      article_id: data.article_id,
      quote_text: data.quote_text,
      user_comment: data.user_comment ?? undefined,
      color: data.color,
      created_at: data.created_at,
      created_at_label: 'Только что',
      is_related: data.is_related
    }
  },

  async getQuizQuestionsByArticleId(articleId: string): Promise<QuizQuestionDTO[]> {
    if (!isSupabaseConfigured) return Promise.resolve([...mockQuizQuestions])

    const { data, error } = await supabase
      .from('quiz_questions')
      .select('*')
      .eq('article_id', articleId)
      .order('question_number')
    if (error) throw error

    return data ?? []
  },

  async getPracticeTaskByArticleId(articleId: string): Promise<PracticeTaskDTO> {
    if (!isSupabaseConfigured) return Promise.resolve({ ...mockPracticeTask })

    const { data, error } = await supabase
      .from('practice_tasks')
      .select('*')
      .eq('article_id', articleId)
      .order('task_number')
      .limit(1)
      .maybeSingle()
    if (error) throw error
    if (!data) throw new Error(`Нет практического задания для статьи "${articleId}".`)

    return data
  },

  async getLearningStats(): Promise<LearningStatsDTO> {
    if (!isSupabaseConfigured) return Promise.resolve({ ...mockLearningStats })

    const userId = await getCurrentUserId()
    const [{ data: stats, error: statsError }, { data: categories, error: categoriesError }] = await Promise.all([
      supabase.from('learning_stats').select('*').eq('user_id', userId).maybeSingle(),
      supabase.from('category_progress').select('*').eq('user_id', userId).order('sort_order')
    ])
    if (statsError) throw statsError
    if (categoriesError) throw categoriesError
    if (!stats) throw new Error('Нет статистики обучения для пользователя в таблице learning_stats.')

    return {
      period: stats.period,
      articles_studied: stats.articles_studied,
      articles_growth_percent: stats.articles_growth_percent,
      study_time_formatted: stats.study_time_formatted,
      study_time_growth_formatted: stats.study_time_growth_formatted,
      tests_completed: stats.tests_completed,
      tests_growth_count: stats.tests_growth_count,
      category_progress: (categories ?? []).map(row => ({
        category_id: row.category_id,
        title: row.title,
        progress_percent: row.progress_percent
      }))
    }
  },

  async getKnowledgeGraph(): Promise<KnowledgeGraphDTO> {
    if (!isSupabaseConfigured) return Promise.resolve(JSON.parse(JSON.stringify(mockKnowledgeGraph)))

    const { data: graph, error: graphError } = await supabase.from('knowledge_graphs').select('*').limit(1).maybeSingle()
    if (graphError) throw graphError
    if (!graph) throw new Error('Граф знаний не найден в таблице knowledge_graphs.')

    const [{ data: nodes, error: nodesError }, { data: edges, error: edgesError }] = await Promise.all([
      supabase.from('knowledge_graph_nodes').select('*').eq('graph_id', graph.id),
      supabase.from('knowledge_graph_edges').select('*').eq('graph_id', graph.id)
    ])
    if (nodesError) throw nodesError
    if (edgesError) throw edgesError

    return {
      id: graph.id,
      title: graph.title,
      nodes: (nodes ?? []).map(node => ({
        id: node.id,
        label: node.label,
        is_center: node.is_center,
        article_id: node.article_id ?? undefined,
        color_variant: node.color_variant ?? undefined
      })),
      edges: (edges ?? []).map(edge => ({ source_id: edge.source_id, target_id: edge.target_id }))
    }
  }
}
