export interface TreeNodeDTO {
  id: string
  code: string // например '1.1.3.1.2'
  title: string
  level: number
  has_article: boolean
  article_id?: string
  is_completed?: boolean
  children_count: number
  children?: TreeNodeDTO[]
}

export interface ArticleContentBlockDTO {
  id: string
  type: 'paragraph' | 'heading' | 'code' | 'callout' | 'list'
  content: string
  language?: string
  level?: number // для heading (h2, h3)
  callout_type?: 'info' | 'warning' | 'success'
}

export interface ArticleSectionDTO {
  id: string
  code: string
  title: string
  is_read: boolean
  children?: ArticleSectionDTO[]
}

export interface ArticleDTO {
  id: string
  code: string
  title: string
  tags: string[]
  difficulty: 'Легкий' | 'Средний' | 'Продвинутый'
  read_time_min: number
  category_path: string[] // ['Vue 3', 'Основы', 'Реактивность', 'watch и watchEffect']
  sections: ArticleSectionDTO[]
  blocks: ArticleContentBlockDTO[]
  likes_count: number
  comments_count: number
  is_favorite: boolean
  current_page_index: number
  total_pages: number
}
