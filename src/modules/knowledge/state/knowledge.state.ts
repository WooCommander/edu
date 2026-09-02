import { reactive } from 'vue'
import type { ArticleUIModel, TreeNodeUIModel } from '../adapters/knowledge.adapter'

interface KnowledgeState {
  tree: TreeNodeUIModel | null
  currentArticle: ArticleUIModel | null
  selectedNodeId: string
  selectedSectionId: string
  fontSizeLevel: number // 0: нормальный, 1: крупный, 2: очень крупный
  isLoading: boolean
}

export const knowledgeState = reactive<KnowledgeState>({
  tree: null,
  currentArticle: null,
  selectedNodeId: 'node_watch_sub_2',
  selectedSectionId: 'sec_2_2',
  fontSizeLevel: 0,
  isLoading: false
})
