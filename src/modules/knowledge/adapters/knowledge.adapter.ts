import type { ArticleContentBlockDTO, ArticleDTO, ArticleSectionDTO, TreeNodeDTO } from '@/api'

export interface TreeNodeUIModel {
  id: string
  code: string
  title: string
  level: number
  hasArticle: boolean
  articleId?: string
  isCompleted: boolean
  childrenCount: number
  children: TreeNodeUIModel[]
  isExpanded?: boolean
}

export interface ArticleSectionUIModel {
  id: string
  code: string
  title: string
  isRead: boolean
  children: ArticleSectionUIModel[]
}

export interface ArticleBlockUIModel {
  id: string
  type: 'paragraph' | 'heading' | 'code' | 'callout' | 'list' | 'image'
  content: string
  language?: string
  level?: number
  calloutType?: 'info' | 'warning' | 'success'
  altText?: string
}

export interface ArticleUIModel {
  id: string
  code: string
  title: string
  tags: string[]
  difficultyText: string
  readTimeText: string
  categoryPathText: string
  categoryPathArray: string[]
  sections: ArticleSectionUIModel[]
  blocks: ArticleBlockUIModel[]
  likesCount: number
  commentsCount: number
  isFavorite: boolean
  progressText: string
  progressPercent: number
}

export function adaptTreeNode(dto: TreeNodeDTO): TreeNodeUIModel {
  return {
    id: dto.id,
    code: dto.code,
    title: dto.title,
    level: dto.level,
    hasArticle: dto.has_article,
    articleId: dto.article_id,
    isCompleted: !!dto.is_completed,
    childrenCount: dto.children_count,
    children: (dto.children || []).map(adaptTreeNode),
    isExpanded: dto.level <= 4
  }
}

export function adaptArticleSection(dto: ArticleSectionDTO): ArticleSectionUIModel {
  return {
    id: dto.id,
    code: dto.code,
    title: dto.title,
    isRead: dto.is_read,
    children: (dto.children || []).map(adaptArticleSection)
  }
}

export function adaptArticleBlock(dto: ArticleContentBlockDTO): ArticleBlockUIModel {
  return {
    id: dto.id,
    type: dto.type,
    content: dto.content,
    language: dto.language,
    level: dto.level,
    calloutType: dto.callout_type,
    altText: dto.alt_text
  }
}

export function adaptArticle(dto: ArticleDTO): ArticleUIModel {
  return {
    id: dto.id,
    code: dto.code,
    title: dto.title,
    tags: dto.tags,
    difficultyText: `${dto.difficulty} уровень`,
    readTimeText: `${dto.read_time_min} мин чтения`,
    categoryPathText: dto.category_path.join(' › '),
    categoryPathArray: dto.category_path,
    sections: dto.sections.map(adaptArticleSection),
    blocks: dto.blocks.map(adaptArticleBlock),
    likesCount: dto.likes_count,
    commentsCount: dto.comments_count,
    isFavorite: dto.is_favorite,
    progressText: `${dto.current_page_index} из ${dto.total_pages}`,
    progressPercent: dto.total_pages > 0 ? Math.round((dto.current_page_index / dto.total_pages) * 100) : 0
  }
}

/**
 * Walks the tree from `root` to the node with id `targetId`, returning the
 * chain of real nodes along the way (the synthetic level-0 root is skipped).
 * Used for both the tree screen's own breadcrumb and BreadcrumbPathModal.
 */
export function findBreadcrumbPath(root: TreeNodeUIModel, targetId: string): TreeNodeUIModel[] {
  const path: TreeNodeUIModel[] = []

  function walk(node: TreeNodeUIModel): boolean {
    const isRealNode = node.level > 0
    if (isRealNode) path.push(node)
    if (node.id === targetId) return true
    for (const child of node.children) {
      if (walk(child)) return true
    }
    if (isRealNode) path.pop()
    return false
  }

  walk(root)
  return path
}
