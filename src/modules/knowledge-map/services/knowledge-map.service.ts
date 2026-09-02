import { apiClient } from '@/api'
import { adaptKnowledgeGraph } from '../adapters/knowledge-map.adapter'
import { knowledgeMapState } from '../state/knowledge-map.state'

class KnowledgeMapService {
  public async loadGraph(): Promise<void> {
    knowledgeMapState.isLoading = true
    try {
      const dto = await apiClient.getKnowledgeGraph()
      knowledgeMapState.graph = adaptKnowledgeGraph(dto)
    } finally {
      knowledgeMapState.isLoading = false
    }
  }

  public selectNode(nodeId: string): void {
    knowledgeMapState.selectedNodeId = nodeId
  }

  public zoomIn(): void {
    knowledgeMapState.zoomLevel = Math.min(knowledgeMapState.zoomLevel + 0.15, 2)
  }

  public zoomOut(): void {
    knowledgeMapState.zoomLevel = Math.max(knowledgeMapState.zoomLevel - 0.15, 0.6)
  }
}

export const knowledgeMapService = new KnowledgeMapService()
