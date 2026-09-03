import { apiClient } from '@/api'
import { adaptArticle, adaptTreeNode } from '../adapters/knowledge.adapter'
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
    } finally {
      knowledgeState.isLoading = false
    }
  }

  public toggleFavorite(): void {
    if (knowledgeState.currentArticle) {
      knowledgeState.currentArticle.isFavorite = !knowledgeState.currentArticle.isFavorite
    }
  }

  public toggleLike(): void {
    if (knowledgeState.currentArticle) {
      knowledgeState.currentArticle.likesCount += 1
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

  public setSelectedSection(sectionId: string): void {
    knowledgeState.selectedSectionId = sectionId
  }

  public setSelectedNode(nodeId: string): void {
    knowledgeState.selectedNodeId = nodeId
  }
}

export const knowledgeService = new KnowledgeService()
