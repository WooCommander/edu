import type { GraphEdgeDTO, GraphNodeDTO, KnowledgeGraphDTO } from '@/api'

export interface GraphNodeUIModel {
  id: string
  label: string
  isCenter: boolean
  articleId?: string
  colorVariant: 'primary' | 'secondary' | 'neutral'
  x?: number
  y?: number
}

export interface GraphEdgeUIModel {
  sourceId: string
  targetId: string
}

export interface KnowledgeGraphUIModel {
  id: string
  title: string
  nodes: GraphNodeUIModel[]
  edges: GraphEdgeUIModel[]
}

export function adaptKnowledgeGraph(dto: KnowledgeGraphDTO): KnowledgeGraphUIModel {
  return {
    id: dto.id,
    title: dto.title,
    nodes: dto.nodes.map((n: GraphNodeDTO) => ({
      id: n.id,
      label: n.label,
      isCenter: n.is_center,
      articleId: n.article_id,
      colorVariant: n.color_variant || 'neutral'
    })),
    edges: dto.edges.map((e: GraphEdgeDTO) => ({
      sourceId: e.source_id,
      targetId: e.target_id
    }))
  }
}
