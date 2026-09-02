import { reactive } from 'vue'
import type { KnowledgeGraphUIModel } from '../adapters/knowledge-map.adapter'

interface KnowledgeMapState {
  graph: KnowledgeGraphUIModel | null
  selectedNodeId: string | null
  zoomLevel: number
  isLoading: boolean
}

export const knowledgeMapState = reactive<KnowledgeMapState>({
  graph: null,
  selectedNodeId: 'n_center',
  zoomLevel: 1,
  isLoading: false
})
