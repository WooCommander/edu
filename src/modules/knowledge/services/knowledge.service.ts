import { apiClient } from '@/api'
import { adaptArticle, adaptTreeNode, findNodeByArticleId, findSectionById } from '../adapters/knowledge.adapter'
import { knowledgeState } from '../state/knowledge.state'

class KnowledgeService {
  public async loadKnowledgeTree(): Promise<void> {
    knowledgeState.isLoading = true
    try {
      const dto = await apiClient.getKnowledgeTree()
      knowledgeState.tree = adaptTreeNode(dto)
    } finally {
      knowledgeState.isLoading = false
    }
  }

  public async loadArticle(articleId: string = 'article_watch'): Promise<void> {
    knowledgeState.isLoading = true
    try {
      const dto = await apiClient.getArticleById(articleId)
      knowledgeState.currentArticle = adaptArticle(dto)
      // Keep the sidebar tree's highlighted node in sync with whichever
      // article actually opened (search, dashboard, direct link — not just
      // a tree click), so breadcrumbs and the tree highlight stay correct.
      if (knowledgeState.tree) {
        const node = findNodeByArticleId(knowledgeState.tree, articleId)
        if (node) knowledgeState.selectedNodeId = node.id
      }
    } finally {
      knowledgeState.isLoading = false
    }
  }

  public async toggleFavorite(): Promise<void> {
    const article = knowledgeState.currentArticle
    if (!article) return

    const nextValue = !article.isFavorite
    article.isFavorite = nextValue
    try {
      await apiClient.setArticleFavorite(article.id, nextValue)
    } catch (error) {
      article.isFavorite = !nextValue
      throw error
    }
  }

  public async toggleLike(): Promise<void> {
    const article = knowledgeState.currentArticle
    if (!article) return

    // Счётчик общий на всех пользователей — берём авторитетное значение из
    // ответа RPC вместо оптимистичного +1, чтобы не разойтись при параллельных лайках.
    article.likesCount = await apiClient.likeArticle(article.id)
  }

  public async goToPage(delta: number): Promise<void> {
    const article = knowledgeState.currentArticle
    if (!article) return

    const nextIndex = Math.min(Math.max(article.currentPageIndex + delta, 0), Math.max(article.totalPages - 1, 0))
    if (nextIndex === article.currentPageIndex) return

    const previousIndex = article.currentPageIndex
    article.currentPageIndex = nextIndex
    article.progressText = `${nextIndex} из ${article.totalPages}`
    article.progressPercent = article.totalPages > 0 ? Math.round((nextIndex / article.totalPages) * 100) : 0

    try {
      await apiClient.setReadingPosition(article.id, nextIndex)
    } catch (error) {
      article.currentPageIndex = previousIndex
      article.progressText = `${previousIndex} из ${article.totalPages}`
      article.progressPercent = article.totalPages > 0 ? Math.round((previousIndex / article.totalPages) * 100) : 0
      throw error
    }
  }

  public cycleFontSize(): void {
    knowledgeState.fontSizeLevel = (knowledgeState.fontSizeLevel + 1) % 3
  }

  public toggleToc(forceState?: boolean): void {
    knowledgeState.isTocOpen = forceState !== undefined ? forceState : !knowledgeState.isTocOpen
  }

  public toggleBreadcrumbs(forceState?: boolean): void {
    knowledgeState.isBreadcrumbsOpen = forceState !== undefined ? forceState : !knowledgeState.isBreadcrumbsOpen
  }

  public async setSelectedSection(sectionId: string): Promise<void> {
    knowledgeState.selectedSectionId = sectionId

    const section = knowledgeState.currentArticle && findSectionById(knowledgeState.currentArticle.sections, sectionId)
    if (!section || section.isRead) return

    section.isRead = true
    try {
      await apiClient.setSectionRead(sectionId, true)
    } catch (error) {
      section.isRead = false
      throw error
    }
  }

  public setSelectedNode(nodeId: string): void {
    knowledgeState.selectedNodeId = nodeId
  }
}

export const knowledgeService = new KnowledgeService()
