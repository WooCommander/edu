export interface GraphNodeDTO {
  id: string
  label: string
  is_center: boolean
  article_id?: string
  color_variant?: 'primary' | 'secondary' | 'neutral'
}

export interface GraphEdgeDTO {
  source_id: string
  target_id: string
}

export interface KnowledgeGraphDTO {
  id: string
  title: string
  nodes: GraphNodeDTO[]
  edges: GraphEdgeDTO[]
}
