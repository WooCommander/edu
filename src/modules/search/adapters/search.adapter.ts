import type { SearchResultDTO } from '@/api'

export interface SearchResultUIModel {
  id: string
  title: string
  categoryPath: string
  snippetText: string
  entityType: 'article' | 'section' | 'note'
  articleId: string
}

export interface SearchFilterTabUIModel {
  key: string
  label: string
}

export function adaptSearchResult(dto: SearchResultDTO): SearchResultUIModel {
  return {
    id: dto.id,
    title: dto.title,
    categoryPath: dto.category_path,
    snippetText: dto.snippet_text,
    entityType: dto.entity_type,
    articleId: dto.article_id
  }
}
