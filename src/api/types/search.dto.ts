export interface SearchResultDTO {
  id: string
  title: string
  category_path: string
  snippet_text: string
  entity_type: 'article' | 'section' | 'note'
  article_id: string
}
