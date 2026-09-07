import { supabase } from './supabase'
import type { ArticleDTO, ArticleSectionDTO, TreeNodeDTO } from './types/knowledge.dto'
import type { ContinueStudyItemDTO, RecentStudyDTO } from './types/learning.dto'
import type { NoteDTO } from './types/notes.dto'
import type { SearchResultDTO } from './types/search.dto'
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
    const { data: authData, error: authError } = await supabase.auth.getUser()
    if (authError || !authData.user) throw new Error('Нет активной сессии Supabase. Сначала выполните вход.')

    const { data, error } = await supabase.from('profiles').select('*').eq('id', authData.user.id).single()
    if (error || !data) throw error ?? new Error('Профиль пользователя не найден.')

    return {
      id: data.id,
      name: data.name,
      avatarUrl: data.avatar_url,
      greeting: data.greeting,
      email: authData.user.email ?? ''
    }
  },

  async updateUserProfile(patch: { name?: string; avatarUrl?: string }): Promise<UserProfile> {
    const userId = await getCurrentUserId()
    const { data, error } = await supabase
      .from('profiles')
      .update({
        ...(patch.name !== undefined ? { name: patch.name } : {}),
        ...(patch.avatarUrl !== undefined ? { avatar_url: patch.avatarUrl } : {})
      })
      .eq('id', userId)
      .select()
      .single()
    if (error || !data) throw error ?? new Error('Не удалось обновить профиль.')

    const { data: authData } = await supabase.auth.getUser()

    return {
      id: data.id,
      name: data.name,
      avatarUrl: data.avatar_url,
      greeting: data.greeting,
      email: authData.user?.email ?? ''
    }
  },

  async getContinueStudyItem(): Promise<ContinueStudyItemDTO | null> {
    const userId = await getCurrentUserId()
    const { data, error } = await supabase.from('continue_study').select('*').eq('user_id', userId).maybeSingle()
    if (error) throw error

    // Отсутствие записи — нормальное состояние («пока нечего продолжать»),
    // а не ошибка: ContinueStudyCard уже рассчитан на item === null.
    return data
  },

  async getRecentStudies(): Promise<RecentStudyDTO[]> {
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
      duration_minutes: row.duration_minutes,
      article_id: row.article_id
    }))
  },

  async getKnowledgeTree(): Promise<TreeNodeDTO> {
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
        callout_type: row.callout_type ?? undefined,
        alt_text: row.alt_text ?? undefined
      })),
      likes_count: article.likes_count,
      comments_count: article.comments_count,
      is_favorite: readingProgress?.is_favorite ?? false,
      current_page_index: readingProgress?.current_page_index ?? 0,
      total_pages: article.total_pages
    }
  },

  async setArticleFavorite(articleId: string, isFavorite: boolean): Promise<void> {
    const userId = await getCurrentUserId()
    const { error } = await supabase
      .from('article_reading_progress')
      .upsert({ user_id: userId, article_id: articleId, is_favorite: isFavorite }, { onConflict: 'user_id,article_id' })
    if (error) throw error
  },

  async setReadingPosition(articleId: string, pageIndex: number): Promise<void> {
    const userId = await getCurrentUserId()
    const { error } = await supabase
      .from('article_reading_progress')
      .upsert({ user_id: userId, article_id: articleId, current_page_index: pageIndex }, { onConflict: 'user_id,article_id' })
    if (error) throw error
  },

  async setSectionRead(sectionId: string, isRead: boolean): Promise<void> {
    const userId = await getCurrentUserId()
    const { error } = await supabase
      .from('article_section_progress')
      .upsert({ user_id: userId, section_id: sectionId, is_read: isRead }, { onConflict: 'user_id,section_id' })
    if (error) throw error
  },

  async likeArticle(articleId: string): Promise<number> {
    const { data, error } = await supabase.rpc('increment_article_likes', { p_article_id: articleId })
    if (error) throw error
    return data
  },

  async getNotesByArticleId(articleId?: string): Promise<NoteDTO[]> {
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

  async updateNote(
    id: string,
    patch: Partial<Pick<NoteDTO, 'quote_text' | 'user_comment' | 'color' | 'is_related'>>
  ): Promise<NoteDTO> {
    const userId = await getCurrentUserId()
    const { data, error } = await supabase
      .from('notes')
      .update({
        ...(patch.quote_text !== undefined ? { quote_text: patch.quote_text } : {}),
        ...(patch.user_comment !== undefined ? { user_comment: patch.user_comment ?? null } : {}),
        ...(patch.color !== undefined ? { color: patch.color } : {}),
        ...(patch.is_related !== undefined ? { is_related: patch.is_related } : {})
      })
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single()
    if (error || !data) throw error ?? new Error('Не удалось обновить заметку.')

    return {
      id: data.id,
      article_id: data.article_id,
      quote_text: data.quote_text,
      user_comment: data.user_comment ?? undefined,
      color: data.color,
      created_at: data.created_at,
      created_at_label: formatRelativeDayLabel(data.created_at),
      is_related: data.is_related
    }
  },

  async deleteNote(id: string): Promise<void> {
    const userId = await getCurrentUserId()
    const { error } = await supabase.from('notes').delete().eq('id', id).eq('user_id', userId)
    if (error) throw error
  },

  async searchContent(query: string): Promise<SearchResultDTO[]> {
    const q = query.trim().toLowerCase()
    if (!q) return []

    const userId = await getCurrentUserId()
    const [{ data: articleRows, error: articleError }, { data: sectionRows, error: sectionError }, { data: noteRows, error: noteError }] =
      await Promise.all([
        supabase.from('articles').select('id, title, category_path').ilike('title', `%${query}%`).limit(10),
        supabase.from('article_sections').select('id, title, article_id').ilike('title', `%${query}%`).limit(10),
        supabase
          .from('notes')
          .select('id, quote_text, user_comment, article_id')
          .eq('user_id', userId)
          .ilike('quote_text', `%${query}%`)
          .limit(10)
      ])
    if (articleError) throw articleError
    if (sectionError) throw sectionError
    if (noteError) throw noteError

    const results: SearchResultDTO[] = (articleRows ?? []).map(row => ({
      id: `article_${row.id}`,
      title: row.title,
      category_path: row.category_path.join(' › '),
      snippet_text: '',
      entity_type: 'article' as const,
      article_id: row.id
    }))

    if (sectionRows && sectionRows.length > 0) {
      const parentIds = [...new Set(sectionRows.map(row => row.article_id))]
      const { data: parentArticles, error: parentError } = await supabase
        .from('articles')
        .select('id, title, category_path')
        .in('id', parentIds)
      if (parentError) throw parentError

      const parentById = new Map((parentArticles ?? []).map(row => [row.id, row]))
      for (const section of sectionRows) {
        const parent = parentById.get(section.article_id)
        results.push({
          id: `section_${section.id}`,
          title: section.title,
          category_path: parent ? `${parent.category_path.join(' › ')} › ${parent.title}` : '',
          snippet_text: '',
          entity_type: 'section',
          article_id: section.article_id
        })
      }
    }

    for (const note of noteRows ?? []) {
      results.push({
        id: `note_${note.id}`,
        title: note.quote_text.length > 70 ? `${note.quote_text.slice(0, 70)}…` : note.quote_text,
        category_path: 'Заметка',
        snippet_text: note.user_comment ?? '',
        entity_type: 'note',
        article_id: note.article_id
      })
    }

    return results
  }
}
