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
